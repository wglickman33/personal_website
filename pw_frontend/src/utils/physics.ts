import * as CANNON from 'cannon-es';

export type PhysicsShape = 'box' | 'sphere' | 'plane';

export interface PhysicsBodyConfig {
  shape: PhysicsShape;
  mass: number;
  position: [number, number, number];
  size?: [number, number, number]; // For box: [width, height, depth]
  radius?: number; // For sphere
  material?: CANNON.Material;
  color?: number;
}

/**
 * Creates a Cannon.js body with the specified configuration
 */
export function createPhysicsBody(
  world: CANNON.World,
  config: PhysicsBodyConfig
): CANNON.Body {
  let shape: CANNON.Shape;

  switch (config.shape) {
    case 'box':
      if (!config.size) {
        throw new Error('Box shape requires size parameter');
      }
      shape = new CANNON.Box(
        new CANNON.Vec3(config.size[0] / 2, config.size[1] / 2, config.size[2] / 2)
      );
      break;
    case 'sphere':
      if (!config.radius) {
        throw new Error('Sphere shape requires radius parameter');
      }
      shape = new CANNON.Sphere(config.radius);
      break;
    case 'plane':
      shape = new CANNON.Plane();
      break;
    default:
      throw new Error(`Unknown shape: ${config.shape}`);
  }

  const body = new CANNON.Body({
    mass: config.mass,
    shape: shape,
    material: config.material,
  });

  body.position.set(config.position[0], config.position[1], config.position[2]);

  // 2D-first: lock motion to XY plane and allow rotation around Z
  if (config.shape !== 'plane') {
    body.linearFactor.set(1, 1, 0);
    body.angularFactor.set(0, 0, 1);
    body.allowSleep = true;
  }

  world.addBody(body);
  return body;
}

/**
 * Creates a constraint between two bodies
 */
export function createConstraint(
  world: CANNON.World,
  bodyA: CANNON.Body,
  bodyB: CANNON.Body,
  type: 'distance' | 'hinge',
  options?: {
    pivotA?: [number, number, number];
    pivotB?: [number, number, number];
    distance?: number;
  }
): CANNON.Constraint {
  let constraint: CANNON.Constraint;

  switch (type) {
    case 'distance':
      constraint = new CANNON.PointToPointConstraint(
        bodyA,
        options?.pivotA ? new CANNON.Vec3(...options.pivotA) : new CANNON.Vec3(0, 0, 0),
        bodyB,
        options?.pivotB ? new CANNON.Vec3(...options.pivotB) : new CANNON.Vec3(0, 0, 0),
        options?.distance
      );
      break;
    case 'hinge':
      constraint = new CANNON.HingeConstraint(
        bodyA,
        bodyB,
        {
          pivotA: options?.pivotA ? new CANNON.Vec3(...options.pivotA) : new CANNON.Vec3(0, 0, 0),
          pivotB: options?.pivotB ? new CANNON.Vec3(...options.pivotB) : new CANNON.Vec3(0, 0, 0),
          axisA: new CANNON.Vec3(0, 0, 1), // Rotate around Z-axis for 2D
          axisB: new CANNON.Vec3(0, 0, 1),
        }
      );
      break;
    default:
      throw new Error(`Unknown constraint type: ${type}`);
  }

  world.addConstraint(constraint);
  return constraint;
}

/**
 * Applies a force to a body
 */
export function applyForce(
  body: CANNON.Body,
  force: [number, number, number],
  point?: [number, number, number]
): void {
  const forceVec = new CANNON.Vec3(...force);
  if (point) {
    const pointVec = new CANNON.Vec3(...point);
    body.applyForce(forceVec, pointVec);
  } else {
    body.applyForce(forceVec);
  }
}

/**
 * Applies an impulse to a body
 */
export function applyImpulse(
  body: CANNON.Body,
  impulse: [number, number, number],
  point?: [number, number, number]
): void {
  const impulseVec = new CANNON.Vec3(...impulse);
  if (point) {
    const pointVec = new CANNON.Vec3(...point);
    body.applyImpulse(impulseVec, pointVec);
  } else {
    body.applyImpulse(impulseVec);
  }
}

/**
 * Creates default materials
 */
export function createDefaultMaterials(): {
  default: CANNON.Material;
  ground: CANNON.Material;
} {
  const defaultMaterial = new CANNON.Material('default');
  const groundMaterial = new CANNON.Material('ground');

  return {
    default: defaultMaterial,
    ground: groundMaterial,
  };
}
