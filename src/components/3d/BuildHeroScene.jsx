import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import AldenAvatar from './AldenAvatar.jsx';

// ─── Crane ────────────────────────────────────────────────────────────────────

function Crane() {
  const armRef = useRef();
  const hookRef = useRef();
  const blockRef = useRef();
  const hookLen = useRef(1.2);
  const hookDir = useRef(1);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin(t * 0.4) * 0.35;
    }
    // Hook oscillates up/down
    hookLen.current += hookDir.current * 0.008;
    if (hookLen.current > 2.0) hookDir.current = -1;
    if (hookLen.current < 0.6) hookDir.current = 1;
    if (hookRef.current) {
      hookRef.current.position.y = -hookLen.current;
    }
    if (blockRef.current) {
      blockRef.current.position.y = -hookLen.current - 0.18;
    }
  });

  return (
    <group position={[0.8, 0, 0.3]}>
      {/* Mast */}
      <mesh castShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 3.2, 6]} />
        <meshStandardMaterial color="#ccbb87" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Rotating arm */}
      <group ref={armRef} position={[0, 3.1, 0]}>
        {/* Main arm */}
        <mesh castShadow position={[0.7, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 1.6, 6]} />
          <meshStandardMaterial color="#ccbb87" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Counter arm */}
        <mesh castShadow position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
          <meshStandardMaterial color="#9a8a67" roughness={0.5} metalness={0.5} />
        </mesh>
        {/* Counter weight */}
        <mesh castShadow position={[-0.72, -0.1, 0]}>
          <boxGeometry args={[0.22, 0.16, 0.16]} />
          <meshStandardMaterial color="#555" roughness={0.7} metalness={0.3} />
        </mesh>

        {/* Hook cable */}
        <group position={[1.1, 0, 0]}>
          <mesh ref={hookRef} position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 1.2, 4]} />
            <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Hook tip */}
          <mesh ref={blockRef} position={[0, -1.2, 0]}>
            <boxGeometry args={[0.22, 0.18, 0.18]} />
            <meshStandardMaterial color="#ccbb87" roughness={0.5} metalness={0.3} emissive="#ccbb87" emissiveIntensity={0.15} />
          </mesh>
        </group>

        {/* Accent light on arm tip */}
        <pointLight position={[1.2, 0, 0]} intensity={0.6} color="#f7d986" distance={3} />
      </group>
    </group>
  );
}

// ─── Building under construction ─────────────────────────────────────────────

function BuildingWIP() {
  const buildingRef = useRef();

  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
    }
  });

  return (
    <group ref={buildingRef} position={[-0.6, 0, -0.2]}>
      {/* Foundation slab */}
      <mesh receiveShadow position={[0, 0.04, 0]}>
        <boxGeometry args={[2.1, 0.08, 1.4]} />
        <meshStandardMaterial color="#555" roughness={0.9} />
      </mesh>

      {/* Floor 1 walls */}
      <mesh castShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[1.9, 0.9, 1.2]} />
        <meshStandardMaterial color="#a8a49e" roughness={0.9} />
      </mesh>
      {/* Floor 1 windows */}
      {[-0.55, 0.55].map((x, i) => (
        <mesh key={i} castShadow position={[x, 0.6, 0.61]}>
          <boxGeometry args={[0.28, 0.32, 0.04]} />
          <meshStandardMaterial color="#a8d8ea" roughness={0.1} metalness={0.3} transparent opacity={0.7} emissive="#6aadcc" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Floor 2 — partial, under construction */}
      <mesh castShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[1.9, 0.6, 1.2]} />
        <meshStandardMaterial color="#9a9690" roughness={0.9} />
      </mesh>

      {/* Scaffolding poles */}
      {[[-0.9, 0], [0.9, 0], [-0.9, -0.5], [0.9, -0.5]].map(([x, z], i) => (
        <mesh key={i} castShadow position={[x, 0.9, z]}>
          <cylinderGeometry args={[0.025, 0.025, 1.8, 4]} />
          <meshStandardMaterial color="#ccbb87" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {/* Scaffolding planks */}
      {[0.8, 1.4].map((y, i) => (
        <mesh key={i} castShadow position={[0, y, -0.25]}>
          <boxGeometry args={[2.0, 0.04, 0.16]} />
          <meshStandardMaterial color="#c9a96e" roughness={0.85} />
        </mesh>
      ))}

      {/* Scaffold accent lights */}
      <pointLight position={[0, 1.5, 0.5]} intensity={0.5} color="#f7d986" distance={2.5} />
    </group>
  );
}

// ─── Ground grid ─────────────────────────────────────────────────────────────

function ConstructionGround() {
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#100d09" roughness={0.95} />
      </mesh>
      {/* Grid lines */}
      <gridHelper args={[12, 20, '#4a3a27', '#2a1e12']} position={[0, 0.002, 0]} />
    </>
  );
}

// ─── Floating material blocks ─────────────────────────────────────────────────

function FloatingMaterials() {
  const mats = [
    { pos: [-2.8, 0.5, 0.5], color: '#c9a96e', label: 'WOOD' },
    { pos: [-2.8, 0.5, -0.5], color: '#a8a49e', label: 'CONCRETE' },
    { pos: [2.6, 0.5, 0.4],  color: '#c1440e', label: 'BRICK' },
  ];
  return (
    <>
      {mats.map((m, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.4} floatIntensity={0.5}>
          <mesh castShadow position={m.pos}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial color={m.color} roughness={0.8} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// ─── Inner scene ─────────────────────────────────────────────────────────────

function HeroScene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 20]} />

      <ambientLight intensity={1.2} color="#fff4df" />
      <directionalLight position={[4, 8, 3]} intensity={2.0} color="#ffe2a8" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 4, -1]} intensity={0.8} color="#ccbb87" />

      <Stars radius={16} depth={8} count={600} factor={2} fade />

      <ConstructionGround />
      <BuildingWIP />
      <Crane />
      <FloatingMaterials />

      {/* Builder avatar patrolling */}
      <AldenAvatar
        outfit="builder"
        position={[-2.2, 0.68, 0.8]}
        scale={0.62}
        speech="Let's build!"
        walkTarget={[-2.2, 0.68, 0.8]}
      />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function BuildHeroScene() {
  return (
    <div className="build-hero-3d-shell">
      <Canvas
        shadows
        camera={{ position: [5, 4, 6], fov: 52 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <HeroScene />
      </Canvas>

      {/* Overlay badge */}
      <div className="build-hero-3d-badge">
        <span>[BUILD OUT LOADING]</span>
        <strong>Interactive block planner below</strong>
      </div>

      <style>{`
        .build-hero-3d-shell {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: clamp(24rem, 58vh, 38rem);
          border: 1px solid rgba(231,229,223,0.12);
          border-radius: clamp(1.4rem, 3vw, 2rem);
          overflow: hidden;
          background: #050505;
          box-shadow: 0 2rem 5rem rgba(0,0,0,0.3);
        }
        .build-hero-3d-badge {
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(231,229,223,0.12);
          border-radius: 999px;
          background: rgba(5,5,5,0.55);
          backdrop-filter: blur(14px);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          color: rgba(231,229,223,0.7);
          text-transform: uppercase;
          pointer-events: none;
        }
        .build-hero-3d-badge strong {
          font-weight: 400;
          color: #ccbb87;
        }
      `}</style>
    </div>
  );
}
