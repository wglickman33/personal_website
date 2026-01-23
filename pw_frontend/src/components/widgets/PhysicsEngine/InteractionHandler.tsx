import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export interface InteractionState {
  selectedBody: CANNON.Body | null;
  isDragging: boolean;
  dragPoint: CANNON.Vec3 | null;
}

export interface InteractionHandlerOptions {
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  renderer: THREE.WebGLRenderer | null;
  world: CANNON.World | null;
  onAddAtPoint?: (point: THREE.Vector3) => void;
  onSelectBody?: (body: CANNON.Body | null) => void;
}

/**
 * Handles mouse/touch interactions with physics objects
 */
export function useInteractionHandler(options: InteractionHandlerOptions) {
  const {
    scene,
    camera,
    renderer,
    world,
    onAddAtPoint,
    onSelectBody,
  } = options;

  const [interactionState, setInteractionState] = useState<InteractionState>({
    selectedBody: null,
    isDragging: false,
    dragPoint: null,
  });

  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const planeRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const tmpPointRef = useRef<THREE.Vector3>(new THREE.Vector3());

  const isPointerDownRef = useRef(false);
  const selectedBodyRef = useRef<CANNON.Body | null>(null);
  const mouseBodyRef = useRef<CANNON.Body | null>(null);
  const dragConstraintRef = useRef<CANNON.PointToPointConstraint | null>(null);

  // Ensure a kinematic mouse body exists for constraint-based dragging
  useEffect(() => {
    if (!world) return;

    const mouseBody = new CANNON.Body({
      mass: 0,
      type: CANNON.Body.KINEMATIC,
      shape: new CANNON.Sphere(0.01),
    });
    mouseBody.position.set(0, 0, 0);
    world.addBody(mouseBody);
    mouseBodyRef.current = mouseBody;

    return () => {
      if (dragConstraintRef.current) {
        world.removeConstraint(dragConstraintRef.current);
        dragConstraintRef.current = null;
      }
      world.removeBody(mouseBody);
      mouseBodyRef.current = null;
    };
  }, [world]);

  // Set up event listeners (pointer events) once dependencies are ready
  useEffect(() => {
    if (!renderer || !scene || !camera || !world) return;

    const canvas = renderer.domElement;

    const getNdc = (event: PointerEvent): THREE.Vector2 => {
      const rect = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
    };

    const getPlaneIntersection = (ndc: THREE.Vector2): THREE.Vector3 | null => {
      raycasterRef.current.setFromCamera(ndc, camera);
      const hit = raycasterRef.current.ray.intersectPlane(planeRef.current, tmpPointRef.current);
      return hit ? hit.clone() : null;
    };

    const findBodyFromIntersection = (ndc: THREE.Vector2): CANNON.Body | null => {
      raycasterRef.current.setFromCamera(ndc, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);
      if (!intersects.length) return null;

      let obj: THREE.Object3D | null = intersects[0].object;
      while (obj) {
        const maybeBody = obj.userData?.physicsBody as CANNON.Body | undefined;
        if (maybeBody) return maybeBody;
        obj = obj.parent;
      }
      return null;
    };

    const clearDrag = () => {
      isPointerDownRef.current = false;
      selectedBodyRef.current = null;
      if (dragConstraintRef.current) {
        world.removeConstraint(dragConstraintRef.current);
        dragConstraintRef.current = null;
      }
      setInteractionState((prev) => ({ ...prev, isDragging: false, dragPoint: null }));
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      canvas.setPointerCapture(event.pointerId);

      isPointerDownRef.current = true;
      const ndc = getNdc(event);
      const body = findBodyFromIntersection(ndc);
      const hit = getPlaneIntersection(ndc);

      selectedBodyRef.current = body;
      onSelectBody?.(body);

      if (!body || !hit || !mouseBodyRef.current) {
        setInteractionState({ selectedBody: body, isDragging: false, dragPoint: null });
        return;
      }

      mouseBodyRef.current.position.set(hit.x, hit.y, hit.z);
      mouseBodyRef.current.velocity.set(0, 0, 0);

      const pivotA = body.pointToLocalFrame(new CANNON.Vec3(hit.x, hit.y, hit.z));
      const pivotB = new CANNON.Vec3(0, 0, 0);
      const constraint = new CANNON.PointToPointConstraint(body, pivotA, mouseBodyRef.current, pivotB);
      world.addConstraint(constraint);
      dragConstraintRef.current = constraint;

      setInteractionState({
        selectedBody: body,
        isDragging: true,
        dragPoint: new CANNON.Vec3(hit.x, hit.y, hit.z),
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isPointerDownRef.current || !selectedBodyRef.current || !mouseBodyRef.current) return;
      const ndc = getNdc(event);
      const hit = getPlaneIntersection(ndc);
      if (!hit) return;

      mouseBodyRef.current.position.set(hit.x, hit.y, hit.z);
      mouseBodyRef.current.velocity.set(0, 0, 0);

      setInteractionState((prev) => ({
        ...prev,
        dragPoint: new CANNON.Vec3(hit.x, hit.y, hit.z),
      }));
    };

    const onPointerUp = () => {
      clearDrag();
    };

    const onPointerCancel = () => {
      clearDrag();
    };

    const onDoubleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      const hit = getPlaneIntersection(ndc);
      if (hit) onAddAtPoint?.(hit);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerCancel);
    canvas.addEventListener('dblclick', onDoubleClick);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerCancel);
      canvas.removeEventListener('dblclick', onDoubleClick);
      clearDrag();
    };
  }, [renderer, scene, camera, world, onAddAtPoint, onSelectBody]);

  return {
    interactionState,
    setInteractionState,
  };
}
