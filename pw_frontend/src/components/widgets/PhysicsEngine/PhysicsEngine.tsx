import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { usePhysicsWorld } from '../../../hooks/usePhysicsWorld';
import { PhysicsShape, PhysicsBodyConfig } from '../../../utils/physics';
import { createPhysicsMesh, syncMeshWithBody } from './PhysicsObject';
import { useInteractionHandler } from './InteractionHandler';
import PhysicsControls from './PhysicsControls';
import DebugPanel from './DebugPanel';
import './PhysicsEngine.scss';

const PhysicsEngine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<Map<CANNON.Body, THREE.Mesh>>(new Map());
  const bodyIdCounterRef = useRef(0);
  const groundMeshRef = useRef<THREE.Mesh | null>(null);
  const groundBodyRef = useRef<CANNON.Body | null>(null);
  const didInitWorldRef = useRef(false);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const [showDebug, setShowDebug] = useState(false);

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

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const meshes = meshesRef.current;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Ground mesh (physics body is created once world is ready)
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.3,
      roughness: 0.4,
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -5;
    scene.add(groundMesh);
    groundMeshRef.current = groundMesh;

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
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      meshes.forEach((mesh) => disposeMesh(scene, mesh));
      meshes.clear();
      if (groundMeshRef.current) {
        disposeMesh(scene, groundMeshRef.current);
        groundMeshRef.current = null;
      }
      renderer.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  const seedWorld = useCallback(() => {
    if (!world || !sceneRef.current) return;

    // Ground body aligned with the ground mesh at y=-5
    if (!groundBodyRef.current) {
      const groundBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
      groundBody.position.set(0, -5, 0);
      groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
      world.addBody(groundBody);
      groundBodyRef.current = groundBody;
    }

    const initialObjects = [
      { shape: 'box' as PhysicsShape, position: [0, 5, 0], size: [1, 1, 1] as [number, number, number], color: 0x3b82f6 },
      { shape: 'box' as PhysicsShape, position: [-2, 8, 0], size: [1, 1, 1] as [number, number, number], color: 0xff6b6b },
      { shape: 'sphere' as PhysicsShape, position: [2, 8, 0], radius: 0.5, color: 0x4ecdc4 },
    ];

    initialObjects.forEach((obj) => {
      const bodyId = `body_${bodyIdCounterRef.current++}`;
      const body = addBody(bodyId, {
        shape: obj.shape,
        mass: 1,
        position: obj.position as [number, number, number],
        size: obj.size,
        radius: obj.radius,
        color: obj.color,
      });

      if (body && sceneRef.current) {
        const mesh = createPhysicsMesh(body, obj.shape, obj.size, obj.radius, obj.color);
        sceneRef.current.add(mesh);
        meshesRef.current.set(body, mesh);
      }
    });
  }, [world, addBody]);

  useEffect(() => {
    if (!world || !sceneRef.current) return;
    if (didInitWorldRef.current) return;
    didInitWorldRef.current = true;
    seedWorld();
  }, [world, seedWorld]);

  // Cleanup ground body on unmount (or if world instance changes)
  useEffect(() => {
    return () => {
      if (world && groundBodyRef.current) {
        world.removeBody(groundBodyRef.current);
        groundBodyRef.current = null;
      }
    };
  }, [world]);

  const addBodyAndMesh = useCallback(
    (config: PhysicsBodyConfig) => {
      if (!sceneRef.current) return;
      const bodyId = `body_${bodyIdCounterRef.current++}`;
      const body = addBody(bodyId, config);
      if (!body) return;
      const mesh = createPhysicsMesh(body, config.shape, config.size, config.radius, config.color);
      sceneRef.current.add(mesh);
      meshesRef.current.set(body, mesh);
    },
    [addBody]
  );

  // Add objects on double click (world point is on z=0 plane)
  const handleAddAtPoint = useCallback(
    (point: THREE.Vector3) => {
      const colors = [0x3b82f6, 0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3];
      const color = colors[Math.floor(Math.random() * colors.length)];

      addBodyAndMesh({
        shape: 'box',
        mass: 1,
        position: [point.x, point.y, 0],
        size: [0.5, 0.5, 0.5],
        color,
      });
    },
    [addBodyAndMesh]
  );

  const { interactionState } = useInteractionHandler({
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    world,
    onAddAtPoint: handleAddAtPoint,
  });

  // Handle adding objects from controls
  const handleAddObject = useCallback(
    (shape: PhysicsShape) => {
      const colors = [0x3d7aed, 0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const config: PhysicsBodyConfig = {
        shape,
        mass: 1,
        position: [
          (Math.random() - 0.5) * 4,
          8 + Math.random() * 2,
          0,
        ] as [number, number, number],
        color,
      };

      if (shape === 'box') {
        config.size = [0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5];
      } else if (shape === 'sphere') {
        config.radius = 0.3 + Math.random() * 0.3;
      }

      addBodyAndMesh(config);
    },
    [addBodyAndMesh]
  );

  // Handle reset
  const handleReset = useCallback(() => {
    if (!sceneRef.current) return;

    // Remove all meshes except ground
    meshesRef.current.forEach((mesh) => {
      disposeMesh(sceneRef.current!, mesh);
    });
    meshesRef.current.clear();

    reset();
    seedWorld();
  }, [reset, seedWorld]);

  return (
    <div className="physics-engine">
      <div ref={containerRef} className="physics-engine__canvas" />
      <PhysicsControls
        isPaused={isPaused}
        onPause={pause}
        onResume={resume}
        onReset={handleReset}
        onAddObject={handleAddObject}
        onGravityChange={setGravity}
        showDebug={showDebug}
        onToggleDebug={() => setShowDebug(!showDebug)}
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
