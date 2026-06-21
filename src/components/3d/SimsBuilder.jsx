import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import AldenAvatar from './AldenAvatar.jsx';
import confetti from 'canvas-confetti';

// ─── Constants ────────────────────────────────────────────────────────────────

const GRID_SIZE = 0.5;

const MATERIALS = {
  concrete: { label: 'Concrete', color: '#a8a49e', roughness: 0.9, metalness: 0.05 },
  wood:     { label: 'Wood',     color: '#c9a96e', roughness: 0.85, metalness: 0.0 },
  brick:    { label: 'Brick',    color: '#c1440e', roughness: 0.95, metalness: 0.0 },
  glass:    { label: 'Glass',    color: '#a8d8ea', roughness: 0.1,  metalness: 0.3, transparent: true, opacity: 0.6 },
  steel:    { label: 'Steel',    color: '#8c9aad', roughness: 0.3,  metalness: 0.8 },
};

const BLOCK_PRESETS = {
  room:    { label: '🏠 Room',    type: 'room',   w: 1.1, h: 0.9, d: 1.05, material: 'concrete' },
  loft:    { label: '🏢 Loft',   type: 'room',   w: 0.9, h: 1.4, d: 1.05, material: 'concrete' },
  roof:    { label: '🔺 Roof',   type: 'roof',   w: 1.35, h: 0.7, d: 1.25, material: 'wood' },
  window:  { label: '🪟 Window', type: 'window', w: 0.24, h: 0.32, d: 0.06, material: 'glass' },
  door:    { label: '🚪 Door',   type: 'door',   w: 0.3,  h: 0.55, d: 0.06, material: 'wood' },
};

const AVATAR_SPEECHES = {
  room:   ['Nice room!', 'I like the space.', 'Cozy vibes.', 'Good dimensions!'],
  loft:   ['Love the height!', 'Great loft!', 'Penthouse energy.'],
  roof:   ['Looking sharp!', 'That roof slaps.', 'Good shelter!'],
  window: ['Natural light!', 'Great view from here.', 'Love the windows!'],
  door:   ['Grand entrance!', 'Love the doorway.'],
  default:['Keep building!', 'Looking great!', "What's next?"],
};

const STARTER_BLOCKS = [
  { id: 'start-1', type: 'room',   x: -1.2, y: 0.45, z: 0,    w: 1.1, h: 0.9, d: 1.05, material: 'concrete' },
  { id: 'start-2', type: 'room',   x:  0.0, y: 0.55, z: 0,    w: 1.1, h: 1.1, d: 1.05, material: 'wood' },
  { id: 'start-3', type: 'room',   x:  1.2, y: 0.45, z: 0,    w: 1.1, h: 0.9, d: 1.05, material: 'brick' },
  { id: 'start-4', type: 'roof',   x:  0.0, y: 1.42, z: 0,    w: 2.8, h: 0.7, d: 1.25, material: 'wood' },
  { id: 'start-5', type: 'window', x: -1.3, y: 0.55, z: 0.56, w: 0.24, h: 0.3, d: 0.06, material: 'glass' },
  { id: 'start-6', type: 'window', x:  0.0, y: 0.72, z: 0.56, w: 0.24, h: 0.3, d: 0.06, material: 'glass' },
  { id: 'start-7', type: 'door',   x:  1.2, y: 0.3,  z: 0.56, w: 0.3,  h: 0.55, d: 0.06, material: 'wood' },
];

const snap = (v) => Math.round(v / GRID_SIZE) * GRID_SIZE;

// ─── Individual Block Mesh ────────────────────────────────────────────────────

