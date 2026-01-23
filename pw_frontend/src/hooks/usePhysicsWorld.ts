import { useEffect, useRef, useState, useCallback } from 'react';
import * as CANNON from 'cannon-es';
import { PhysicsBodyConfig, createPhysicsBody } from '../utils/physics';

export interface PhysicsWorldState {
  world: CANNON.World | null;
  isPaused: boolean;
  bodies: Map<string, CANNON.Body>;
  constraints: Map<string, CANNON.Constraint>;
}

export function usePhysicsWorld(
  gravity: [number, number, number] = [0, -9.82, 0],
  timeStep: number = 1 / 60
) {
  const worldRef = useRef<CANNON.World | null>(null);
  const [world, setWorld] = useState<CANNON.World | null>(null);
  const initialGravityRef = useRef<[number, number, number]>(gravity);
  const bodiesRef = useRef<Map<string, CANNON.Body>>(new Map());
  const constraintsRef = useRef<Map<string, CANNON.Constraint>>(new Map());
  const [isPaused, setIsPaused] = useState(false);
  const timeStepRef = useRef(timeStep);
  const [bodiesVersion, setBodiesVersion] = useState(0);
  const [constraintsVersion, setConstraintsVersion] = useState(0);

  useEffect(() => {
    timeStepRef.current = timeStep;
  }, [timeStep]);

  // Initialize world once
  useEffect(() => {
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(...initialGravityRef.current),
    });

    world.broadphase = new CANNON.NaiveBroadphase();
    world.allowSleep = true;

    worldRef.current = world;
    setWorld(world);
    const bodies = bodiesRef.current;
    const constraints = constraintsRef.current;

    return () => {
      // Cleanup all bodies and constraints
      bodies.forEach((body) => {
        world.removeBody(body);
      });
      constraints.forEach((constraint) => {
        world.removeConstraint(constraint);
      });
      bodies.clear();
      constraints.clear();
      worldRef.current = null;
      setWorld(null);
    };
  }, []);

  // Keep gravity updated without recreating the world
  useEffect(() => {
    if (worldRef.current) {
      worldRef.current.gravity.set(gravity[0], gravity[1], gravity[2]);
    }
  }, [gravity]);

  const addBody = useCallback((id: string, config: PhysicsBodyConfig): CANNON.Body | null => {
    if (!worldRef.current) return null;

    const body = createPhysicsBody(worldRef.current, config);
    bodiesRef.current.set(id, body);
    setBodiesVersion((v) => v + 1);
    return body;
  }, []);

  const removeBody = useCallback((id: string): void => {
    const body = bodiesRef.current.get(id);
    if (body && worldRef.current) {
      worldRef.current.removeBody(body);
      bodiesRef.current.delete(id);
      setBodiesVersion((v) => v + 1);
    }
  }, []);

  const getBody = useCallback((id: string): CANNON.Body | undefined => {
    return bodiesRef.current.get(id);
  }, []);

  const addConstraint = useCallback((id: string, constraint: CANNON.Constraint): void => {
    if (!worldRef.current) return;
    worldRef.current.addConstraint(constraint);
    constraintsRef.current.set(id, constraint);
    setConstraintsVersion((v) => v + 1);
  }, []);

  const removeConstraint = useCallback((id: string): void => {
    const constraint = constraintsRef.current.get(id);
    if (constraint && worldRef.current) {
      worldRef.current.removeConstraint(constraint);
      constraintsRef.current.delete(id);
      setConstraintsVersion((v) => v + 1);
    }
  }, []);

  const setGravity = useCallback((x: number, y: number, z: number): void => {
    if (worldRef.current) {
      worldRef.current.gravity.set(x, y, z);
    }
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const step = useCallback((deltaSeconds: number) => {
    if (!worldRef.current || isPaused) return;
    const dt = Math.min(Math.max(deltaSeconds, 0), 0.05);
    worldRef.current.step(timeStepRef.current, dt, 3);
  }, [isPaused]);

  const reset = useCallback(() => {
    // Remove all bodies and constraints
    bodiesRef.current.forEach((body) => {
      if (worldRef.current) {
        worldRef.current.removeBody(body);
      }
    });
    constraintsRef.current.forEach((constraint) => {
      if (worldRef.current) {
        worldRef.current.removeConstraint(constraint);
      }
    });
    bodiesRef.current.clear();
    constraintsRef.current.clear();
    setBodiesVersion((v) => v + 1);
    setConstraintsVersion((v) => v + 1);
  }, []);

  return {
    world,
    isPaused,
    bodies: bodiesRef.current,
    bodiesCount: bodiesRef.current.size,
    bodiesVersion,
    constraints: constraintsRef.current,
    constraintsCount: constraintsRef.current.size,
    constraintsVersion,
    addBody,
    removeBody,
    getBody,
    addConstraint,
    removeConstraint,
    setGravity,
    pause,
    resume,
    step,
    reset,
  };
}
