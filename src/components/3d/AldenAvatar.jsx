import { useRef, useState, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATHS } from './useAldenModel.js';

// ─── GLB Avatar (drops in when farmer.glb / builder.glb are present) ─────────

function AvatarGLB({ outfit, position, scale, speech }) {
  const path = outfit === 'farmer' ? MODEL_PATHS.farmer : MODEL_PATHS.builder;
  const { scene, animations } = useGLTF(path);
  const clone = useMemo(() => scene.clone(true), [scene]);
  const meshRef = useRef();
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t.current * 1.4) * 0.025;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <primitive object={clone} castShadow />
      {speech && (
        <Html position={[0.6, 1.8, 0]} distanceFactor={4} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(247,217,134,0.95)', color: '#1a0a00',
            padding: '5px 9px', borderRadius: '10px',
            fontSize: '10px', fontFamily: 'monospace',
            whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            position: 'relative',
          }}>
            {speech}
            <div style={{ position: 'absolute', left: '-6px', bottom: '6px', width: 0, height: 0,
              borderTop: '5px solid transparent', borderBottom: '5px solid transparent',
              borderRight: '7px solid rgba(247,217,134,0.95)' }} />
          </div>
        </Html>
      )}
    </group>
  );
}

const OUTFIT = {
  farmer: {
    body: '#4a7c59',
    hat: '#c8a96e',
    hatBrim: '#b8994e',
    skin: '#c8956c',
    accent: '#2d5a3d',
  },
  builder: {
    body: '#e8810a',
    hat: '#f7c948',
    hatBrim: '#f7c948',
    skin: '#c8956c',
    accent: '#1a1a1a',
  },
};