function BuildBlock({ block, isSelected, onClick }) {
  const meshRef = useRef();
  const mat = MATERIALS[block.material] || MATERIALS.concrete;
  const targetY = useRef(-3);
  const arrivedY = useRef(block.y);

  useEffect(() => {
    targetY.current = block.y;
  }, [block.y]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    arrivedY.current = THREE.MathUtils.lerp(arrivedY.current, targetY.current, delta * 6);
    meshRef.current.position.y = arrivedY.current;
  });

  if (block.type === 'roof') {
    return (
      <group ref={meshRef} position={[block.x, block.y, block.z ?? 0]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, Math.PI / 4, 0]}
          onClick={(e) => { e.stopPropagation(); onClick(block.id); }}
        >
          <coneGeometry args={[block.w * 0.72, block.h, 4]} />
          <meshStandardMaterial
            color={isSelected ? '#f7d986' : mat.color}
            roughness={mat.roughness}
            metalness={mat.metalness ?? 0}
            emissive={isSelected ? '#f7d986' : '#000'}
            emissiveIntensity={isSelected ? 0.15 : 0}
          />
        </mesh>
        {isSelected && (
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[block.w * 0.74, block.h + 0.02, 4]} />
            <meshBasicMaterial color="#f7d986" wireframe />
          </mesh>
        )}
      </group>
    );
  }

  return (
    <group ref={meshRef} position={[block.x, block.y, block.z ?? 0]}>
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => { e.stopPropagation(); onClick(block.id); }}
      >
        <boxGeometry args={[block.w, block.h, block.d]} />
        <meshStandardMaterial
          color={isSelected ? '#f7d986' : mat.color}
          roughness={mat.roughness}
          metalness={mat.metalness ?? 0}
          transparent={mat.transparent}
          opacity={mat.opacity ?? 1}
          emissive={isSelected ? '#f7d986' : block.type === 'window' ? '#6aadcc' : '#000'}
          emissiveIntensity={isSelected ? 0.2 : block.type === 'window' ? 0.3 : 0}
        />
      </mesh>
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(block.w + 0.02, block.h + 0.02, block.d + 0.02)]} />
          <lineBasicMaterial color="#f7d986" />
        </lineSegments>
      )}
    </group>
  );
}

// ─── Ground ────────────────────────────────────────────────────────────────────

function Ground() {
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#17130f" roughness={0.9} metalness={0.05} />
      </mesh>
      <Grid
        args={[16, 10]}
        position={[0, 0.002, 0]}
        cellSize={GRID_SIZE}
        cellThickness={0.5}
        cellColor="#4a3a27"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#ccbb87"
        fadeDistance={18}
        fadeStrength={1}
      />
    </>
  );
}

// ─── Ghost preview block ──────────────────────────────────────────────────────

function GhostBlock({ preset, position }) {
  if (!position || !preset) return null;
  const mat = MATERIALS[preset.material] || MATERIALS.concrete;
  return (
    <mesh position={[position.x, preset.h / 2, position.z]}>
      <boxGeometry args={[preset.w, preset.h, preset.d]} />
      <meshStandardMaterial
        color={mat.color}
        transparent
        opacity={0.35}
        roughness={mat.roughness}
      />
    </mesh>
  );
}

// ─── Scene camera controller for render mode ─────────────────────────────────

function CameraController({ renderMode, onRenderDone }) {
  const { camera } = useThree();
  const orbitRef = useRef();
  const renderAngle = useRef(0);
  const rendering = useRef(false);

  useEffect(() => {
    if (renderMode && !rendering.current) {
      rendering.current = true;
      renderAngle.current = 0;
    }
  }, [renderMode]);

  useFrame((_, delta) => {
    if (!rendering.current) return;
    renderAngle.current += delta * 0.6;
    const r = 9;
    camera.position.x = Math.sin(renderAngle.current) * r;
    camera.position.z = Math.cos(renderAngle.current) * r;
    camera.position.y = 4 + Math.sin(renderAngle.current * 0.5) * 1.5;
    camera.lookAt(0, 1, 0);

    if (renderAngle.current >= Math.PI * 2) {
      rendering.current = false;
      onRenderDone?.();
    }
  });

  return null;
}

// ─── Main 3D Scene ────────────────────────────────────────────────────────────

