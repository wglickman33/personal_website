import { useState } from 'react';
import { PhysicsShape } from '../../../utils/physics';
import { IconBox, IconCircle, IconEye, IconInfo, IconPause, IconPlay, IconReset } from './Icons';
import './PhysicsControls.scss';

export interface PhysicsControlsProps {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onAddObject: (shape: PhysicsShape) => void;
  onGravityChange: (x: number, y: number, z: number) => void;
  showInspector: boolean;
  onToggleInspector: () => void;
  showHelp: boolean;
  onToggleHelp: () => void;
}

const PhysicsControls = ({
  isPaused,
  onPause,
  onResume,
  onReset,
  onAddObject,
  onGravityChange,
  showInspector,
  onToggleInspector,
  showHelp,
  onToggleHelp,
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
            <span className="physics-controls__button-icon" aria-hidden="true">
              {isPaused ? <IconPlay /> : <IconPause />}
            </span>
            <span className="physics-controls__button-label">
              {isPaused ? 'Resume' : 'Pause'}
            </span>
          </button>
          <button className="physics-controls__button" onClick={onReset}>
            <span className="physics-controls__button-icon" aria-hidden="true">
              <IconReset />
            </span>
            <span className="physics-controls__button-label">Reset</span>
          </button>
          <button
            className="physics-controls__button"
            onClick={onToggleInspector}
            data-active={showInspector}
          >
            <span className="physics-controls__button-icon" aria-hidden="true">
              <IconEye />
            </span>
            <span className="physics-controls__button-label">
              {showInspector ? 'Hide Inspector' : 'Show Inspector'}
            </span>
          </button>
          <button
            className="physics-controls__button"
            onClick={onToggleHelp}
            data-active={showHelp}
          >
            <span className="physics-controls__button-icon" aria-hidden="true">
              <IconInfo />
            </span>
            <span className="physics-controls__button-label">
              {showHelp ? 'Hide Help' : 'Show Help'}
            </span>
          </button>
        </div>
      </div>

      <div className="physics-controls__section">
        <h3 className="physics-controls__title">Spawn</h3>
        <div className="physics-controls__buttons">
          <button
            className="physics-controls__button"
            onClick={() => onAddObject('box')}
          >
            <span className="physics-controls__button-icon" aria-hidden="true">
              <IconBox />
            </span>
            <span className="physics-controls__button-label">Box</span>
          </button>
          <button
            className="physics-controls__button"
            onClick={() => onAddObject('sphere')}
          >
            <span className="physics-controls__button-icon" aria-hidden="true">
              <IconCircle />
            </span>
            <span className="physics-controls__button-label">Sphere</span>
          </button>
        </div>
        <p className="physics-controls__hint">
          Tip: double-click to spawn at your cursor. Drag objects to reposition.
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
