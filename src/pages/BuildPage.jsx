import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import Navbar from '@/components/home/Navbar';
import FooterSection from '@/components/home/FooterSection';
import BuildHeroScene from '@/components/3d/BuildHeroScene';
import SimsBuilder from '@/components/3d/SimsBuilder';

const CONSTRUCTION_SERVICES = [
  {
    name: "Steel Frame Homes",
    description: "Durable and affordable steel frame construction",
    price: "From $XXk",
    bedrooms: "1-3 BR",
    timeline: "3-4 months",
    features: ["Earthquake resistant", "Energy efficient", "Low maintenance", "Customizable designs"],
    status: "coming-soon"
  },
  {
    name: "Container Homes",
    description: "Modern container home conversions",
    price: "From $XXk",
    bedrooms: "Studio-2BR",
    timeline: "2-3 months",
    features: ["Sustainable materials", "Quick construction", "Portable design", "Modern finishes"],
    status: "coming-soon"
  },
  {
    name: "Blueprint Packages",
    description: "DIY home building plans and materials",
    price: "From $XXX",
    bedrooms: "Various",
    timeline: "DIY timeline",
    features: ["Detailed plans", "Material lists", "Construction guide", "Support consultation"],
    status: "available"
  }
];

const WAITLIST_BENEFITS = [
  "Early bird pricing discounts",
  "Priority access to first homes",
  "Exclusive design previews",
  "Regular construction updates",
  "Invitation to launch events"
];

const STARTER_BUILD_BLOCKS = [
  { id: 'base-1', type: 'room', x: -2.4, y: 0.45, z: 0, width: 1.3, height: 0.9, depth: 1.05, color: '#d6c79b' },
  { id: 'base-2', type: 'room', x: -1.05, y: 0.55, z: 0, width: 1.15, height: 1.1, depth: 1.05, color: '#f0eadc' },
  { id: 'base-3', type: 'room', x: 0.2, y: 0.45, z: 0, width: 1.25, height: 0.9, depth: 1.05, color: '#c9b47a' },
  { id: 'base-4', type: 'room', x: 1.45, y: 0.65, z: 0, width: 1.05, height: 1.3, depth: 1.05, color: '#e7dfc8' },
  { id: 'roof-1', type: 'roof', x: -1.05, y: 1.32, z: 0, width: 2.7, height: 0.75, depth: 1.25, color: '#8f5a2f' },
  { id: 'roof-2', type: 'roof', x: 1.45, y: 1.55, z: 0, width: 1.35, height: 0.62, depth: 1.25, color: '#9a6031' },
  { id: 'window-1', type: 'window', x: -2.65, y: 0.58, z: 0.56, width: 0.22, height: 0.26, depth: 0.06, color: '#f7d986' },
  { id: 'window-2', type: 'window', x: -0.95, y: 0.72, z: 0.56, width: 0.24, height: 0.3, depth: 0.06, color: '#f7d986' },
  { id: 'window-3', type: 'window', x: 0.1, y: 0.58, z: 0.56, width: 0.24, height: 0.26, depth: 0.06, color: '#f7d986' },
  { id: 'window-4', type: 'window', x: 1.45, y: 0.82, z: 0.56, width: 0.24, height: 0.32, depth: 0.06, color: '#f7d986' },
];

const BUILD_BLOCK_PRESETS = {
  room: { label: 'Room', type: 'room', width: 1.1, height: 0.9, depth: 1.05, color: '#e7dfc8' },
  tower: { label: 'Loft', type: 'room', width: 0.9, height: 1.3, depth: 1.05, color: '#d6c79b' },
  roof: { label: 'Roof', type: 'roof', width: 1.35, height: 0.62, depth: 1.25, color: '#9a6031' },
  window: { label: 'Window', type: 'window', width: 0.24, height: 0.3, depth: 0.06, color: '#f7d986' },
};

const BUILD_VIEW_MODES = {
  iso: { label: 'Iso', position: [6, 5, 7], zoom: 1 },
  plan: { label: 'Plan', position: [0, 9, 0.001], zoom: 1.2 },
  front: { label: 'Front', position: [0, 2.5, 8], zoom: 1.1 },
};

const snapToGrid = (value, size = 0.5) => Math.round(value / size) * size;

function BuildHeroAnimation() {
  const towers = [
    { label: 'FOUNDATION', height: '34%', delay: '0s' },
    { label: 'GRID', height: '52%', delay: '0.12s' },
    { label: 'FRAME', height: '72%', delay: '0.24s' },
    { label: 'ROOF', height: '46%', delay: '0.36s' },
    { label: 'SNAP', height: '62%', delay: '0.48s' },
  ];

  return (
    <div className="build-hero-animation" aria-label="Construction loading animation">
      <div className="build-hero-blueprint" aria-hidden="true" />
      <div className="build-hero-crane" aria-hidden="true">
        <span />
      </div>
      <div className="build-hero-skyline" aria-hidden="true">
        {towers.map((tower) => (
          <span
            key={tower.label}
            style={{
              '--tower-height': tower.height,
              '--tower-delay': tower.delay,
            }}
          >
            <i>{tower.label}</i>
          </span>
        ))}
      </div>
      <div className="build-hero-foundation" aria-hidden="true" />
      <div className="build-hero-animation-copy">
        <span>[BUILD OUT LOADING]</span>
        <strong>Interactive block planner below</strong>
      </div>
    </div>
  );
}

