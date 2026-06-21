import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import AldenAvatar from './AldenAvatar.jsx';

// ─── Sun ──────────────────────────────────────────────────────────────────────

function Sun() {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) meshRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.018);
    if (glowRef.current) glowRef.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.04);
  });

  return (
    <group position={[0, 7, -10]}>
      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.8, 16, 16]} />
        <meshBasicMaterial color="#fff7c7" transparent opacity={0.12} />
      </mesh>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 20, 20]} />
        <meshBasicMaterial color="#f9e87a" />
      </mesh>
      <pointLight intensity={4} color="#ffe8a0" distance={60} decay={0.5} />
    </group>
  );
}

// ─── Sky gradient backdrop ────────────────────────────────────────────────────

function Sky() {
  const mesh = useRef();
  return (
    <mesh ref={mesh} position={[0, 5, -18]} rotation={[0, 0, 0]}>
      <planeGeometry args={[60, 30]} />
      <meshBasicMaterial color="#9fd4f0" side={THREE.FrontSide} />
    </mesh>
  );
}

// ─── Cloud ────────────────────────────────────────────────────────────────────

function Cloud({ position, speed = 0.15, scale = 1 }) {
  const groupRef = useRef();
  const startX = useRef(position[0]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.x += delta * speed;
    if (groupRef.current.position.x > 25) {
      groupRef.current.position.x = -25;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.9, 10, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
      <mesh position={[0.75, -0.1, 0]}>
        <sphereGeometry args={[0.65, 10, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={1} />
      </mesh>
      <mesh position={[-0.75, -0.1, 0]}>
        <sphereGeometry args={[0.55, 10, 8]} />
        <meshStandardMaterial color="#f5f5f5" roughness={1} />
      </mesh>
      <mesh position={[0.35, 0.35, 0]}>
        <sphereGeometry args={[0.5, 10, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
    </group>
  );
}

// ─── Rolling terrain ─────────────────────────────────────────────────────────

function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 20, 80, 40);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 0.3 + 0.5) * 0.55 +
        Math.sin(x * 0.15 - 0.8) * 0.8 +
        Math.cos(y * 0.25 + 0.3) * 0.4 +
        Math.sin((x + y) * 0.18) * 0.3;
      pos.setZ(i, wave);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh receiveShadow geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -2]}>
      <meshStandardMaterial color="#3d7a2a" roughness={0.95} metalness={0} />
    </mesh>
  );
}

// ─── Flat field / ground ─────────────────────────────────────────────────────

function Field() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 2]}>
      <planeGeometry args={[24, 8]} />
      <meshStandardMaterial color="#2a5c18" roughness={0.95} />
    </mesh>
  );
}

// ─── Crop rows ────────────────────────────────────────────────────────────────

