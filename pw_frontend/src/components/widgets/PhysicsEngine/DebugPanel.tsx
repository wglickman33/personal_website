import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import './DebugPanel.scss';

export interface DebugPanelProps {
  world: CANNON.World | null;
  bodies: Map<string, CANNON.Body>;
  bodiesVersion: number;
  scene: THREE.Scene;
  showDebug: boolean;
  selectedBody: CANNON.Body | null;
}

const DebugPanel = ({ world, bodies, bodiesVersion, scene, showDebug, selectedBody }: DebugPanelProps) => {
  const debugGroupRef = useRef<THREE.Group | null>(null);
  const velocityLinesRef = useRef<THREE.Line[]>([]);
  const forceLinesRef = useRef<THREE.Line[]>([]);

  useEffect(() => {
    if (!showDebug || !scene) return;

    // Create debug group
    const debugGroup = new THREE.Group();
    debugGroup.name = 'debugGroup';
    scene.add(debugGroup);
    debugGroupRef.current = debugGroup;

    return () => {
      if (debugGroupRef.current) {
        scene.remove(debugGroupRef.current);
        debugGroupRef.current = null;
      }
    };
  }, [showDebug, scene]);

  // Update debug visualization
  useEffect(() => {
    if (!showDebug || !debugGroupRef.current || !world) return;

    const debugGroup = debugGroupRef.current;

    // Clear previous lines
    velocityLinesRef.current.forEach((line) => {
      debugGroup.remove(line);
      line.geometry.dispose();
      if (Array.isArray(line.material)) {
        line.material.forEach((mat) => mat.dispose());
      } else {
        line.material.dispose();
      }
    });
    forceLinesRef.current.forEach((line) => {
      debugGroup.remove(line);
      line.geometry.dispose();
      if (Array.isArray(line.material)) {
        line.material.forEach((mat) => mat.dispose());
      } else {
        line.material.dispose();
      }
    });
    velocityLinesRef.current = [];
    forceLinesRef.current = [];

    // Create debug lines for each body
    bodies.forEach((body) => {
      if (body.type === CANNON.Body.STATIC) return;

      const position = new THREE.Vector3(
        body.position.x,
        body.position.y,
        body.position.z
      );

      // Velocity vector (green)
      if (body.velocity.length() > 0.01) {
        const velocity = new THREE.Vector3(
          body.velocity.x,
          body.velocity.y,
          body.velocity.z
        );
        const velocityEnd = position.clone().add(velocity.clone().multiplyScalar(0.1));

        const velocityGeometry = new THREE.BufferGeometry().setFromPoints([
          position,
          velocityEnd,
        ]);
        const velocityMaterial = new THREE.LineBasicMaterial({
          color: 0x00ff00,
          linewidth: 2,
        });
        const velocityLine = new THREE.Line(velocityGeometry, velocityMaterial);
        debugGroup.add(velocityLine);
        velocityLinesRef.current.push(velocityLine);
      }

      // Angular velocity indicator (blue)
      if (body.angularVelocity.length() > 0.01) {
        const angularVel = new THREE.Vector3(
          body.angularVelocity.x,
          body.angularVelocity.y,
          body.angularVelocity.z
        );
        const angularEnd = position.clone().add(angularVel.clone().multiplyScalar(0.05));

        const angularGeometry = new THREE.BufferGeometry().setFromPoints([
          position,
          angularEnd,
        ]);
        const angularMaterial = new THREE.LineBasicMaterial({
          color: 0x0088ff,
          linewidth: 1,
        });
        const angularLine = new THREE.Line(angularGeometry, angularMaterial);
        debugGroup.add(angularLine);
        velocityLinesRef.current.push(angularLine);
      }
    });

    // Update loop
    const updateDebug = () => {
      if (!showDebug || !debugGroupRef.current) return;

      let velocityIndex = 0;
      bodies.forEach((body) => {
        if (body.type === CANNON.Body.STATIC) return;

        const position = new THREE.Vector3(
          body.position.x,
          body.position.y,
          body.position.z
        );

        // Update velocity lines
        if (body.velocity.length() > 0.01 && velocityIndex < velocityLinesRef.current.length) {
          const velocity = new THREE.Vector3(
            body.velocity.x,
            body.velocity.y,
            body.velocity.z
          );
          const velocityEnd = position.clone().add(velocity.clone().multiplyScalar(0.1));

          const line = velocityLinesRef.current[velocityIndex];
          if (line) {
            line.geometry.setFromPoints([position, velocityEnd]);
            line.geometry.attributes.position.needsUpdate = true;
          }
          velocityIndex++;
        }
      });

      requestAnimationFrame(updateDebug);
    };

    const animationId = requestAnimationFrame(updateDebug);
    return () => cancelAnimationFrame(animationId);
  }, [showDebug, world, bodiesVersion, bodies]);

  if (!showDebug) return null;

  return (
    <div className="debug-panel">
      <div className="debug-panel__info">
        <h4 className="debug-panel__title">Inspector</h4>
        <div className="debug-panel__hint">
          Click an object to inspect it. Velocity shows how fast it’s moving; angular velocity shows how fast it’s spinning.
        </div>
        <div className="debug-panel__legend">
          <div className="debug-panel__legend-item">
            <span className="debug-panel__legend-color" style={{ background: '#00ff00' }}></span>
            <span>Velocity</span>
          </div>
          <div className="debug-panel__legend-item">
            <span className="debug-panel__legend-color" style={{ background: '#0088ff' }}></span>
            <span>Angular Velocity</span>
          </div>
        </div>
        <div className="debug-panel__stats">
          <div className="debug-panel__stat">
            <span className="debug-panel__stat-label">Bodies:</span>
            <span className="debug-panel__stat-value">{bodies.size}</span>
          </div>
          <div className="debug-panel__stat">
            <span className="debug-panel__stat-label">Selected:</span>
            <span className="debug-panel__stat-value">{selectedBody ? 'Yes' : 'No'}</span>
          </div>
          {selectedBody && (
            <>
              <div className="debug-panel__stat">
                <span className="debug-panel__stat-label">Pos:</span>
                <span className="debug-panel__stat-value">
                  {selectedBody.position.x.toFixed(2)},{selectedBody.position.y.toFixed(2)}
                </span>
              </div>
              <div className="debug-panel__stat">
                <span className="debug-panel__stat-label">Vel:</span>
                <span className="debug-panel__stat-value">
                  {selectedBody.velocity.x.toFixed(2)},{selectedBody.velocity.y.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