function BuildScene({
  blocks,
  selectedId,
  activeTool,
  onBlockClick,
  onPlaceBlock,
  renderMode,
  onRenderDone,
  avatarTarget,
  avatarSpeech,
}) {
  const buildPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const planeHit = new THREE.Vector3();
  const [ghostPos, setGhostPos] = useState(null);

  const handlePointerMove = (e) => {
    if (!activeTool) return;
    e.ray.intersectPlane(buildPlane, planeHit);
    if (Number.isFinite(planeHit.x)) {
      setGhostPos({ x: snap(planeHit.x), z: snap(planeHit.z) });
    }
  };

  const handlePointerLeave = () => setGhostPos(null);

  const handleClick = (e) => {
    if (e.object.userData?.isGround !== true) return;
    e.ray.intersectPlane(buildPlane, planeHit);
    if (!Number.isFinite(planeHit.x)) return;
    const preset = BLOCK_PRESETS[activeTool];
    if (!preset) return;
    onPlaceBlock({
      x: snap(planeHit.x),
      z: snap(planeHit.z),
    });
  };

  const selectedBlock = blocks.find(b => b.id === selectedId);
  const roomBlocks = blocks.filter(b => b.type === 'room');
  const avatarPos = avatarTarget ?? (
    selectedBlock && selectedBlock.type === 'room'
      ? [selectedBlock.x, selectedBlock.y - selectedBlock.h / 2 + 0.7, selectedBlock.z]
      : [0, 0.7, 1.5]
  );

  return (
    <>
      <color attach="background" args={['#0a0806']} />
      <fog attach="fog" args={['#0a0806', 12, 22]} />

      {/* Lighting */}
      <ambientLight intensity={1.4} color="#fff4df" />
      <directionalLight
        position={[5, 8, 4]}
        intensity={2.2}
        color="#ffe2a8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <pointLight position={[-4, 3, -2]} intensity={0.8} color="#ccbb87" />

      {renderMode && <Stars radius={20} depth={10} count={800} factor={2} fade />}

      <Ground />

      {/* Ghost preview */}
      {ghostPos && activeTool && (
        <GhostBlock preset={BLOCK_PRESETS[activeTool]} position={ghostPos} />
      )}

      {/* Click catcher on ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.003, 0]}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        userData={{ isGround: true }}
      >
        <planeGeometry args={[16, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Blocks */}
      {blocks.map(block => (
        <BuildBlock
          key={block.id}
          block={block}
          isSelected={block.id === selectedId}
          onClick={onBlockClick}
        />
      ))}

      {/* Avatar */}
      <AldenAvatar
        outfit="builder"
        position={[avatarPos[0], avatarPos[1] ?? 0.7, avatarPos[2]]}
        scale={0.7}
        speech={avatarSpeech}
        walkTarget={avatarPos}
      />

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={14}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0.8, 0]}
      />
      <CameraController renderMode={renderMode} onRenderDone={onRenderDone} />
    </>
  );
}

// ─── HUD Overlay ──────────────────────────────────────────────────────────────