function CropRow({ xOffset = 0, zRow = 0, count = 9 }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      child.scale.y = 0.7 + Math.sin(t * 1.2 + i * 0.4) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => {
        const x = xOffset + (i - count / 2) * 1.1;
        return (
          <group key={i} position={[x, -0.1, zRow]}>
            {/* Stem */}
            <mesh castShadow position={[0, 0.28, 0]}>
              <cylinderGeometry args={[0.03, 0.04, 0.55, 5]} />
              <meshStandardMaterial color="#5ab03a" roughness={0.9} />
            </mesh>
            {/* Left leaf */}
            <mesh castShadow position={[-0.14, 0.26, 0]} rotation={[0, 0, 0.7]}>
              <sphereGeometry args={[0.14, 6, 5]} />
              <meshStandardMaterial color="#6ccf44" roughness={0.85} />
            </mesh>
            {/* Right leaf */}
            <mesh castShadow position={[0.14, 0.26, 0]} rotation={[0, 0, -0.7]}>
              <sphereGeometry args={[0.12, 6, 5]} />
              <meshStandardMaterial color="#5ab03a" roughness={0.85} />
            </mesh>
            {/* Top bud */}
            <mesh castShadow position={[0, 0.58, 0]}>
              <sphereGeometry args={[0.1, 7, 6]} />
              <meshStandardMaterial color="#96e06a" roughness={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ─── Tractor ─────────────────────────────────────────────────────────────────

function Tractor() {
  const groupRef = useRef();
  const wheelFLRef = useRef();
  const wheelFRRef = useRef();
  const wheelRLRef = useRef();
  const wheelRRRef = useRef();
  const posX = useRef(-14);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    posX.current += delta * 2.4;
    if (posX.current > 16) posX.current = -14;
    groupRef.current.position.x = posX.current;

    const spin = posX.current * 1.8;
    [wheelFLRef, wheelFRRef, wheelRLRef, wheelRRRef].forEach(r => {
      if (r.current) r.current.rotation.z = -spin;
    });
  });

  return (
    <group ref={groupRef} position={[-14, 0, 1.8]}>
      {/* Body */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.6, 0.65, 0.85]} />
        <meshStandardMaterial color="#d95f2d" roughness={0.7} metalness={0.15} />
      </mesh>
      {/* Hood */}
      <mesh castShadow position={[0.65, 0.68, 0]}>
        <boxGeometry args={[0.5, 0.42, 0.7]} />
        <meshStandardMaterial color="#c74e1e" roughness={0.7} metalness={0.15} />
      </mesh>
      {/* Cab */}
      <mesh castShadow position={[-0.35, 0.98, 0]}>
        <boxGeometry args={[0.7, 0.55, 0.72]} />
        <meshStandardMaterial color="#d95f2d" roughness={0.7} />
      </mesh>
      {/* Cab glass */}
      <mesh position={[-0.35, 1.0, 0.37]}>
        <boxGeometry args={[0.64, 0.44, 0.04]} />
        <meshStandardMaterial color="#c8efff" transparent opacity={0.6} roughness={0.1} />
      </mesh>
      {/* Exhaust pipe */}
      <mesh castShadow position={[0.85, 1.0, 0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 6]} />
        <meshStandardMaterial color="#333" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Front wheels */}
      <group ref={wheelFLRef} position={[0.65, 0.28, 0.48]}>
        <mesh castShadow><cylinderGeometry args={[0.26, 0.26, 0.14, 10]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#1a1a1a" roughness={0.9} /></mesh>
        <mesh><cylinderGeometry args={[0.1, 0.1, 0.16, 6]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#ccbb87" roughness={0.5} metalness={0.4} /></mesh>
      </group>
      <group ref={wheelFRRef} position={[0.65, 0.28, -0.48]}>
        <mesh castShadow><cylinderGeometry args={[0.26, 0.26, 0.14, 10]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#1a1a1a" roughness={0.9} /></mesh>
        <mesh><cylinderGeometry args={[0.1, 0.1, 0.16, 6]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#ccbb87" roughness={0.5} metalness={0.4} /></mesh>
      </group>
      {/* Rear wheels (bigger) */}
      <group ref={wheelRLRef} position={[-0.6, 0.36, 0.54]}>
        <mesh castShadow><cylinderGeometry args={[0.38, 0.38, 0.18, 12]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#1a1a1a" roughness={0.9} /></mesh>
        <mesh><cylinderGeometry args={[0.15, 0.15, 0.2, 6]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#ccbb87" roughness={0.5} metalness={0.4} /></mesh>
      </group>
      <group ref={wheelRRRef} position={[-0.6, 0.36, -0.54]}>
        <mesh castShadow><cylinderGeometry args={[0.38, 0.38, 0.18, 12]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#1a1a1a" roughness={0.9} /></mesh>
        <mesh><cylinderGeometry args={[0.15, 0.15, 0.2, 6]} rotation={[Math.PI / 2, 0, 0]} /><meshStandardMaterial color="#ccbb87" roughness={0.5} metalness={0.4} /></mesh>
      </group>
    </group>
  );
}

// ─── Barn ─────────────────────────────────────────────────────────────────────

function Barn() {
  return (
    <group position={[-5, 0, -3]}>
      {/* Main structure */}
      <mesh castShadow position={[0, 1.0, 0]}>
        <boxGeometry args={[2.2, 2.0, 1.6]} />
        <meshStandardMaterial color="#8b2e10" roughness={0.85} />
      </mesh>
      {/* Roof */}
      <mesh castShadow position={[0, 2.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.72, 0.9, 4]} />
        <meshStandardMaterial color="#5a1a08" roughness={0.9} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.6, 0.81]}>
        <boxGeometry args={[0.55, 1.0, 0.04]} />
        <meshStandardMaterial color="#5a3010" roughness={0.9} />
      </mesh>
      {/* Window */}
      <mesh position={[0.65, 1.4, 0.81]}>
        <boxGeometry args={[0.32, 0.32, 0.04]} />
        <meshStandardMaterial color="#c8efff" transparent opacity={0.7} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ─── Tree ─────────────────────────────────────────────────────────────────────

function Tree({ position }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 1.1, 6]} />
        <meshStandardMaterial color="#5a3010" roughness={0.9} />
      </mesh>
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.08}>
        <mesh castShadow position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.75, 10, 8]} />
          <meshStandardMaterial color="#3d7a2a" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 2.1, 0]}>
          <sphereGeometry args={[0.5, 10, 8]} />
          <meshStandardMaterial color="#4d9a38" roughness={0.9} />
        </mesh>
      </Float>
    </group>
  );
}