function BuildSkylineExperience() {
  const canvasRef = useRef(null);
  const sceneRefs = useRef({});
  const activeToolRef = useRef('room');
  const viewModeRef = useRef('iso');
  const [blocks, setBlocks] = useState(STARTER_BUILD_BLOCKS);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTool, setActiveTool] = useState('room');
  const [selectedBlockId, setSelectedBlockId] = useState(STARTER_BUILD_BLOCKS[0].id);
  const [viewMode, setViewMode] = useState('iso');

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);
  const roomCount = blocks.filter((block) => block.type === 'room').length;
  const roofCount = blocks.filter((block) => block.type === 'roof').length;
  const windowCount = blocks.filter((block) => block.type === 'window').length;
  const floorArea = blocks
    .filter((block) => block.type === 'room')
    .reduce((total, block) => total + block.width * block.depth, 0);

  useEffect(() => {
    activeToolRef.current = activeTool;
  }, [activeTool]);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLoadingProgress((progress) => {
        if (progress >= 100) {
          window.clearInterval(timer);
          return 100;
        }

        return Math.min(100, progress + 4);
      });
    }, 70);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 3.4, -2.4, 0.1, 100);
    camera.position.set(6, 5, 7);
    camera.lookAt(0, 0.7, 0);
    camera.zoom = 1;
    camera.updateProjectionMatrix();

    const ambientLight = new THREE.AmbientLight('#fff4df', 1.8);
    const keyLight = new THREE.DirectionalLight('#ffe2a8', 2.4);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    scene.add(ambientLight, keyLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5.5),
      new THREE.MeshStandardMaterial({
        color: '#17130f',
        roughness: 0.84,
        metalness: 0.08,
        transparent: true,
        opacity: 0.74,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.02;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(10, 18, '#ccbb87', '#4a3a27');
    grid.position.y = 0.01;
    scene.add(grid);

    const skylineGroup = new THREE.Group();
    skylineGroup.position.y = -0.1;
    scene.add(skylineGroup);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const buildPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const planeHit = new THREE.Vector3();

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const blockHits = raycaster.intersectObjects(skylineGroup.children, false);
      if (blockHits[0]?.object?.userData?.blockId) {
        setSelectedBlockId(blockHits[0].object.userData.blockId);
        return;
      }

      raycaster.ray.intersectPlane(buildPlane, planeHit);
      if (!Number.isFinite(planeHit.x) || !Number.isFinite(planeHit.z)) return;

      const tool = activeToolRef.current;
      const preset = BUILD_BLOCK_PRESETS[tool] || BUILD_BLOCK_PRESETS.room;
      const x = Math.max(-4.25, Math.min(4.25, snapToGrid(planeHit.x)));
      const z = Math.max(-2.25, Math.min(2.25, snapToGrid(planeHit.z)));
      const y = preset.type === 'roof' ? preset.height / 2 + 1.05 : preset.type === 'window' ? 0.75 : preset.height / 2;
      const nextBlock = {
        id: `${tool}-${Date.now()}`,
        type: preset.type,
        x,
        y,
        z: preset.type === 'window' ? z + 0.52 : z,
        width: preset.width,
        height: preset.height,
        depth: preset.depth,
        color: preset.color,
      };

      setBlocks((currentBlocks) => [...currentBlocks, nextBlock]);
      setSelectedBlockId(nextBlock.id);
    };

    const resize = () => {
      const width = canvas.clientWidth || 800;
      const height = canvas.clientHeight || 520;
      const aspect = width / height;
      const frustum = 5.8;

      camera.left = (-frustum * aspect) / 2;
      camera.right = (frustum * aspect) / 2;
      camera.top = frustum / 2;
      camera.bottom = -frustum / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const target = sceneRefs.current.cameraTarget || BUILD_VIEW_MODES.iso;
      camera.position.lerp(new THREE.Vector3(...target.position), 0.06);
      camera.zoom += ((target.zoom || 1) - camera.zoom) * 0.08;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0.7, 0);

      const currentView = viewModeRef.current;
      skylineGroup.rotation.y = currentView === 'iso' ? Math.sin(elapsed * 0.32) * 0.045 + mouse.x * 0.025 : 0;
      skylineGroup.rotation.x = currentView === 'iso' ? -mouse.y * 0.018 : 0;

      skylineGroup.children.forEach((mesh) => {
        if (!mesh.userData) return;
        const targetY = mesh.userData.targetY || 0;
        const speed = mesh.userData.speed || 0.08;
        mesh.position.y += (targetY - mesh.position.y) * speed;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    sceneRefs.current = { renderer, scene, camera, skylineGroup, cameraTarget: BUILD_VIEW_MODES.iso };

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      skylineGroup.children.forEach((child) => {
        child.geometry?.dispose();
        child.material?.dispose();
      });
      floor.geometry.dispose();
      floor.material.dispose();
      renderer.dispose();
      sceneRefs.current = {};
    };
  }, []);

  useEffect(() => {
    if (sceneRefs.current.cameraTarget) {
      sceneRefs.current.cameraTarget = BUILD_VIEW_MODES[viewMode] || BUILD_VIEW_MODES.iso;
    }
  }, [viewMode]);

  useEffect(() => {
    const { skylineGroup } = sceneRefs.current;
    if (!skylineGroup) return;

    while (skylineGroup.children.length) {
      const child = skylineGroup.children.pop();
      child.geometry?.dispose();
      child.material?.dispose();
    }

    blocks.forEach((block, index) => {
      let mesh;
      const isSelected = block.id === selectedBlockId;

      if (block.type === 'roof') {
        mesh = new THREE.Mesh(
          new THREE.ConeGeometry(block.width, block.height, 4),
          new THREE.MeshStandardMaterial({
            color: block.color,
            roughness: 0.7,
            metalness: 0.05,
            emissive: isSelected ? '#ccbb87' : '#000000',
            emissiveIntensity: isSelected ? 0.24 : 0,
          })
        );
        mesh.rotation.y = Math.PI / 4;
        mesh.scale.z = block.depth;
      } else {
        mesh = new THREE.Mesh(
          new THREE.BoxGeometry(block.width, block.height, block.depth),
          new THREE.MeshStandardMaterial({
            color: block.color,
            roughness: block.type === 'window' ? 0.28 : 0.78,
            metalness: block.type === 'window' ? 0.35 : 0.08,
            emissive: isSelected ? '#ccbb87' : block.type === 'window' ? '#7a4f16' : '#000000',
            emissiveIntensity: isSelected ? 0.28 : block.type === 'window' ? 0.55 : 0,
          })
        );
      }

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.set(block.x, -2.2 - index * 0.08, block.z || 0);
      mesh.userData = {
        blockId: block.id,
        targetY: block.y,
        speed: 0.055 + Math.min(index, 10) * 0.004,
      };
      skylineGroup.add(mesh);

      if (isSelected) {
        const outline = new THREE.LineSegments(
          new THREE.EdgesGeometry(mesh.geometry),
          new THREE.LineBasicMaterial({ color: '#f7d986' })
        );
        outline.scale.copy(mesh.scale);
        outline.rotation.copy(mesh.rotation);
        outline.userData = { blockId: block.id, isOutline: true, targetY: block.y, speed: mesh.userData.speed };
        outline.position.copy(mesh.position);
        skylineGroup.add(outline);
      }
    });
  }, [blocks, selectedBlockId]);

  const addBlock = (presetKey, placement = null) => {
    const preset = BUILD_BLOCK_PRESETS[presetKey];
    const roomBlocks = blocks.filter((block) => block.type === 'room').length;
    const x = placement?.x ?? -2.7 + (blocks.length % 7) * 0.9;
    const z = placement?.z ?? 0;
    const y = placement?.y ?? (preset.type === 'roof' ? 1.55 + Math.floor(roomBlocks / 4) * 0.55 : preset.type === 'window' ? 0.68 + (blocks.length % 3) * 0.22 : preset.height / 2 + Math.floor(roomBlocks / 4) * 0.95);
    const nextBlock = {
      id: `${presetKey}-${Date.now()}`,
      type: preset.type,
      x,
      y,
      z: preset.type === 'window' ? z + 0.56 : z,
      width: preset.width,
      height: preset.height,
      depth: preset.depth,
      color: preset.color,
    };

    setBlocks((currentBlocks) => [...currentBlocks, nextBlock]);
    setSelectedBlockId(nextBlock.id);
  };

  const resetBlocks = () => {
    setBlocks(STARTER_BUILD_BLOCKS);
    setSelectedBlockId(STARTER_BUILD_BLOCKS[0].id);
  };

  const removeSelectedBlock = () => {
    setBlocks((currentBlocks) => {
      if (!selectedBlockId || currentBlocks.length <= 1) return currentBlocks;
      const nextBlocks = currentBlocks.filter((block) => block.id !== selectedBlockId);
      setSelectedBlockId(nextBlocks[nextBlocks.length - 1]?.id || null);
      return nextBlocks;
    });
  };

  const placeFromPlan = (event) => {
    if (event.target !== event.currentTarget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const percentX = ((event.clientX - rect.left) / rect.width) * 100;
    const percentY = ((event.clientY - rect.top) / rect.height) * 100;
    const x = snapToGrid(((percentX - 50) / 42) * 5);
    const z = snapToGrid(((percentY - 50) / 42) * 3);
    const preset = BUILD_BLOCK_PRESETS[activeTool] || BUILD_BLOCK_PRESETS.room;
    const y = preset.type === 'roof' ? preset.height / 2 + 1.05 : preset.type === 'window' ? 0.75 : preset.height / 2;

    addBlock(activeTool, { x, y, z });
  };

  return (
    <div className="build-three-shell">
      <canvas ref={canvasRef} className="build-three-canvas" aria-label="Interactive Three.js construction skyline" />

      <div className="build-loading-panel" aria-hidden="true">
        <span>[CONSTRUCTION LOADING]</span>
        <div className="build-progress-track">
          <i style={{ width: `${loadingProgress}%` }} />
        </div>
        <strong>{String(Math.round(loadingProgress)).padStart(3, '0')}%</strong>
      </div>

      <div className="build-view-panel" aria-label="Change builder view">
        {Object.entries(BUILD_VIEW_MODES).map(([key, view]) => (
          <button
            key={key}
            type="button"
            className={viewMode === key ? 'is-active' : ''}
            onClick={() => setViewMode(key)}
          >
            {view.label}
          </button>
        ))}
      </div>

      <div className="build-block-panel">
        <div className="build-block-panel__header">
          <span className="build-block-panel__eyebrow">CAD Block Tools</span>
          <span className="build-block-panel__count">{blocks.length} Blocks</span>
        </div>
        <p className="build-block-panel__hint">
          Select a tool, then click the grid to place snapped components.
        </p>
        <div className="build-block-actions">
          {Object.entries(BUILD_BLOCK_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              className={activeTool === key ? 'is-active' : ''}
              onClick={() => setActiveTool(key)}
            >
              {preset.label}
            </button>
          ))}
          <button type="button" onClick={() => addBlock(activeTool)}>
            Quick Add
          </button>
          <button type="button" onClick={removeSelectedBlock}>
            Delete
          </button>
          <button type="button" onClick={resetBlocks}>
            Reset
          </button>
        </div>
      </div>

      <div className="build-inspector-panel">
        <span className="build-panel-label">Inspector</span>
        <div className="build-stat-grid">
          <span>
            <strong>{roomCount}</strong>
            Rooms
          </span>
          <span>
            <strong>{roofCount}</strong>
            Roofs
          </span>
          <span>
            <strong>{windowCount}</strong>
            Windows
          </span>
          <span>
            <strong>{Math.round(floorArea * 100)}</strong>
            Est. sq ft
          </span>
        </div>
        <div className="build-selection-readout">
          <span>Selected</span>
          <strong>{selectedBlock ? selectedBlock.type.toUpperCase() : 'NONE'}</strong>
          <small>
            {selectedBlock
              ? `${selectedBlock.width.toFixed(2)}m x ${selectedBlock.depth.toFixed(2)}m · H ${selectedBlock.height.toFixed(2)}m`
              : 'Click a block or place a new component'}
          </small>
        </div>
      </div>

      <div className="build-plan-panel" aria-label="2D snapped floor plan preview">
        <span className="build-panel-label">Plan View</span>
        <div className="build-plan-grid" onClick={placeFromPlan}>
          {blocks
            .filter((block) => block.type !== 'roof')
            .map((block) => (
              <button
                key={block.id}
                type="button"
                className={`build-plan-block is-${block.type} ${block.id === selectedBlockId ? 'is-selected' : ''}`}
                style={{
                  left: `${50 + (block.x / 5) * 42}%`,
                  top: `${50 + ((block.z || 0) / 3) * 42}%`,
                  width: `${Math.max(4, block.width * 7)}%`,
                  height: `${Math.max(4, block.depth * 10)}%`,
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedBlockId(block.id);
                }}
                aria-label={`Select ${block.type} block`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default function BuildPage() {
  const letterRefs = useRef([]);
  const cardRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeType: '',
    timeline: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero letters drop in
      const letters = letterRefs.current.filter(Boolean);
      gsap.fromTo(letters,
        { y: -140, opacity: 0, rotateX: -50 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.9,
          ease: 'back.out(1.6)',
          stagger: 0.08,
          delay: 0.4,
        }
      );

      // Kicker line
      gsap.fromTo('.build-hero-kicker',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.25 }
      );

      // Service cards scroll-triggered
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 52 },
          {
            opacity: 1, y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cards[0].closest('section') || cards[0],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', phone: '', homeType: '', timeline: '', message: '' });
  };

  const heroLetters = ['B', 'U', 'I', 'L', 'D'];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="build-hero relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="build-hero-grid" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <div className="build-hero-content">
          <div className="build-hero-copy">
            <span className="build-hero-kicker">ALDEN'S CONSTRUCTION · MODULAR HOMES</span>
            <h1 className="sr-only">Build</h1>
            <div className="build-hero-title" aria-hidden="true">
              {heroLetters.map((letter, index) => (
                <span
                  key={index}
                  ref={el => letterRefs.current[index] = el}
                  style={{
                    opacity: 0,
                    transform: 'translateY(-160px)',
                    transition: 'opacity 0.9s cubic-bezier(0.77,0.02,0.38,1), transform 0.9s cubic-bezier(0.77,0.02,0.38,1)'
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <p>
              A modular construction experience for planning steel frame homes, container homes, and blueprint packages with building blocks.
            </p>
            <a href="#construction-studio">Start Building</a>
          </div>

          <BuildHeroAnimation />
        </div>
      </section>

      {/* Construction Studio */}
      <section id="construction-studio" className="build-studio-section">
        <div className="build-studio-shell">
          <div className="build-studio-heading">
            <span>Interactive Construction Studio</span>
            <h2>Build With Snapped Blocks</h2>
            <p>
              A Revit/AutoCAD-inspired playground for sketching modular homes. Switch views, place rooms, roofs, and windows, then use the plan grid to build out the concept as a full feature.
            </p>
          </div>
          <BuildSkylineExperience />
        </div>
      </section>

      {/* Build Header */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-gradient-to-b from-transparent via-black/80 to-transparent">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2rem, 4vw, 3.75rem)', marginBottom: '2rem', color: 'hsl(var(--foreground))' }}>ALDEN'S CONSTRUCTION</h2>
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-5">Affordable Homes · Steel Frames · Coming 2026</p>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: 'clamp(0.875rem, 1vw, 1rem)', color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            Affordable homes for Jamaica. Steel frames, container homes, and blueprint packages designed for modern living. Building the future of Jamaican housing with sustainable, cost-effective solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Home Types</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {CONSTRUCTION_SERVICES.map((service, index) => (
              <div
                key={service.name}
                ref={el => cardRefs.current[index] = el}
                data-index={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)'
                }}
              >
                <div className="mb-5">
                  <span className={`text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border ${
                    service.status === 'coming-soon' 
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
                      : 'bg-green-500/20 text-green-400 border-green-500/30'
                  }`}>
                    {service.status === 'coming-soon' ? 'Coming Soon' : 'Available'}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.5rem', marginBottom: '1rem', color: 'hsl(var(--foreground))' }}>{service.name}</h3>
                <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>{service.description}</p>
                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Price:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))', fontWeight: '600' }}>{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Bedrooms:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))', fontWeight: '600' }}>{service.bedrooms}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>Timeline:</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--accent))', fontWeight: '600' }}>{service.timeline}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <span className="text-accent text-sm font-bold">+</span>
                      <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 px-6 md:px-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Join Our Waitlist</h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                Be the first to know when ALDEN'S CONSTRUCTION launches. Get exclusive access to early bird pricing and priority home selection.
              </p>
              <div className="flex flex-col gap-5">
                {WAITLIST_BENEFITS.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-2xl text-accent/80 min-w-[30px]" style={{ fontFamily: 'Koulen, cursive' }}>{index + 1}</span>
                    <span style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Phone Number</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Preferred Home Type</label>
                  <select 
                    value={formData.homeType}
                    onChange={e => setFormData({...formData, homeType: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >
                    <option value="">Select a home type</option>
                    <option value="steel-frame">Steel Frame Home</option>
                    <option value="container">Container Home</option>
                    <option value="blueprint">Blueprint Package</option>
                    <option value="all">Interested in all options</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Timeline</label>
                  <select 
                    value={formData.timeline}
                    onChange={e => setFormData({...formData, timeline: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready now</option>
                    <option value="6months">Within 6 months</option>
                    <option value="1year">Within 1 year</option>
                    <option value="2years">Within 2 years</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-muted-foreground mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>Additional Comments</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent focus:bg-white/[0.15] transition-all resize-y" style={{ fontFamily: 'Roboto Mono, monospace' }}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 px-6 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all" style={{ fontFamily: 'Roboto Mono, monospace' }}
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 md:px-10 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '4rem', color: 'hsl(var(--foreground))', textAlign: 'center' }}>Project Timeline</h2>
          <div className="flex flex-col gap-10">
            {[
              { year: '2024', title: 'Planning & Design', desc: 'Finalizing home designs, securing permits, and establishing construction partnerships.' },
              { year: '2025', title: 'Pilot Program', desc: 'Building first homes, testing construction methods, and refining processes.' },
              { year: '2026', title: 'Full Launch', desc: "Official launch of ALDEN'S CONSTRUCTION with full construction capabilities and home deliveries." }
            ].map((item, index) => (
              <div key={item.year} className="flex gap-8 md:gap-10 items-start">
                <div className="text-2xl text-accent min-w-[100px] text-right" style={{ fontFamily: 'Koulen, cursive' }}>{item.year}</div>
                <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 style={{ fontFamily: 'Koulen, cursive', fontSize: '1.25rem', marginBottom: '0.75rem', color: 'hsl(var(--foreground))' }}>{item.title}</h3>
                  <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-10 text-center bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'Koulen, cursive', fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: '1.25rem', color: 'hsl(var(--foreground))' }}>Ready to Build Your Future?</h2>
          <p style={{ fontFamily: 'Roboto Mono, monospace', fontSize: '1rem', color: 'hsl(var(--muted-foreground))', marginBottom: '2.5rem' }}>Join our waitlist and be part of Jamaica's affordable housing revolution</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="#waitlist" className="py-4 px-8 bg-white text-black text-sm tracking-wider uppercase rounded-lg hover:bg-white/90 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              Join Waitlist
            </a>
            <a href="/contact" className="py-4 px-8 bg-transparent border border-white/50 text-white text-sm tracking-wider uppercase rounded-lg hover:bg-white/10 transition-all min-w-[180px]" style={{ fontFamily: 'Roboto Mono, monospace' }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <FooterSection />

      <style>{`
        .build-hero {
          background:
            radial-gradient(circle at 70% 20%, rgba(204, 187, 135, 0.16), transparent 34rem),
            radial-gradient(circle at 15% 82%, rgba(255, 255, 255, 0.08), transparent 28rem),
            #050505;
        }

        .build-hero-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(231, 229, 223, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(231, 229, 223, 0.055) 1px, transparent 1px);
          background-size: clamp(2.5rem, 7vw, 5.5rem) clamp(2.5rem, 7vw, 5.5rem);
          mask-image: radial-gradient(circle at center, black, transparent 75%);
        }

        .build-hero-content {
          position: relative;
          z-index: 2;
          width: min(100%, 92rem);
          min-height: 100svh;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(24rem, 1.1fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 5rem);
          padding: clamp(7rem, 12vh, 9rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vh, 5rem);
        }

        .build-hero-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .build-hero-kicker {
          margin-bottom: 1.25rem;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.72rem, 1.1vw, 0.88rem);
          letter-spacing: 0.28em;
          color: #ccbb87;
          text-transform: uppercase;
        }

        .build-hero-title {
          display: flex;
          gap: clamp(0.08em, 0.8vw, 0.14em);
          margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
        }

        .build-hero-title span {
          display: inline-block;
          font-family: 'Koulen', cursive;
          font-size: clamp(5.5rem, 13vw, 13rem);
          line-height: 0.72;
          color: #e7e5df;
          text-shadow: 0 0 3rem rgba(204, 187, 135, 0.16);
        }

        .build-hero-copy p {
          max-width: 40rem;
          margin: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.95rem, 1.4vw, 1.08rem);
          line-height: 1.8;
          color: rgba(231, 229, 223, 0.72);
        }

        .build-hero-copy a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
          margin-top: 2rem;
          padding: 0.9rem 1.35rem;
          border: 1px solid rgba(204, 187, 135, 0.78);
          border-radius: 999px;
          color: #ccbb87;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .build-hero-copy a:hover {
          background: #ccbb87;
          color: #050505;
          transform: translateY(-2px);
        }

        .build-hero-animation {
          position: relative;
          min-height: clamp(24rem, 58vh, 38rem);
          overflow: hidden;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: clamp(1.4rem, 3vw, 2rem);
          background:
            radial-gradient(circle at 70% 18%, rgba(247, 217, 134, 0.16), transparent 17rem),
            linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.018));
          box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.28);
          isolation: isolate;
        }

        .build-hero-blueprint {
          position: absolute;
          inset: 1rem;
          border: 1px solid rgba(204, 187, 135, 0.12);
          border-radius: 1.25rem;
          background-image:
            linear-gradient(rgba(204, 187, 135, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204, 187, 135, 0.1) 1px, transparent 1px),
            linear-gradient(45deg, transparent 48%, rgba(204, 187, 135, 0.14) 49%, rgba(204, 187, 135, 0.14) 51%, transparent 52%);
          background-size: 1.35rem 1.35rem, 1.35rem 1.35rem, 9rem 9rem;
          opacity: 0.68;
          mask-image: linear-gradient(to bottom, black 20%, transparent 92%);
        }

        .build-hero-crane {
          position: absolute;
          top: 17%;
          left: 14%;
          width: 68%;
          height: 2px;
          background: rgba(204, 187, 135, 0.7);
          transform-origin: left center;
          animation: buildCraneSweep 5.2s ease-in-out infinite;
        }

        .build-hero-crane::before {
          content: '';
          position: absolute;
          left: 0;
          top: -1.6rem;
          width: 2px;
          height: clamp(12rem, 32vh, 20rem);
          background: linear-gradient(to bottom, rgba(204, 187, 135, 0.7), transparent);
        }

        .build-hero-crane span {
          position: absolute;
          right: 16%;
          top: 0;
          width: 2px;
          height: clamp(4rem, 12vh, 7rem);
          background: rgba(247, 217, 134, 0.76);
          animation: buildHookDrop 2.8s ease-in-out infinite;
        }

        .build-hero-crane span::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -0.85rem;
          width: 1.2rem;
          height: 1.2rem;
          border-right: 2px solid rgba(247, 217, 134, 0.86);
          border-bottom: 2px solid rgba(247, 217, 134, 0.86);
          transform: translateX(-50%) rotate(45deg);
        }

        .build-hero-skyline {
          position: absolute;
          left: clamp(1.5rem, 4vw, 3rem);
          right: clamp(1.5rem, 4vw, 3rem);
          bottom: clamp(5.5rem, 14vh, 7.5rem);
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          align-items: end;
          gap: clamp(0.55rem, 1.5vw, 1rem);
          height: 54%;
        }

        .build-hero-skyline span {
          position: relative;
          display: block;
          min-height: 4.5rem;
          height: var(--tower-height);
          border: 1px solid rgba(231, 229, 223, 0.16);
          border-bottom-color: rgba(247, 217, 134, 0.58);
          border-radius: 0.55rem 0.55rem 0.08rem 0.08rem;
          background:
            linear-gradient(180deg, rgba(247, 217, 134, 0.22), rgba(204, 187, 135, 0.08)),
            repeating-linear-gradient(to bottom, rgba(231, 229, 223, 0.16) 0 1px, transparent 1px 0.9rem);
          transform: scaleY(0);
          transform-origin: bottom;
          animation: buildTowerRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, buildTowerPulse 4.8s ease-in-out infinite;
          animation-delay: var(--tower-delay), calc(var(--tower-delay) + 1.1s);
        }

        .build-hero-skyline span::before {
          content: '';
          position: absolute;
          inset: 0.55rem;
          border: 1px dashed rgba(247, 217, 134, 0.22);
        }

        .build-hero-skyline i {
          position: absolute;
          left: 50%;
          bottom: -1.6rem;
          transform: translateX(-50%);
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.48rem, 0.8vw, 0.58rem);
          font-style: normal;
          letter-spacing: 0.12em;
          color: rgba(231, 229, 223, 0.54);
          white-space: nowrap;
        }

        .build-hero-foundation {
          position: absolute;
          left: clamp(1.25rem, 4vw, 2.75rem);
          right: clamp(1.25rem, 4vw, 2.75rem);
          bottom: clamp(4rem, 10vh, 5.8rem);
          height: 0.35rem;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
        }

        .build-hero-foundation::after {
          content: '';
          display: block;
          width: 44%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #ccbb87, #f7d986, #ccbb87);
          animation: buildFoundationScan 2.6s ease-in-out infinite;
        }

        .build-hero-animation-copy {
          position: absolute;
          left: 1.25rem;
          right: 1.25rem;
          bottom: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: 999px;
          background: rgba(5, 5, 5, 0.48);
          backdrop-filter: blur(14px);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: rgba(231, 229, 223, 0.68);
          text-transform: uppercase;
        }

        .build-hero-animation-copy strong {
          font-weight: 400;
          color: #ccbb87;
        }

        .build-studio-section {
          padding: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem);
          background:
            radial-gradient(circle at 18% 8%, rgba(204, 187, 135, 0.1), transparent 26rem),
            linear-gradient(180deg, #050505, rgba(5, 5, 5, 0.92) 45%, #050505);
        }

        .build-studio-shell {
          width: min(100%, 92rem);
          margin: 0 auto;
        }

        .build-studio-heading {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
          align-items: end;
          gap: clamp(1.5rem, 4vw, 4rem);
          margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
        }

        .build-studio-heading span {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.28em;
          color: #ccbb87;
          text-transform: uppercase;
        }

        .build-studio-heading h2 {
          margin: 0;
          font-family: 'Koulen', cursive;
          font-size: clamp(2.6rem, 7vw, 6.4rem);
          line-height: 0.88;
          color: #e7e5df;
        }

        .build-studio-heading p {
          grid-column: 2;
          max-width: 46rem;
          margin: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: clamp(0.88rem, 1.2vw, 1rem);
          line-height: 1.75;
          color: rgba(231, 229, 223, 0.64);
        }

        .build-studio-section .build-three-shell {
          min-height: clamp(36rem, 78vh, 50rem);
        }

        .build-studio-section .build-three-canvas {
          height: clamp(36rem, 78vh, 50rem);
        }

        .build-three-shell {
          position: relative;
          min-height: clamp(30rem, 64vh, 42rem);
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: clamp(1.4rem, 3vw, 2rem);
          overflow: hidden;
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.02)),
            radial-gradient(circle at 50% 20%, rgba(204, 187, 135, 0.12), transparent 26rem);
          box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.32);
        }

        .build-three-canvas {
          display: block;
          width: 100%;
          height: clamp(30rem, 64vh, 42rem);
          cursor: crosshair;
        }

        .build-loading-panel {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 0.9rem;
          padding: 0.75rem 0.9rem;
          border: 1px solid rgba(204, 187, 135, 0.18);
          border-radius: 999px;
          background: rgba(5, 5, 5, 0.48);
          backdrop-filter: blur(14px);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.12em;
          color: rgba(231, 229, 223, 0.76);
          text-transform: uppercase;
        }

        .build-progress-track {
          height: 0.25rem;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
        }

        .build-progress-track i {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #ccbb87, #f7d986);
          transition: width 0.2s ease;
        }

        .build-loading-panel strong {
          font-weight: 400;
          color: #ccbb87;
        }

        .build-view-panel {
          position: absolute;
          top: 4.55rem;
          right: 1rem;
          z-index: 3;
          display: flex;
          gap: 0.4rem;
          padding: 0.35rem;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: 999px;
          background: rgba(5, 5, 5, 0.56);
          backdrop-filter: blur(14px);
        }

        .build-view-panel button,
        .build-block-actions button {
          min-height: 2.35rem;
          padding: 0.65rem 0.8rem;
          border: 1px solid rgba(204, 187, 135, 0.28);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.055);
          color: rgba(231, 229, 223, 0.8);
          font-family: 'Roboto Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .build-view-panel button:hover,
        .build-block-actions button:hover,
        .build-view-panel button.is-active,
        .build-block-actions button.is-active {
          background: #ccbb87;
          color: #050505;
          transform: translateY(-1px);
        }

        .build-block-panel {
          position: absolute;
          left: 1rem;
          right: 1rem;
          bottom: 1rem;
          padding: 1rem;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: 1.2rem;
          background: rgba(5, 5, 5, 0.56);
          backdrop-filter: blur(14px);
        }

        .build-block-panel__eyebrow {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          color: #ccbb87;
          text-transform: uppercase;
        }

        .build-block-panel__hint {
          margin: -0.25rem 0 0.85rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.72rem;
          line-height: 1.5;
          color: rgba(231, 229, 223, 0.58);
        }

        .build-block-panel__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .build-block-panel__count {
          flex-shrink: 0;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.68rem;
          color: rgba(231, 229, 223, 0.62);
          text-transform: uppercase;
        }

        .build-block-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
        }

        .build-block-actions button {
          flex: 1 1 auto;
        }

        .build-inspector-panel,
        .build-plan-panel {
          position: absolute;
          z-index: 3;
          border: 1px solid rgba(231, 229, 223, 0.12);
          border-radius: 1.1rem;
          background: rgba(5, 5, 5, 0.56);
          backdrop-filter: blur(14px);
          box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.22);
        }

        .build-inspector-panel {
          top: 4.55rem;
          left: 1rem;
          width: min(16rem, calc(100% - 2rem));
          padding: 0.9rem;
        }

        .build-plan-panel {
          right: 1rem;
          bottom: 9.5rem;
          width: 13rem;
          padding: 0.75rem;
        }

        .build-panel-label {
          display: block;
          margin-bottom: 0.65rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.22em;
          color: #ccbb87;
          text-transform: uppercase;
        }

        .build-stat-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.45rem;
          margin-bottom: 0.75rem;
        }

        .build-stat-grid span,
        .build-selection-readout {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.6rem;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.62rem;
          line-height: 1.35;
          color: rgba(231, 229, 223, 0.62);
          text-transform: uppercase;
        }

        .build-stat-grid strong,
        .build-selection-readout strong {
          display: block;
          color: #e7e5df;
          font-size: 0.88rem;
          font-weight: 500;
        }

        .build-selection-readout {
          display: grid;
          gap: 0.25rem;
        }

        .build-selection-readout small {
          color: rgba(231, 229, 223, 0.55);
          text-transform: none;
        }

        .build-plan-grid {
          position: relative;
          height: 9rem;
          overflow: hidden;
          border: 1px solid rgba(204, 187, 135, 0.2);
          border-radius: 0.85rem;
          background-image:
            linear-gradient(rgba(204, 187, 135, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204, 187, 135, 0.12) 1px, transparent 1px);
          background-size: 1rem 1rem;
          background-color: rgba(204, 187, 135, 0.04);
          cursor: crosshair;
        }

        .build-plan-block {
          position: absolute;
          border: 1px solid rgba(204, 187, 135, 0.58);
          border-radius: 0.18rem;
          background: rgba(204, 187, 135, 0.22);
          transform: translate(-50%, -50%);
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .build-plan-block.is-window {
          background: rgba(247, 217, 134, 0.58);
        }

        .build-plan-block.is-selected {
          border-color: #f7d986;
          background: rgba(247, 217, 134, 0.42);
          box-shadow: 0 0 0 2px rgba(247, 217, 134, 0.18);
        }

        @keyframes buildTowerRise {
          0% {
            opacity: 0;
            transform: scaleY(0) translateY(1rem);
          }

          100% {
            opacity: 1;
            transform: scaleY(1) translateY(0);
          }
        }

        @keyframes buildTowerPulse {
          0%, 100% {
            filter: brightness(1);
          }

          50% {
            filter: brightness(1.18);
          }
        }

        @keyframes buildCraneSweep {
          0%, 100% {
            transform: rotate(-2deg);
          }

          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes buildHookDrop {
          0%, 100% {
            height: clamp(4rem, 12vh, 7rem);
          }

          50% {
            height: clamp(6rem, 17vh, 10rem);
          }
        }

        @keyframes buildFoundationScan {
          0% {
            transform: translateX(-110%);
          }

          100% {
            transform: translateX(260%);
          }
        }

        @media (max-width: 960px) {
          .build-hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .build-hero-copy {
            align-items: center;
            text-align: center;
          }

          .build-hero-title {
            justify-content: center;
          }

          .build-hero-animation {
            width: min(100%, 42rem);
            margin: 0 auto;
          }

          .build-studio-heading {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .build-studio-heading p {
            grid-column: auto;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .build-hero-content {
            padding-top: 6.5rem;
            padding-bottom: 2rem;
            gap: 1.25rem;
          }

          .build-hero-title span {
            font-size: clamp(3.75rem, 18vw, 5.4rem);
          }

          .build-hero-copy p {
            font-size: 0.86rem;
            line-height: 1.65;
          }

          .build-hero-copy a {
            margin-top: 1.15rem;
          }

          .build-hero-animation {
            min-height: 24rem;
          }

          .build-hero-animation-copy {
            flex-direction: column;
            align-items: flex-start;
            border-radius: 1rem;
            font-size: 0.62rem;
          }

          .build-studio-section {
            padding: 3.5rem 1rem;
          }

          .build-studio-heading {
            margin-bottom: 1.25rem;
          }

          .build-studio-heading span {
            font-size: 0.68rem;
          }

          .build-three-shell {
            min-height: 33rem;
          }

          .build-three-canvas {
            height: 33rem;
          }

          .build-loading-panel {
            grid-template-columns: 1fr auto;
            border-radius: 1rem;
          }

          .build-loading-panel span {
            grid-column: 1 / -1;
          }

          .build-block-panel {
            left: 0.75rem;
            right: 0.75rem;
            bottom: 0.75rem;
            padding: 0.8rem;
          }

          .build-view-panel {
            top: 5.25rem;
            right: 0.75rem;
          }

          .build-inspector-panel {
            top: 5.25rem;
            left: 0.75rem;
            width: min(13.25rem, calc(100% - 1.5rem));
          }

          .build-plan-panel {
            right: 0.75rem;
            bottom: 12.25rem;
            width: 10.5rem;
          }

          .build-plan-grid {
            height: 6.5rem;
          }

          .build-block-panel__header {
            align-items: flex-start;
            gap: 0.5rem;
          }

          .build-block-actions {
            gap: 0.4rem;
          }

          .build-block-actions button {
            min-height: 2.05rem;
            padding: 0.55rem 0.6rem;
            font-size: 0.62rem;
          }

          .build-block-panel__hint {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
