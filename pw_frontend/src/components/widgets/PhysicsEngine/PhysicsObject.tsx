import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { PhysicsShape } from '../../../utils/physics';

export interface PhysicsObjectProps {
  body: CANNON.Body;
  shape: PhysicsShape;
  size?: [number, number, number];
  radius?: number;
  color?: number;
  wireframe?: boolean;
  opacity?: number;
}

/**
 * Creates and manages a Three.js mesh that syncs with a Cannon.js physics body
 */
export function createPhysicsMesh(
  body: CANNON.Body,
  shape: PhysicsShape,
  size?: [number, number, number],
  radius?: number,
  color: number = 0x3d7aed,
  wireframe: boolean = false,
  opacity: number = 1
): THREE.Mesh {
  let geometry: THREE.BufferGeometry;

  switch (shape) {
    case 'box':
      if (!size) {
        throw new Error('Box shape requires size parameter');
      }
      geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
      break;
    case 'sphere':
      if (!radius) {
        throw new Error('Sphere shape requires radius parameter');
      }
      geometry = new THREE.SphereGeometry(radius, 32, 32);
      break;
    case 'plane':
      geometry = new THREE.PlaneGeometry(100, 100);
      break;
    default:
      throw new Error(`Unknown shape: ${shape}`);
  }

  const material = new THREE.MeshStandardMaterial({
    color,
    wireframe,
    transparent: opacity < 1,
    opacity,
    metalness: 0.3,
    roughness: 0.4,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.physicsBody = body;
  mesh.userData.physicsShape = shape;
  
  // Set initial position and rotation from body
  mesh.position.set(
    body.position.x,
    body.position.y,
    body.position.z
  );
  mesh.quaternion.set(
    body.quaternion.x,
    body.quaternion.y,
    body.quaternion.z,
    body.quaternion.w
  );

  return mesh;
}

/**
 * Syncs a Three.js mesh with a Cannon.js body each frame
 */
export function syncMeshWithBody(mesh: THREE.Mesh, body: CANNON.Body): void {
  mesh.position.set(body.position.x, body.position.y, body.position.z);
  mesh.quaternion.set(
    body.quaternion.x,
    body.quaternion.y,
    body.quaternion.z,
    body.quaternion.w
  );
}

/**
 * Hook to manage a physics object's Three.js representation
 */
export function usePhysicsObject(
  body: CANNON.Body,
  shape: PhysicsShape,
  scene: THREE.Scene,
  size?: [number, number, number],
  radius?: number,
  color: number = 0x3d7aed,
  wireframe: boolean = false,
  opacity: number = 1
): THREE.Mesh | null {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!body || !scene) return;

    const mesh = createPhysicsMesh(body, shape, size, radius, color, wireframe, opacity);
    scene.add(mesh);
    meshRef.current = mesh;

    return () => {
      if (meshRef.current) {
        scene.remove(meshRef.current);
        meshRef.current.geometry.dispose();
        if (Array.isArray(meshRef.current.material)) {
          meshRef.current.material.forEach((mat) => mat.dispose());
        } else {
          meshRef.current.material.dispose();
        }
        meshRef.current = null;
      }
    };
  }, [body, shape, scene, size, radius, color, wireframe, opacity]);

  // Sync position and rotation each frame
  useEffect(() => {
    if (!meshRef.current) return;

    const sync = () => {
      if (meshRef.current && body) {
        syncMeshWithBody(meshRef.current, body);
      }
      requestAnimationFrame(sync);
    };

    const animationId = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(animationId);
  }, [body]);

  return meshRef.current;
}