// ─── Inner scene ─────────────────────────────────────────────────────────────

function FarmScene() {
  return (
    <>
      <color attach="background" args={['#9fd4f0']} />
      <fog attach="fog" args={['#c8eaf8', 18, 32]} />

      {/* Ambient + directional */}
      <ambientLight intensity={2.0} color="#fff4e0" />
      <directionalLight
        position={[3, 12, 5]}
        intensity={2.8}
        color="#ffe8a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={30}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <hemisphereLight args={['#9fd4f0', '#3d7a2a', 0.8]} />

      <Sky />
      <Sun />

      {/* Clouds */}
      <Cloud position={[-10, 6, -8]} speed={0.14} scale={1.1} />
      <Cloud position={[4, 7.5, -10]} speed={0.09} scale={0.85} />
      <Cloud position={[14, 5.5, -7]} speed={0.12} scale={0.7} />

      <Terrain />
      <Field />

      {/* Crop rows */}
      <CropRow xOffset={1} zRow={0.5} count={10} />
      <CropRow xOffset={0} zRow={1.4} count={10} />
      <CropRow xOffset={0.5} zRow={2.3} count={8} />

      <Tractor />
      <Barn />

      {/* Trees */}
      <Tree position={[6, -0.3, -1.5]} />
      <Tree position={[7.8, -0.3, -2.5]} />
      <Tree position={[-7.5, -0.3, -2]} />

      {/* Farmer avatar */}
      <AldenAvatar
        outfit="farmer"
        position={[2.5, 0.68, 2.0]}
        scale={0.72}
        speech="Fresh harvest today!"
      />

      {/* Fence posts */}
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <group key={i} position={[x, 0, 3.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.7, 0.08]} />
            <meshStandardMaterial color="#8b5e3c" roughness={0.9} />
          </mesh>
          {i < 4 && (
            <mesh castShadow position={[1, 0.12, 0]}>
              <boxGeometry args={[2.05, 0.06, 0.05]} />
              <meshStandardMaterial color="#a07040" roughness={0.9} />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function FarmHero3D() {
  return (
    <div className="farm-hero-3d-shell">
      <Canvas
        shadows
        camera={{ position: [0, 4, 10], fov: 58 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <FarmScene />
      </Canvas>

      {/* Loader card overlay */}
      <div className="farm-hero-3d-badge">
        <span>[FIELD LOADING]</span>
        <strong>Fresh from farm to Kingston</strong>
      </div>

      <style>{`
        .farm-hero-3d-shell {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .farm-hero-3d-badge {
          position: absolute;
          right: clamp(1rem, 4vw, 3rem);
          top: clamp(6rem, 12vh, 8rem);
          z-index: 2;
          display: grid;
          gap: 0.35rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(234, 255, 214, 0.24);
          border-radius: 1rem;
          background: rgba(7, 16, 6, 0.46);
          backdrop-filter: blur(14px);
          font-family: 'Roboto Mono', monospace;
          text-transform: uppercase;
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.22);
          pointer-events: none;
        }
        .farm-hero-3d-badge span {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: rgba(234, 255, 214, 0.72);
        }
        .farm-hero-3d-badge strong {
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #c8ff9b;
        }
        @media (max-width: 768px) {
          .farm-hero-3d-badge {
            left: 1rem;
            right: 1rem;
            top: 5.5rem;
          }
        }
      `}</style>
    </div>
  );
}
