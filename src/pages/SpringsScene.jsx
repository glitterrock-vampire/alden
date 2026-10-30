import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.; vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
uniform float uTime;
uniform float uAmp;
vec3 displace(vec3 p){
  float n = snoise(p * 0.85 + vec3(0.0, uTime * 0.32, uTime * 0.18));
  n += 0.35 * snoise(p * 1.9 - uTime * 0.25);
  return p * (1.0 + n * 0.16 * uAmp);
}
`;

export default function SpringsScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      return undefined; // no WebGL: the CSS fallback ring in .springs-stage still shows
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const rig = new THREE.Group();
    scene.add(rig);

    // ---- Water blob -------------------------------------------------------
    const blobGeo = new THREE.IcosahedronGeometry(1.7, 48);
    const blobMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#bff5ea'),
      roughness: 0.04,
      metalness: 0,
      transmission: 1,
      thickness: 1.6,
      ior: 1.33,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      attenuationColor: new THREE.Color('#1f8f86'),
      attenuationDistance: 2.4,
      envMapIntensity: 1.6,
    });
    blobMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uAmp = { value: 1 };
      blobMat.userData.shader = shader;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\n${NOISE}`)
        .replace(
          '#include <beginnormal_vertex>',
          `#include <beginnormal_vertex>
          {
            vec3 nn = normalize(position);
            vec3 tt = normalize(cross(nn, abs(nn.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0)));
            vec3 bb = normalize(cross(nn, tt));
            float r = length(position);
            float e = 0.025;
            vec3 pa = displace(position);
            vec3 pb = displace(normalize(position + tt * e) * r);
            vec3 pc = displace(normalize(position + bb * e) * r);
            vec3 dn = normalize(cross(pb - pa, pc - pa));
            objectNormal = dot(dn, nn) < 0.0 ? -dn : dn;
          }`
        )
        .replace('#include <begin_vertex>', 'vec3 transformed = displace(position);');
    };
    const blob = new THREE.Mesh(blobGeo, blobMat);
    rig.add(blob);

    // ---- Orbit rings ------------------------------------------------------
    const ringMat = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o });
    const rings = [
      { r: 2.7, t: 0.006, c: '#95e8d7', o: 0.55, rx: 1.15, rz: 0.2, s: 0.25 },
      { r: 3.25, t: 0.005, c: '#d6ef83', o: 0.4, rx: 0.45, rz: -0.6, s: -0.18 },
      { r: 3.9, t: 0.004, c: '#95e8d7', o: 0.22, rx: 1.45, rz: 0.9, s: 0.12 },
    ].map((cfg) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(cfg.r, cfg.t, 8, 220), ringMat(cfg.c, cfg.o));
      m.rotation.set(cfg.rx, 0, cfg.rz);
      m.userData = cfg;
      rig.add(m);
      return m;
    });

    // ---- Bubbles ----------------------------------------------------------
    const COUNT = 46;
    const bubbleGeo = new THREE.SphereGeometry(1, 24, 24);
    const bubbleMat = new THREE.MeshPhysicalMaterial({
      color: '#e8fff8',
      roughness: 0.05,
      transmission: 0,
      transparent: true,
      opacity: 0.42,
      clearcoat: 1,
      envMapIntensity: 2,
    });
    const bubbles = new THREE.InstancedMesh(bubbleGeo, bubbleMat, COUNT);
    const seeds = Array.from({ length: COUNT }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 2.3 + Math.random() * 2.2,
      y: (Math.random() - 0.5) * 5,
      s: 0.03 + Math.random() * 0.12,
      sp: 0.08 + Math.random() * 0.22,
      ph: Math.random() * 10,
    }));
    rig.add(bubbles);
    const dummy = new THREE.Object3D();

    // ---- Lights -----------------------------------------------------------
    const lime = new THREE.PointLight('#d6ef83', 36, 20);
    lime.position.set(-4, 3, 4);
    const aqua = new THREE.PointLight('#95e8d7', 42, 20);
    aqua.position.set(4, -2.5, 3);
    scene.add(lime, aqua);

    // ---- Sizing / interaction --------------------------------------------
    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.position.z = w / h < 0.9 ? 11.5 : 9.5;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      if (reduce) return;
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduce) window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    const clock = new THREE.Clock(false);
    let raf = 0;
    const render = () => {
      raf = 0;
      if (!visible) return;

      const t = reduce ? 0 : clock.getElapsedTime();

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      rig.rotation.y = pointer.x * 0.45 + t * 0.12;
      rig.rotation.x = pointer.y * 0.25;
      rig.position.y = Math.sin(t * 0.6) * 0.12;

      const scroll = reduce ? 0 : Math.min(window.scrollY / window.innerHeight, 1.4);
      rig.scale.setScalar(1 - scroll * 0.18);
      rig.position.x = -scroll * 0.4;

      const shader = blobMat.userData.shader;
      if (shader) {
        shader.uniforms.uTime.value = t;
        shader.uniforms.uAmp.value = 1 + Math.abs(pointer.x) * 0.5 + scroll * 0.4;
      }
      blob.rotation.y = -t * 0.08;

      rings.forEach((m, i) => { m.rotation.z = m.userData.rz + t * m.userData.s; m.rotation.x = m.userData.rx + Math.sin(t * 0.3 + i) * 0.08; });

      seeds.forEach((b, i) => {
        const a = b.a + t * b.sp;
        const rise = ((b.y + t * b.sp * 0.9 + b.ph) % 6) - 3;
        dummy.position.set(Math.cos(a) * b.r, rise, Math.sin(a) * b.r * 0.7);
        dummy.scale.setScalar(b.s * (0.85 + Math.sin(t * 2 + b.ph) * 0.15));
        dummy.updateMatrix();
        bubbles.setMatrixAt(i, dummy.matrix);
      });
      bubbles.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      if (!reduce && visible) raf = requestAnimationFrame(render);
    };

    const start = () => {
      if (!visible) return;
      if (reduce) {
        render();
      } else if (!raf) {
        clock.start();
        raf = requestAnimationFrame(render);
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        start();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        clock.stop();
      }
    });
    io.observe(el);
    start();

    return () => {
      cancelAnimationFrame(raf);
      clock.stop();
      ro.disconnect();
      io.disconnect();
      if (!reduce) window.removeEventListener('pointermove', onMove);
      blobGeo.dispose(); blobMat.dispose(); bubbleGeo.dispose(); bubbleMat.dispose();
      rings.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
      envTex.dispose(); pmrem.dispose(); renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="springs-canvas" ref={mountRef} aria-hidden="true" />;
}
