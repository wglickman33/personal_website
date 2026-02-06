import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { usePhysicsWorld } from '../../../hooks/usePhysicsWorld';
import { PhysicsBodyConfig } from '../../../utils/physics';
import { createPhysicsMesh, syncMeshWithBody } from './PhysicsObject';
import { useInteractionHandler } from './InteractionHandler';
import PhysicsControls from './PhysicsControls';
import DebugPanel from './DebugPanel';
import { IconTrophy } from './Icons';
import { DEFAULT_UNLOCKED, DROPPABLES, DroppableDef, DroppableId } from './catalog';
import { usePlaygroundWallet } from '../../../context/usePlaygroundWallet';
import './PhysicsEngine.scss';

type PwBody = CANNON.Body & { pwId: string };
type BodyCollideEvent = {
  body: CANNON.Body;
  contact?: CANNON.ContactEquation;
};

type ArenaBounds = { left: number; right: number; bottom: number; top: number };
type ArenaWallName = 'left' | 'right' | 'floor' | 'ceiling';

const PhysicsEngine = () => {
  const wallet = usePlaygroundWallet();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<Map<CANNON.Body, THREE.Mesh>>(new Map());
  const bodyIdCounterRef = useRef(0);
  const didInitWorldRef = useRef(false);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const [showDebug, setShowDebug] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const coins = wallet.balance;
  const [sessionScore, setSessionScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const comboRef = useRef(1);
  const lastScoreAtRef = useRef<number>(0);
  const recentHitsRef = useRef<Map<string, number>>(new Map());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [unlocked, setUnlocked] = useState<Record<DroppableId, boolean>>(DEFAULT_UNLOCKED);
  const [selectedId, setSelectedId] = useState<DroppableId>('basic_box');
  const [sizeScale, setSizeScale] = useState(1);
  const [massScale, setMassScale] = useState(1);
  const arenaBoundsRef = useRef<ArenaBounds>({ left: -7, right: 7, bottom: -7, top: 7 });
  const arenaBodiesRef = useRef<Record<ArenaWallName, CANNON.Body | undefined>>({
    left: undefined,
    right: undefined,
    floor: undefined,
    ceiling: undefined,
  });
  const arenaWallMeshesRef = useRef<Record<ArenaWallName, THREE.Mesh | undefined>>({
    left: undefined,
    right: undefined,
    floor: undefined,
    ceiling: undefined,
  });
  const arenaWallMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const arenaOutlineRef = useRef<THREE.LineSegments | null>(null);
  const physicsMaterialsRef = useRef<{
    dynamic: CANNON.Material;
    dynamicBouncy: CANNON.Material;
    wall: CANNON.Material;
    contactDynDyn?: CANNON.ContactMaterial;
    contactDynWall?: CANNON.ContactMaterial;
    contactBouncyWall?: CANNON.ContactMaterial;
    contactBouncyBouncy?: CANNON.ContactMaterial;
    contactDynBouncy?: CANNON.ContactMaterial;
  } | null>(null);

  // Initialize physics world
  const {
    world,
    isPaused,
    bodies,
    bodiesVersion,
    addBody,
    setGravity,
    pause,
    resume,
    step,
    reset,
  } = usePhysicsWorld([0, -9.82, 0]);

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const updateArenaRef = useRef<() => void>(() => {});

  const disposeMesh = (scene: THREE.Scene, mesh: THREE.Mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach((mat) => mat.dispose());
    } else {
      mesh.material.dispose();
    }
  };

  // Initialize Three.js scene once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera (orthographic for 2D view)
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.OrthographicCamera(
      -10 * aspect,
      10 * aspect,
      10,
      -10,
      0.1,
      1000
    );
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer (transparent so CSS background shows through)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const meshes = meshesRef.current;
    const wallMeshes = arenaWallMeshesRef.current;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x0f172a, 0.55);
    scene.add(hemi);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.85);
    directionalLight.position.set(10, 14, 12);
    scene.add(directionalLight);

    // Subtle grid so it's not "just a white screen"
    const grid = new THREE.GridHelper(60, 30, 0x94a3b8, 0xcbd5e1);
    grid.position.y = arenaBoundsRef.current.bottom;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.35;
    scene.add(grid);
    gridRef.current = grid;

    // Wall material (meshes are created/updated by updateArena)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.18,
      metalness: 0.1,
      roughness: 0.4,
    });
    arenaWallMaterialRef.current = wallMat;

    // Arena outline (created once, updated on resize)
    const outlineGeom = new THREE.BufferGeometry();
    const outlineMat = new THREE.LineBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.35 });
    const outline = new THREE.LineSegments(outlineGeom, outlineMat);
    outline.position.z = 0;
    scene.add(outline);
    arenaOutlineRef.current = outline;

    lastFrameTimeRef.current = performance.now();

    // Render loop (also steps physics via hook)
    const animate = () => {
      requestAnimationFrame(animate);

      const now = performance.now();
      const dt = (now - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = now;

      stepRef.current(dt);

      // Sync meshes with physics bodies
      meshesRef.current.forEach((mesh, body) => {
        syncMeshWithBody(mesh, body);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const aspect = width / height;

      camera.left = -10 * aspect;
      camera.right = 10 * aspect;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      updateArenaRef.current();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      meshes.forEach((mesh) => disposeMesh(scene, mesh));
      meshes.clear();
      (Object.keys(wallMeshes) as ArenaWallName[]).forEach((k) => {
        const m = wallMeshes[k];
        if (m) disposeMesh(scene, m);
        wallMeshes[k] = undefined;
      });
      if (arenaOutlineRef.current) {
        scene.remove(arenaOutlineRef.current);
        arenaOutlineRef.current.geometry.dispose();
        (arenaOutlineRef.current.material as THREE.Material).dispose();
        arenaOutlineRef.current = null;
      }
      if (gridRef.current) {
        scene.remove(gridRef.current);
        (gridRef.current.material as THREE.Material).dispose();
        gridRef.current.geometry.dispose();
        gridRef.current = null;
      }
      if (arenaWallMaterialRef.current) {
        arenaWallMaterialRef.current.dispose();
        arenaWallMaterialRef.current = null;
      }
      renderer.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  // HUD timer
  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [isPaused]);

  // Persist wallet/unlocks
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('pw_physics_game_v1');
      if (!raw) return;
      const parsed = JSON.parse(raw) as { unlocked?: Record<DroppableId, boolean>; selectedId?: DroppableId };
      if (parsed.unlocked) setUnlocked({ ...DEFAULT_UNLOCKED, ...parsed.unlocked });
      if (parsed.selectedId) setSelectedId(parsed.selectedId);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'pw_physics_game_v1',
        JSON.stringify({ unlocked, selectedId })
      );
    } catch {
      // ignore
    }
  }, [coins, unlocked, selectedId]);

  useEffect(() => {
    comboRef.current = combo;
  }, [combo]);

  const awardPoints = useCallback((points: number) => {
    const now = performance.now();
    const comboWindowMs = 1800;
    const nextCombo = now - lastScoreAtRef.current < comboWindowMs ? Math.min(comboRef.current + 1, 10) : 1;
    comboRef.current = nextCombo;
    setCombo(nextCombo);
    setSessionScore((prev) => prev + points * nextCombo);
    wallet.add(points * nextCombo);
    lastScoreAtRef.current = now;
  }, [wallet]);

  const withPwId = useCallback((body: CANNON.Body, id: string): PwBody => {
    return Object.assign(body, { pwId: id }) as PwBody;
  }, []);

  const attachScoring = useCallback((body: CANNON.Body) => {
    const b = body as PwBody;
    if (!b.pwId) return;

    const onCollide = (e: BodyCollideEvent) => {
      const other = e.body as Partial<PwBody>;
      const contact = e.contact;
      const otherId = other.pwId;
      if (!otherId) return;

      const idA = b.pwId!;
      const idB = otherId;
      const key = idA < idB ? `${idA}|${idB}` : `${idB}|${idA}`;

      const now = performance.now();
      const last = recentHitsRef.current.get(key) ?? 0;
      if (now - last < 220) return;
      recentHitsRef.current.set(key, now);

      const impact = Math.abs(contact?.getImpactVelocityAlongNormal?.() ?? 0);
      if (impact < 1.2) return;

      const points = Math.min(12, Math.max(1, Math.floor(impact)));
      awardPoints(points);
    };

    body.addEventListener('collide', onCollide as unknown as (evt: unknown) => void);
  }, [awardPoints]);

  // Create (and reuse) physics materials/contact materials for bouncy collisions
  useEffect(() => {
    if (!world) return;
    if (physicsMaterialsRef.current) return;

    const dynamic = new CANNON.Material('pw_dynamic');
    const dynamicBouncy = new CANNON.Material('pw_dynamic_bouncy');
    const wall = new CANNON.Material('pw_wall');

    const contactDynWall = new CANNON.ContactMaterial(dynamic, wall, {
      friction: 0.08,
      restitution: 0.92,
    });
    const contactBouncyWall = new CANNON.ContactMaterial(dynamicBouncy, wall, {
      friction: 0.06,
      restitution: 0.97,
    });
    const contactDynDyn = new CANNON.ContactMaterial(dynamic, dynamic, {
      friction: 0.12,
      restitution: 0.72,
    });
    const contactBouncyBouncy = new CANNON.ContactMaterial(dynamicBouncy, dynamicBouncy, {
      friction: 0.08,
      restitution: 0.88,
    });
    const contactDynBouncy = new CANNON.ContactMaterial(dynamic, dynamicBouncy, {
      friction: 0.1,
      restitution: 0.8,
    });

    world.addContactMaterial(contactDynWall);
    world.addContactMaterial(contactBouncyWall);
    world.addContactMaterial(contactDynDyn);
    world.addContactMaterial(contactBouncyBouncy);
    world.addContactMaterial(contactDynBouncy);

    physicsMaterialsRef.current = {
      dynamic,
      dynamicBouncy,
      wall,
      contactDynDyn,
      contactDynWall,
      contactBouncyWall,
      contactBouncyBouncy,
      contactDynBouncy,
    };
  }, [world]);

  const updateArena = useCallback(() => {
    if (!cameraRef.current || !sceneRef.current || !arenaOutlineRef.current) return;

    const camera = cameraRef.current;
    const scene = sceneRef.current;

    const padding = 1.3;
    const leftX = camera.left + padding;
    const rightX = camera.right - padding;
    const bottomY = camera.bottom + padding;
    const topY = camera.top - padding;

    arenaBoundsRef.current = { left: leftX, right: rightX, bottom: bottomY, top: topY };

    // Outline geometry (rectangle)
    const pts = [
      new THREE.Vector3(leftX, bottomY, 0),
      new THREE.Vector3(rightX, bottomY, 0),

      new THREE.Vector3(rightX, bottomY, 0),
      new THREE.Vector3(rightX, topY, 0),

      new THREE.Vector3(rightX, topY, 0),
      new THREE.Vector3(leftX, topY, 0),

      new THREE.Vector3(leftX, topY, 0),
      new THREE.Vector3(leftX, bottomY, 0),
    ];
    arenaOutlineRef.current.geometry.dispose();
    arenaOutlineRef.current.geometry = new THREE.BufferGeometry().setFromPoints(pts);

    // Update visuals
    if (gridRef.current) {
      gridRef.current.position.y = bottomY;
    }

    const wallMat = arenaWallMaterialRef.current;
    const thickness = 0.45;
    const height = topY - bottomY;
    const width = rightX - leftX;
    const depth = 1.0;

    const ensureWallMesh = (name: ArenaWallName) => {
      const existing = arenaWallMeshesRef.current[name];
      if (existing) return existing;
      const geom = new THREE.BoxGeometry(1, 1, 1);
      const mesh = new THREE.Mesh(geom, wallMat ?? new THREE.MeshStandardMaterial({ color: 0x0f172a }));
      mesh.renderOrder = 1;
      scene.add(mesh);
      arenaWallMeshesRef.current[name] = mesh;
      return mesh;
    };

    // Left/right are vertical bars. Floor/ceiling are horizontal bars.
    const leftMesh = ensureWallMesh('left');
    leftMesh.scale.set(thickness, height + thickness * 2, depth);
    leftMesh.position.set(leftX - thickness / 2, (topY + bottomY) / 2, 0);

    const rightMesh = ensureWallMesh('right');
    rightMesh.scale.set(thickness, height + thickness * 2, depth);
    rightMesh.position.set(rightX + thickness / 2, (topY + bottomY) / 2, 0);

    const floorMesh = ensureWallMesh('floor');
    floorMesh.scale.set(width + thickness * 2, thickness, depth);
    floorMesh.position.set((leftX + rightX) / 2, bottomY - thickness / 2, 0);

    const ceilingMesh = ensureWallMesh('ceiling');
    ceilingMesh.scale.set(width + thickness * 2, thickness, depth);
    ceilingMesh.position.set((leftX + rightX) / 2, topY + thickness / 2, 0);

    // Physics bounds (actual box you bounce around in)
    if (!world) return;
    const pm = physicsMaterialsRef.current;
    const wallMaterial = pm?.wall ?? undefined;

    const recreateWallBody = (name: ArenaWallName, halfExtents: CANNON.Vec3, pos: CANNON.Vec3) => {
      const existing = arenaBodiesRef.current[name];
      if (existing) world.removeBody(existing);

      const shape = new CANNON.Box(halfExtents);
      const body = new CANNON.Body({ mass: 0, shape, material: wallMaterial });
      body.position.copy(pos);
      world.addBody(body);
      arenaBodiesRef.current[name] = body;
    };

    recreateWallBody('left', new CANNON.Vec3(thickness / 2, (height + thickness * 2) / 2, depth / 2), new CANNON.Vec3(leftX - thickness / 2, (topY + bottomY) / 2, 0));
    recreateWallBody('right', new CANNON.Vec3(thickness / 2, (height + thickness * 2) / 2, depth / 2), new CANNON.Vec3(rightX + thickness / 2, (topY + bottomY) / 2, 0));
    recreateWallBody('floor', new CANNON.Vec3((width + thickness * 2) / 2, thickness / 2, depth / 2), new CANNON.Vec3((leftX + rightX) / 2, bottomY - thickness / 2, 0));
    recreateWallBody('ceiling', new CANNON.Vec3((width + thickness * 2) / 2, thickness / 2, depth / 2), new CANNON.Vec3((leftX + rightX) / 2, topY + thickness / 2, 0));
  }, [world]);

  useEffect(() => {
    updateArena();
  }, [updateArena]);

  useEffect(() => {
    updateArenaRef.current = updateArena;
  }, [updateArena]);

  const seedWorld = useCallback(() => {
    if (!world || !sceneRef.current) return;

    // Ensure arena exists before spawning
    updateArenaRef.current();
    // Start empty: no initial objects
  }, [world]);

  useEffect(() => {
    if (!world || !sceneRef.current) return;
    if (didInitWorldRef.current) return;
    didInitWorldRef.current = true;
    seedWorld();
  }, [world, seedWorld]);

  const addBodyAndMesh = useCallback(
    (config: PhysicsBodyConfig, initialVelocity?: { vx: number; vy: number; w?: number }) => {
      if (!sceneRef.current) return;
      const bodyId = `body_${bodyIdCounterRef.current++}`;
      const body = addBody(bodyId, config);
      if (!body) return;
      withPwId(body, bodyId);
      const mesh = createPhysicsMesh(body, config.shape, config.size, config.radius, config.color);
      sceneRef.current.add(mesh);
      meshesRef.current.set(body, mesh);
      attachScoring(body);
      body.linearDamping = 0.01;
      body.angularDamping = 0.02;
      if (initialVelocity) {
        body.velocity.set(initialVelocity.vx, initialVelocity.vy, 0);
        body.angularVelocity.set(0, 0, initialVelocity.w ?? 0);
      }
    },
    [addBody, attachScoring, withPwId]
  );

  const getSelectedDef = useCallback((): DroppableDef => {
    return DROPPABLES.find((d) => d.id === selectedId) ?? DROPPABLES[0];
  }, [selectedId]);

  // Add objects on double click (world point is on z=0 plane)
  const handleAddAtPoint = useCallback(
    (point: THREE.Vector3) => {
      const def = getSelectedDef();
      if (!unlocked[def.id]) return;

      const colors = [0x3b82f6, 0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3];
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Keep spawns inside the box
      const { left, right, bottom, top } = arenaBoundsRef.current;
      const margin = 0.9;
      const x = Math.min(right - margin, Math.max(left + margin, point.x));
      const y = Math.min(top - margin, Math.max(bottom + margin, point.y));

      const baseSize = def.defaultSize ?? [0.7, 0.7, 0.7];
      const baseRadius = def.defaultRadius ?? 0.45;
      const s = sizeScale;
      const m = def.defaultMass * massScale;
      const material = def.material === 'bouncy'
        ? physicsMaterialsRef.current?.dynamicBouncy
        : physicsMaterialsRef.current?.dynamic;

      addBodyAndMesh({
        shape: def.shape,
        mass: m,
        position: [x, y, 0],
        size: def.shape === 'box' ? ([baseSize[0] * s, baseSize[1] * s, baseSize[2] * s] as [number, number, number]) : undefined,
        radius: def.shape === 'sphere' ? baseRadius * s : undefined,
        color,
        material,
      }, { vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 3, w: (Math.random() - 0.5) * 8 });
    },
    [addBodyAndMesh, getSelectedDef, sizeScale, massScale, unlocked]
  );

  const { interactionState } = useInteractionHandler({
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    world,
    onAddAtPoint: handleAddAtPoint,
  });

  const dropSelectedFromTop = useCallback(() => {
    const def = getSelectedDef();
    if (!unlocked[def.id]) return;

    const colors = [0x3d7aed, 0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const { left, right, top } = arenaBoundsRef.current;
    const margin = 0.9;

    const baseSize = def.defaultSize ?? [0.7, 0.7, 0.7];
    const baseRadius = def.defaultRadius ?? 0.45;
    const s = sizeScale;
    const m = def.defaultMass * massScale;
    const material = def.material === 'bouncy'
      ? physicsMaterialsRef.current?.dynamicBouncy
      : physicsMaterialsRef.current?.dynamic;

    const config: PhysicsBodyConfig = {
      shape: def.shape,
      mass: m,
      position: [
        (left + margin) + Math.random() * ((right - margin) - (left + margin)),
        top - margin - 0.6,
        0,
      ] as [number, number, number],
      color,
      material,
      size: def.shape === 'box' ? ([baseSize[0] * s, baseSize[1] * s, baseSize[2] * s] as [number, number, number]) : undefined,
      radius: def.shape === 'sphere' ? baseRadius * s : undefined,
    };

    addBodyAndMesh(config, { vx: (Math.random() - 0.5) * 6, vy: -2 - Math.random() * 4, w: (Math.random() - 0.5) * 6 });
  }, [addBodyAndMesh, getSelectedDef, unlocked, sizeScale, massScale]);

  const buy = useCallback((id: string) => {
    const def = DROPPABLES.find((d) => d.id === id);
    if (!def) return;
    if (unlocked[def.id]) return;
    if (def.price > wallet.balance) return;
    const ok = wallet.spend(def.price);
    if (!ok) return;
    setUnlocked((prev) => ({ ...prev, [def.id]: true }));
  }, [wallet, unlocked]);

  // Handle reset
  const handleClearBin = useCallback(() => {
    if (!sceneRef.current) return;

    // Remove all meshes (spawned objects)
    meshesRef.current.forEach((mesh) => {
      disposeMesh(sceneRef.current!, mesh);
    });
    meshesRef.current.clear();

    reset();
    recentHitsRef.current.clear();
    setCombo(1);
    comboRef.current = 1;
    setElapsedSeconds(0);
    setSessionScore(0);
    // Keep coins + unlocks (game progression)
    updateArenaRef.current();
  }, [reset]);

  return (
    <div className="physics-engine">
      <div className="physics-engine__hud">
        <div className="physics-engine__scorebar">
          <span className="physics-engine__scoreIcon" aria-hidden="true">
            <IconTrophy />
          </span>
          <div className="physics-engine__scoreGroup">
            <div className="physics-engine__scoreLabel">Coins</div>
            <div className="physics-engine__scoreValue">{coins.toLocaleString()}</div>
          </div>
          <div className="physics-engine__meta">
            <span>Combo x{combo}</span>
            <span>Session {sessionScore}</span>
            <span>{Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, '0')}</span>
          </div>
        </div>

        {showHelp && (
          <div className="physics-engine__help">
            <div className="physics-engine__helpTitle">How to play</div>
            <ul className="physics-engine__helpList">
              <li>Double-click to spawn a box where your cursor is.</li>
              <li>Click + drag objects to move them (they stay physical).</li>
              <li>Make strong collisions to earn points and build a combo.</li>
              <li>Use gravity sliders to try new “physics puzzles”.</li>
            </ul>
          </div>
        )}
      </div>
      <div ref={containerRef} className="physics-engine__canvas" />
      <PhysicsControls
        isPaused={isPaused}
        onPause={pause}
        onResume={resume}
        onClearBin={handleClearBin}
        onGravityChange={setGravity}
        showInspector={showDebug}
        onToggleInspector={() => setShowDebug(!showDebug)}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
        coins={coins}
        catalog={DROPPABLES}
        unlocked={unlocked}
        selectedId={selectedId}
        onSelectId={(id) => setSelectedId(id as DroppableId)}
        sizeScale={sizeScale}
        onSizeScale={setSizeScale}
        massScale={massScale}
        onMassScale={setMassScale}
        onDropSelected={dropSelectedFromTop}
        onBuy={buy}
      />
      <DebugPanel
        world={world}
        bodies={bodies}
        bodiesVersion={bodiesVersion}
        scene={sceneRef.current!}
        showDebug={showDebug}
        selectedBody={interactionState.selectedBody}
      />
    </div>
  );
};

export default PhysicsEngine;
