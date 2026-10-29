import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NUCLEONS = [
  { position: [0, 0, 0], color: '#d7c692', size: 0.2 },
  { position: [0.22, 0.02, 0.08], color: '#e7e5df', size: 0.18 },
  { position: [-0.18, 0.13, 0.11], color: '#b79d61', size: 0.19 },
  { position: [0.05, -0.2, 0.12], color: '#e7e5df', size: 0.17 },
  { position: [-0.11, -0.11, -0.14], color: '#c9b475', size: 0.19 },
  { position: [0.18, 0.16, -0.13], color: '#e7e5df', size: 0.16 },
  { position: [-0.24, -0.03, -0.06], color: '#cfbd88', size: 0.16 },
];

function Nucleus() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshBasicMaterial color="#ccbb87" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial color="#ccbb87" transparent opacity={0.08} />
      </mesh>
      {NUCLEONS.map(({ position, color, size }, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.12}
            metalness={0.32}
            roughness={0.28}
          />
        </mesh>
      ))}
      <pointLight color="#ccbb87" intensity={0.65} distance={2.6} />
    </group>
  );
}

function ElectronOrbit({ radius, rotation, color, speed, phase, opacity = 0.42 }) {
  const electron = useRef(null);

  useFrame((state) => {
    if (!electron.current) return;
    const angle = state.clock.elapsedTime * speed + phase;
    electron.current.position.set(radius * Math.cos(angle), radius * Math.sin(angle), 0);
  });

  return (
    <group rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, 0.007, 6, 180]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      <mesh ref={electron}>
        <sphereGeometry args={[0.065, 20, 20]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.018, 10, 10]} />
        <meshBasicMaterial color="#e7e5df" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function OrbitingStructure() {
  const structure = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const scrollTarget = useRef(0);

  useEffect(() => {
    const handlePointer = (event) => {
      pointerTarget.current.x = THREE.MathUtils.clamp((event.clientX / window.innerWidth - 0.5) * 2, -1, 1);
      pointerTarget.current.y = THREE.MathUtils.clamp((event.clientY / window.innerHeight - 0.5) * 2, -1, 1);
    };
    const handleScroll = () => {
      scrollTarget.current = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
    };
    const resetPointer = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('pointerleave', resetPointer, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!structure.current) return;
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointerTarget.current.x, 4.5, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointerTarget.current.y, 4.5, delta);
    scroll.current = THREE.MathUtils.damp(scroll.current, scrollTarget.current, 5, delta);

    const t = state.clock.elapsedTime;
    const targetX = pointer.current.y * 0.11 + scroll.current * 0.12;
    const targetY = pointer.current.x * 0.16 + t * 0.035;
    structure.current.rotation.x = THREE.MathUtils.damp(structure.current.rotation.x, targetX, 5.5, delta);
    structure.current.rotation.y = THREE.MathUtils.damp(structure.current.rotation.y, targetY, 5.5, delta);
    structure.current.rotation.z = THREE.MathUtils.damp(structure.current.rotation.z, -pointer.current.x * 0.025, 5.5, delta);
    structure.current.position.y = THREE.MathUtils.damp(structure.current.position.y, -scroll.current * 0.28, 5.5, delta);
  });

  return (
    <group ref={structure}>
      <ElectronOrbit radius={2.45} rotation={[0.7, 0.25, 0.15]} color="#ccbb87" speed={0.52} phase={0.3} opacity={0.58} />
      <ElectronOrbit radius={2.98} rotation={[-0.55, 0.4, -0.38]} color="#e7e5df" speed={-0.38} phase={2.4} opacity={0.36} />
      <ElectronOrbit radius={2.02} rotation={[0.18, -0.75, 0.62]} color="#ccbb87" speed={0.68} phase={4.1} opacity={0.34} />

      <mesh rotation={[0.92, 0.12, -0.18]}>
        <torusGeometry args={[3.48, 0.004, 4, 180]} />
        <meshBasicMaterial color="#e7e5df" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[-0.25, 0.95, 0.4]}>
        <torusGeometry args={[1.48, 0.004, 4, 128]} />
        <meshBasicMaterial color="#ccbb87" transparent opacity={0.2} />
      </mesh>

      <Nucleus />
    </group>
  );
}

export default function HomeParallaxScene() {
  return (
    <div className="hero-depth-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 42 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.85} />
        <pointLight position={[3, 4, 5]} color="#e7e5df" intensity={0.75} />
        <OrbitingStructure />
      </Canvas>
    </div>
  );
}