function AvatarBody({ outfit, hovered }) {
  const colors = OUTFIT[outfit] || OUTFIT.builder;

  return (
    <group>
      {/* Torso */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.38, 0.42, 0.22]} />
        <meshStandardMaterial color={colors.body} roughness={0.8} />
      </mesh>

      {/* Overalls straps / vest detail */}
      <mesh position={[-0.08, 0.12, 0.12]}>
        <boxGeometry args={[0.06, 0.3, 0.02]} />
        <meshStandardMaterial color={colors.accent} roughness={0.9} />
      </mesh>
      <mesh position={[0.08, 0.12, 0.12]}>
        <boxGeometry args={[0.06, 0.3, 0.02]} />
        <meshStandardMaterial color={colors.accent} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.28]} />
        <meshStandardMaterial color={colors.skin} roughness={0.7} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.07, 0.4, 0.145]}>
        <boxGeometry args={[0.06, 0.05, 0.02]} />
        <meshStandardMaterial color="#1a0a00" />
      </mesh>
      <mesh position={[0.07, 0.4, 0.145]}>
        <boxGeometry args={[0.06, 0.05, 0.02]} />
        <meshStandardMaterial color="#1a0a00" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 0.3, 0.145]}>
        <boxGeometry args={[0.1, 0.03, 0.02]} />
        <meshStandardMaterial color="#8b3a1a" />
      </mesh>

      {/* Hat */}
      {outfit === 'farmer' ? (
        <group position={[0, 0.57, 0]}>
          {/* Crown */}
          <mesh castShadow>
            <cylinderGeometry args={[0.16, 0.18, 0.18, 8]} />
            <meshStandardMaterial color={colors.hat} roughness={0.85} />
          </mesh>
          {/* Brim */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.04, 12]} />
            <meshStandardMaterial color={colors.hatBrim} roughness={0.9} />
          </mesh>
        </group>
      ) : (
        <group position={[0, 0.57, 0]}>
          {/* Hard hat dome */}
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.2, 0.14, 8]} />
            <meshStandardMaterial color={colors.hat} roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Hard hat brim */}
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.04, 12]} />
            <meshStandardMaterial color={colors.hat} roughness={0.5} metalness={0.1} />
          </mesh>
        </group>
      )}

      {/* Left arm */}
      <mesh castShadow position={[-0.26, -0.02, 0]}>
        <boxGeometry args={[0.1, 0.38, 0.16]} />
        <meshStandardMaterial color={colors.body} roughness={0.8} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.26, -0.24, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.14]} />
        <meshStandardMaterial color={colors.skin} roughness={0.7} />
      </mesh>

      {/* Right arm */}
      <mesh castShadow position={[0.26, -0.02, 0]}>
        <boxGeometry args={[0.1, 0.38, 0.16]} />
        <meshStandardMaterial color={colors.body} roughness={0.8} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.26, -0.24, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.14]} />
        <meshStandardMaterial color={colors.skin} roughness={0.7} />
      </mesh>

      {/* Left leg */}
      <mesh castShadow position={[-0.1, -0.38, 0]}>
        <boxGeometry args={[0.14, 0.36, 0.18]} />
        <meshStandardMaterial color={colors.accent} roughness={0.85} />
      </mesh>
      {/* Left boot */}
      <mesh position={[-0.1, -0.6, 0.02]}>
        <boxGeometry args={[0.15, 0.1, 0.22]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
      </mesh>

      {/* Right leg */}
      <mesh castShadow position={[0.1, -0.38, 0]}>
        <boxGeometry args={[0.14, 0.36, 0.18]} />
        <meshStandardMaterial color={colors.accent} roughness={0.85} />
      </mesh>
      {/* Right boot */}
      <mesh position={[0.1, -0.6, 0.02]}>
        <boxGeometry args={[0.15, 0.1, 0.22]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ─── Procedural Avatar (default / fallback) ───────────────────────────────────

export default function AldenAvatar({
  outfit = 'builder',
  position = [0, 0, 0],
  scale = 1,
  speech = null,
  walkTarget = null,
  onAvatarClick,
}) {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [showSpeech, setShowSpeech] = useState(!!speech);
  const currentPos = useRef(new THREE.Vector3(...position));
  const walkPhase = useRef(0);
  const isWalking = useRef(false);
  const idleTime = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    idleTime.current += delta;

    // Walk toward target
    if (walkTarget) {
      const target = new THREE.Vector3(...walkTarget);
      const dist = currentPos.current.distanceTo(target);
      if (dist > 0.05) {
        isWalking.current = true;
        const dir = target.clone().sub(currentPos.current).normalize();
        currentPos.current.addScaledVector(dir, delta * 1.8);
        groupRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z);

        // Face direction of movement
        const angle = Math.atan2(dir.x, dir.z);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, angle, 0.15);
      } else {
        isWalking.current = false;
      }
    }

    // Walk animation
    if (isWalking.current) {
      walkPhase.current += delta * 8;
      const swing = Math.sin(walkPhase.current) * 0.5;
      if (leftArmRef.current) leftArmRef.current.rotation.x = swing;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -swing;
      if (leftLegRef.current) leftLegRef.current.rotation.x = -swing * 0.7;
      if (rightLegRef.current) rightLegRef.current.rotation.x = swing * 0.7;
    } else {
      // Idle animation — gentle sway + arm wave on hover
      const idleSway = Math.sin(idleTime.current * 1.2) * 0.015;
      groupRef.current.rotation.z = idleSway;
      groupRef.current.position.y = (position[1] ?? 0) + Math.sin(idleTime.current * 1.5) * 0.025;

      if (hovered && rightArmRef.current) {
        rightArmRef.current.rotation.z = -Math.PI * 0.5 + Math.sin(idleTime.current * 6) * 0.3;
      } else {
        if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, 0.1);
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, 0.1);
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0, 0.1);
        }
        if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1);
        if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onAvatarClick}
    >
      {/* Torso */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.38, 0.42, 0.22]} />
        <meshStandardMaterial color={OUTFIT[outfit].body} roughness={0.8} />
      </mesh>

      {/* Vest straps */}
      <mesh position={[-0.08, 0.12, 0.12]}>
        <boxGeometry args={[0.06, 0.3, 0.02]} />
        <meshStandardMaterial color={OUTFIT[outfit].accent} roughness={0.9} />
      </mesh>
      <mesh position={[0.08, 0.12, 0.12]}>
        <boxGeometry args={[0.06, 0.3, 0.02]} />
        <meshStandardMaterial color={OUTFIT[outfit].accent} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.28]} />
        <meshStandardMaterial color={OUTFIT[outfit].skin} roughness={0.7} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.07, 0.4, 0.145]}>
        <boxGeometry args={[0.06, 0.05, 0.02]} />
        <meshStandardMaterial color="#1a0a00" />
      </mesh>
      <mesh position={[0.07, 0.4, 0.145]}>
        <boxGeometry args={[0.06, 0.05, 0.02]} />
        <meshStandardMaterial color="#1a0a00" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 0.3, 0.145]}>
        <boxGeometry args={[0.1, 0.03, 0.02]} />
        <meshStandardMaterial color="#8b3a1a" />
      </mesh>

      {/* Hat */}
      {outfit === 'farmer' ? (
        <group position={[0, 0.57, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.16, 0.18, 0.18, 8]} />
            <meshStandardMaterial color={OUTFIT.farmer.hat} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.32, 0.32, 0.04, 12]} />
            <meshStandardMaterial color={OUTFIT.farmer.hatBrim} roughness={0.9} />
          </mesh>
        </group>
      ) : (
        <group position={[0, 0.57, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.2, 0.14, 8]} />
            <meshStandardMaterial color={OUTFIT.builder.hat} roughness={0.5} metalness={0.1} />
          </mesh>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.04, 12]} />
            <meshStandardMaterial color={OUTFIT.builder.hat} roughness={0.5} metalness={0.1} />
          </mesh>
        </group>
      )}

      {/* Left arm (animated) */}
      <group ref={leftArmRef} position={[-0.26, -0.02, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.38, 0.16]} />
          <meshStandardMaterial color={OUTFIT[outfit].body} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.14]} />
          <meshStandardMaterial color={OUTFIT[outfit].skin} roughness={0.7} />
        </mesh>
      </group>

      {/* Right arm (animated + wave) */}
      <group ref={rightArmRef} position={[0.26, -0.02, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.38, 0.16]} />
          <meshStandardMaterial color={OUTFIT[outfit].body} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.14]} />
          <meshStandardMaterial color={OUTFIT[outfit].skin} roughness={0.7} />
        </mesh>
      </group>

      {/* Left leg (animated) */}
      <group ref={leftLegRef} position={[-0.1, -0.38, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.36, 0.18]} />
          <meshStandardMaterial color={OUTFIT[outfit].accent} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.23, 0.02]}>
          <boxGeometry args={[0.15, 0.1, 0.22]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
        </mesh>
      </group>

      {/* Right leg (animated) */}
      <group ref={rightLegRef} position={[0.1, -0.38, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.36, 0.18]} />
          <meshStandardMaterial color={OUTFIT[outfit].accent} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.23, 0.02]}>
          <boxGeometry args={[0.15, 0.1, 0.22]} />
          <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
        </mesh>
      </group>

      {/* Speech bubble */}
      {speech && showSpeech && (
        <Html position={[0.5, 0.9, 0]} distanceFactor={4} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(247, 217, 134, 0.95)',
            color: '#1a0a00',
            padding: '6px 10px',
            borderRadius: '10px',
            fontSize: '11px',
            fontFamily: 'Roboto Mono, monospace',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            position: 'relative',
          }}>
            {speech}
            <div style={{
              position: 'absolute',
              left: '-6px',
              bottom: '6px',
              width: 0,
              height: 0,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '7px solid rgba(247, 217, 134, 0.95)',
            }} />
          </div>
        </Html>
      )}
    </group>
  );
}