function BuildHUD({
  blocks, selectedId, activeTool, activeMaterial,
  onToolChange, onMaterialChange, onAddBlock, onDeleteSelected,
  onReset, onRender, isRendering,
}) {
  const selected = blocks.find(b => b.id === selectedId);
  const rooms = blocks.filter(b => b.type === 'room').length;
  const roofs = blocks.filter(b => b.type === 'roof').length;
  const windows = blocks.filter(b => b.type === 'window').length;
  const sqft = Math.round(blocks.filter(b => b.type === 'room').reduce((s, b) => s + b.w * b.d, 0) * 100);

  return (
    <div className="build-hud">
      {/* Top status bar */}
      <div className="build-hud-topbar">
        <span>[ALDEN BUILD STUDIO]</span>
        <span>{blocks.length} blocks · {rooms} rooms · {sqft} sq ft est.</span>
        {isRendering && <span className="build-hud-rendering">● RENDERING ORBIT…</span>}
      </div>

      {/* Left panel – tools */}
      <div className="build-hud-panel build-hud-tools">
        <div className="build-hud-label">PLACE TOOL</div>
        <div className="build-hud-tool-grid">
          {Object.entries(BLOCK_PRESETS).map(([key, p]) => (
            <button
              key={key}
              className={`build-hud-btn ${activeTool === key ? 'is-active' : ''}`}
              onClick={() => onToolChange(key)}
              title={p.label}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="build-hud-label" style={{ marginTop: '1rem' }}>MATERIAL</div>
        <div className="build-hud-mat-grid">
          {Object.entries(MATERIALS).map(([key, m]) => (
            <button
              key={key}
              className={`build-hud-mat-swatch ${activeMaterial === key ? 'is-active' : ''}`}
              style={{ '--mat-color': m.color }}
              onClick={() => onMaterialChange(key)}
              title={m.label}
            >
              <span className="build-hud-mat-dot" />
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        <div className="build-hud-actions">
          <button className="build-hud-btn" onClick={() => onAddBlock()}>Quick Add</button>
          <button className="build-hud-btn is-danger" onClick={onDeleteSelected} disabled={!selectedId}>Delete</button>
          <button className="build-hud-btn" onClick={onReset}>Reset</button>
        </div>
      </div>

      {/* Right panel – inspector */}
      <div className="build-hud-panel build-hud-inspector">
        <div className="build-hud-label">INSPECTOR</div>
        <div className="build-hud-stats">
          <div className="build-hud-stat"><strong>{rooms}</strong><span>Rooms</span></div>
          <div className="build-hud-stat"><strong>{roofs}</strong><span>Roofs</span></div>
          <div className="build-hud-stat"><strong>{windows}</strong><span>Windows</span></div>
          <div className="build-hud-stat"><strong>{sqft}</strong><span>sq ft</span></div>
        </div>

        {selected && (
          <div className="build-hud-selected">
            <div className="build-hud-label" style={{ marginTop: '0.75rem' }}>SELECTED</div>
            <div className="build-hud-selected-info">
              <strong>{selected.type.toUpperCase()}</strong>
              <span>{selected.w?.toFixed(2)}m × {selected.d?.toFixed(2)}m</span>
              <span>H: {selected.h?.toFixed(2)}m</span>
              <span>Mat: {MATERIALS[selected.material]?.label ?? '—'}</span>
            </div>
            {/* Material quick-swap on selected block */}
            <div className="build-hud-label" style={{ marginTop: '0.5rem' }}>SWAP MATERIAL</div>
            <div className="build-hud-mat-grid">
              {Object.entries(MATERIALS).map(([key, m]) => (
                <button
                  key={key}
                  className={`build-hud-mat-swatch ${selected.material === key ? 'is-active' : ''}`}
                  style={{ '--mat-color': m.color }}
                  onClick={() => onMaterialChange(key, selectedId)}
                  title={m.label}
                >
                  <span className="build-hud-mat-dot" />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className={`build-hud-render-btn ${isRendering ? 'is-rendering' : ''}`}
          onClick={onRender}
          disabled={isRendering}
        >
          {isRendering ? '⟳ Rendering…' : '▶ Render Preview'}
        </button>
      </div>

      <style>{`
        .build-hud {
          position: absolute;
          inset: 0;
          pointer-events: none;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(231,229,223,0.85);
          text-transform: uppercase;
        }
        .build-hud-topbar {
          position: absolute;
          top: 0.85rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.6rem 1rem;
          border: 1px solid rgba(204,187,135,0.2);
          border-radius: 999px;
          background: rgba(5,5,5,0.55);
          backdrop-filter: blur(14px);
          pointer-events: none;
          font-size: 0.66rem;
        }
        .build-hud-rendering {
          color: #f7d986;
          animation: hudBlink 0.7s ease-in-out infinite;
        }
        @keyframes hudBlink { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }

        .build-hud-panel {
          position: absolute;
          padding: 0.9rem;
          border: 1px solid rgba(231,229,223,0.12);
          border-radius: 1.1rem;
          background: rgba(5,5,5,0.6);
          backdrop-filter: blur(14px);
          pointer-events: all;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .build-hud-tools {
          top: 4.2rem;
          left: 0.85rem;
          width: 14rem;
        }
        .build-hud-inspector {
          top: 4.2rem;
          right: 0.85rem;
          width: 13.5rem;
        }

        .build-hud-label {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          color: #ccbb87;
          margin-bottom: 0.2rem;
        }

        .build-hud-tool-grid {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .build-hud-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 0.7rem;
          border: 1px solid rgba(204,187,135,0.28);
          border-radius: 0.6rem;
          background: rgba(255,255,255,0.04);
          color: rgba(231,229,223,0.8);
          font-family: inherit;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.18s ease;
          text-align: center;
        }
        .build-hud-btn:hover { background: rgba(204,187,135,0.15); color: #f7d986; }
        .build-hud-btn.is-active { background: #ccbb87; color: #050505; border-color: #ccbb87; }
        .build-hud-btn.is-danger { border-color: rgba(239,68,68,0.4); }
        .build-hud-btn.is-danger:hover { background: rgba(239,68,68,0.2); color: #f87171; }
        .build-hud-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .build-hud-actions {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          margin-top: 0.3rem;
        }

        .build-hud-mat-grid {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .build-hud-mat-swatch {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.6rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
          background: rgba(255,255,255,0.03);
          color: rgba(231,229,223,0.7);
          font-family: inherit;
          font-size: 0.66rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.16s ease;
        }
        .build-hud-mat-swatch:hover { background: rgba(255,255,255,0.08); }
        .build-hud-mat-swatch.is-active { border-color: #f7d986; color: #f7d986; background: rgba(247,217,134,0.1); }
        .build-hud-mat-dot {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          background: var(--mat-color);
          flex-shrink: 0;
        }

        .build-hud-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.4rem;
        }
        .build-hud-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.45rem;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.6rem;
          background: rgba(255,255,255,0.03);
        }
        .build-hud-stat strong { font-size: 1rem; color: #f7d986; font-weight: 500; }
        .build-hud-stat span { font-size: 0.58rem; color: rgba(231,229,223,0.55); }

        .build-hud-selected-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.5rem;
          border: 1px solid rgba(247,217,134,0.2);
          border-radius: 0.6rem;
          background: rgba(247,217,134,0.05);
        }
        .build-hud-selected-info strong { color: #f7d986; font-size: 0.8rem; }
        .build-hud-selected-info span { color: rgba(231,229,223,0.65); font-size: 0.64rem; }

        .build-hud-render-btn {
          margin-top: 0.6rem;
          padding: 0.65rem;
          border: 1px solid #ccbb87;
          border-radius: 0.7rem;
          background: rgba(204,187,135,0.1);
          color: #ccbb87;
          font-family: inherit;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          pointer-events: all;
        }
        .build-hud-render-btn:hover { background: #ccbb87; color: #050505; }
        .build-hud-render-btn.is-rendering { opacity: 0.6; cursor: not-allowed; }
        .build-hud-render-btn:disabled { opacity: 0.5; }

        @media (max-width: 760px) {
          .build-hud-tools { width: 11rem; }
          .build-hud-inspector { width: 11rem; }
          .build-hud-topbar span:nth-child(2) { display: none; }
        }
      `}</style>
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────

export default function SimsBuilder() {
  const [blocks, setBlocks] = useState(STARTER_BLOCKS);
  const [selectedId, setSelectedId] = useState(STARTER_BLOCKS[0].id);
  const [activeTool, setActiveTool] = useState('room');
  const [activeMaterial, setActiveMaterial] = useState('concrete');
  const [renderMode, setRenderMode] = useState(false);
  const [avatarSpeech, setAvatarSpeech] = useState('Welcome! Click to build.');
  const shellRef = useRef();

  const pickSpeech = useCallback((type) => {
    const pool = AVATAR_SPEECHES[type] ?? AVATAR_SPEECHES.default;
    return pool[Math.floor(Math.random() * pool.length)];
  }, []);

  const handlePlaceBlock = useCallback(({ x, z }) => {
    const preset = BLOCK_PRESETS[activeTool];
    if (!preset) return;
    const roomCount = blocks.filter(b => b.type === 'room').length;
    const y = preset.type === 'roof'
      ? preset.h / 2 + 1.05
      : preset.type === 'window' || preset.type === 'door'
        ? 0.45
        : preset.h / 2;

    const newBlock = {
      id: `${activeTool}-${Date.now()}`,
      type: preset.type,
      x, y,
      z: preset.type === 'window' || preset.type === 'door' ? z + 0.52 : z,
      w: preset.w, h: preset.h, d: preset.d,
      material: activeMaterial,
    };
    setBlocks(prev => [...prev, newBlock]);
    setSelectedId(newBlock.id);
    setAvatarSpeech(pickSpeech(activeTool));
  }, [activeTool, activeMaterial, blocks, pickSpeech]);

  const handleAddBlock = useCallback(() => {
    const preset = BLOCK_PRESETS[activeTool];
    if (!preset) return;
    const idx = blocks.length;
    const x = -2.5 + (idx % 6) * 1.0;
    handlePlaceBlock({ x, z: 0 });
  }, [activeTool, blocks.length, handlePlaceBlock]);

  const handleMaterialChange = useCallback((matKey, blockId = null) => {
    setActiveMaterial(matKey);
    if (blockId) {
      setBlocks(prev => prev.map(b => b.id === blockId ? { ...b, material: matKey } : b));
    }
  }, []);

  const handleBlockClick = useCallback((id) => {
    setSelectedId(id);
    const block = blocks.find(b => b.id === id);
    if (block) setAvatarSpeech(pickSpeech(block.type));
  }, [blocks, pickSpeech]);

  const handleDeleteSelected = useCallback(() => {
    if (!selectedId || blocks.length <= 1) return;
    setBlocks(prev => {
      const next = prev.filter(b => b.id !== selectedId);
      setSelectedId(next[next.length - 1]?.id ?? null);
      return next;
    });
  }, [selectedId, blocks.length]);

  const handleReset = useCallback(() => {
    setBlocks(STARTER_BLOCKS);
    setSelectedId(STARTER_BLOCKS[0].id);
    setAvatarSpeech('Fresh start! Let\'s build!');
  }, []);

  const handleRender = useCallback(() => {
    setRenderMode(true);
    setAvatarSpeech('Rendering your masterpiece!');
  }, []);

  const handleRenderDone = useCallback(() => {
    setRenderMode(false);
    setAvatarSpeech('Looking amazing!');
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#ccbb87', '#f7d986', '#ffffff', '#e7e5df'],
    });
  }, []);

  const selectedBlock = blocks.find(b => b.id === selectedId);
  const avatarTarget = selectedBlock && selectedBlock.type === 'room'
    ? [selectedBlock.x, selectedBlock.y - selectedBlock.h / 2 + 0.68, selectedBlock.z]
    : null;

  return (
    <div ref={shellRef} className="sims-builder-shell">
      <Canvas
        shadows
        camera={{ position: [6, 5, 7], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <BuildScene
          blocks={blocks}
          selectedId={selectedId}
          activeTool={activeTool}
          onBlockClick={handleBlockClick}
          onPlaceBlock={handlePlaceBlock}
          renderMode={renderMode}
          onRenderDone={handleRenderDone}
          avatarTarget={avatarTarget}
          avatarSpeech={avatarSpeech}
        />
      </Canvas>

      <BuildHUD
        blocks={blocks}
        selectedId={selectedId}
        activeTool={activeTool}
        activeMaterial={activeMaterial}
        onToolChange={setActiveTool}
        onMaterialChange={handleMaterialChange}
        onAddBlock={handleAddBlock}
        onDeleteSelected={handleDeleteSelected}
        onReset={handleReset}
        onRender={handleRender}
        isRendering={renderMode}
      />

      <style>{`
        .sims-builder-shell {
          position: relative;
          width: 100%;
          height: clamp(36rem, 78vh, 52rem);
          border: 1px solid rgba(231,229,223,0.12);
          border-radius: clamp(1.4rem, 3vw, 2rem);
          overflow: hidden;
          background: #0a0806;
          box-shadow: 0 2rem 5rem rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
