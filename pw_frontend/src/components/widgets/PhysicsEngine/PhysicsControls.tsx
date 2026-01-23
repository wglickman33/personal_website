import { useState } from 'react';
import { PhysicsShape } from '../../../utils/physics';
import './PhysicsControls.scss';

export interface PhysicsControlsProps {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onAddObject: (shape: PhysicsShape) => void;
  onGravityChange: (x: number, y: number, z: number) => void;
  showDebug: boolean;
  onToggleDebug: () => void;
}

const PhysicsControls = ({
  isPaused,
  onPause,
  onResume,
  onReset,
  onAddObject,
  onGravityChange,
  showDebug,
  onToggleDebug,
}: PhysicsControlsProps) => {
  const [gravityX, setGravityX] = useState(0);
  const [gravityY, setGravityY] = useState(-9.82);
  const [gravityZ, setGravityZ] = useState(0);

  const handleGravityChange = (axis: 'x' | 'y' | 'z', value: number) => {
    if (axis === 'x') {
      setGravityX(value);
      onGravityChange(value, gravityY, gravityZ);
    } else if (axis === 'y') {
      setGravityY(value);
      onGravityChange(gravityX, value, gravityZ);
    } else {
      setGravityZ(value);
      onGravityChange(gravityX, gravityY, value);
    }
  };

  return (
    <div className="physics-controls">
      <div className="physics-controls__section">
        <h3 className="physics-controls__title">Simulation</h3>
        <div className="physics-controls__buttons">
          <button
            className="physics-controls__button"
            onClick={isPaused ? onResume : onPause}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button className="physics-controls__button" onClick={onReset}>
            🔄 Reset
          </button>
          <button
            className="physics-controls__button"
            onClick={onToggleDebug}
            data-active={showDebug}
          >
            {showDebug ? '🔍 Hide Debug' : '🔍 Show Debug'}
          </button>
        </div>
      </div>

      <div className="physics-controls__section">
        <h3 className="physics-controls__title">Add Objects</h3>
        <div className="physics-controls__buttons">
          <button
            className="physics-controls__button"
            onClick={() => onAddObject('box')}
          >
            📦 Box
          </button>
          <button
            className="physics-controls__button"
            onClick={() => onAddObject('sphere')}
          >
            ⚪ Sphere
          </button>
        </div>
        <p className="physics-controls__hint">
          Double-click on canvas to add objects
        </p>
      </div>

      <div className="physics-controls__section">
        <h3 className="physics-controls__title">Gravity</h3>
        <div className="physics-controls__sliders">
          <div className="physics-controls__slider-group">
            <label className="physics-controls__label">X: {gravityX.toFixed(2)}</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={gravityX}
              onChange={(e) => handleGravityChange('x', parseFloat(e.target.value))}
              className="physics-controls__slider"
            />
          </div>
          <div className="physics-controls__slider-group">
            <label className="physics-controls__label">Y: {gravityY.toFixed(2)}</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={gravityY}
              onChange={(e) => handleGravityChange('y', parseFloat(e.target.value))}
              className="physics-controls__slider"
            />
          </div>
          <div className="physics-controls__slider-group">
            <label className="physics-controls__label">Z: {gravityZ.toFixed(2)}</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={gravityZ}
              onChange={(e) => handleGravityChange('z', parseFloat(e.target.value))}
              className="physics-controls__slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsControls;
