import { useMemo, useState } from 'react';
import { DroppableDef } from './catalog';
import { IconBox, IconCircle, IconEye, IconInfo, IconPause, IconPlay, IconReset } from './Icons';
import './PhysicsControls.scss';

export interface PhysicsControlsProps {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onClearBin: () => void;
  onGravityChange: (x: number, y: number, z: number) => void;
  showInspector: boolean;
  onToggleInspector: () => void;
  showHelp: boolean;
  onToggleHelp: () => void;

  coins: number;
  catalog: DroppableDef[];
  unlocked: Record<string, boolean>;
  selectedId: string;
  onSelectId: (id: string) => void;
  sizeScale: number;
  onSizeScale: (v: number) => void;
  massScale: number;
  onMassScale: (v: number) => void;
  onDropSelected: () => void;
  onBuy: (id: string) => void;
}

const PhysicsControls = ({
  isPaused,
  onPause,
  onResume,
  onClearBin,
  onGravityChange,
  showInspector,
  onToggleInspector,
  showHelp,
  onToggleHelp,
  coins,
  catalog,
  unlocked,
  selectedId,
  onSelectId,
  sizeScale,
  onSizeScale,
  massScale,
  onMassScale,
  onDropSelected,
  onBuy,
}: PhysicsControlsProps) => {
  const [gravityX, setGravityX] = useState(0);
  const [gravityY, setGravityY] = useState(-9.82);
  const [gravityZ, setGravityZ] = useState(0);
  const [activeTab, setActiveTab] = useState<'drop' | 'shop'>('drop');

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

  const unlockedCatalog = useMemo(
    () => catalog.filter((d) => unlocked[d.id]),
    [catalog, unlocked]
  );

  const selectedDef = useMemo(
    () => catalog.find((d) => d.id === selectedId) ?? unlockedCatalog[0] ?? null,
    [catalog, selectedId, unlockedCatalog]
  );

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
          <button className="physics-controls__button" onClick={onClearBin}>
            <span className="physics-controls__button-icon" aria-hidden="true">
              <IconReset />
            </span>
            <span className="physics-controls__button-label">Clear bin</span>
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
        <div className="physics-controls__tabs">
          <button
            className="physics-controls__tab"
            data-active={activeTab === 'drop'}
            onClick={() => setActiveTab('drop')}
            type="button"
          >
            Drop
          </button>
          <button
            className="physics-controls__tab"
            data-active={activeTab === 'shop'}
            onClick={() => setActiveTab('shop')}
            type="button"
          >
            Shop
          </button>
          <div className="physics-controls__coins">Coins: {coins}</div>
        </div>

        {activeTab === 'drop' && (
          <>
            <h3 className="physics-controls__title">Drop item</h3>

            <div className="physics-controls__row">
              <label className="physics-controls__label" htmlFor="pw-drop-select">Item</label>
              <select
                id="pw-drop-select"
                className="physics-controls__select"
                value={selectedDef?.id ?? ''}
                onChange={(e) => onSelectId(e.target.value)}
              >
                {unlockedCatalog.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="physics-controls__row">
              <label className="physics-controls__label">Size: {sizeScale.toFixed(2)}x</label>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.05"
                value={sizeScale}
                onChange={(e) => onSizeScale(parseFloat(e.target.value))}
                className="physics-controls__slider"
              />
            </div>

            <div className="physics-controls__row">
              <label className="physics-controls__label">Mass: {massScale.toFixed(2)}x</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={massScale}
                onChange={(e) => onMassScale(parseFloat(e.target.value))}
                className="physics-controls__slider"
              />
            </div>

            <button className="physics-controls__button physics-controls__button--primary" onClick={onDropSelected}>
              <span className="physics-controls__button-icon" aria-hidden="true">
                {selectedDef?.shape === 'sphere' ? <IconCircle /> : <IconBox />}
              </span>
              <span className="physics-controls__button-label">Drop</span>
            </button>

            <p className="physics-controls__hint">
              Double-click drops your selected item at the cursor. Drag to reposition. Collisions earn coins.
            </p>
          </>
        )}

        {activeTab === 'shop' && (
          <>
            <h3 className="physics-controls__title">Shop</h3>
            <div className="physics-controls__shop">
              {catalog.map((d) => {
                const isUnlocked = !!unlocked[d.id];
                const canBuy = coins >= d.price;
                return (
                  <div key={d.id} className="physics-controls__shopItem">
                    <div className="physics-controls__shopItemLeft">
                      <div className="physics-controls__shopItemName">{d.name}</div>
                      <div className="physics-controls__shopItemMeta">
                        {d.shape === 'sphere' ? 'Ball' : 'Box'} • {d.material === 'bouncy' ? 'Bouncy' : 'Normal'}
                      </div>
                    </div>
                    <div className="physics-controls__shopItemRight">
                      <div className="physics-controls__shopItemPrice">{d.price}c</div>
                      <button
                        type="button"
                        className="physics-controls__shopBuy"
                        onClick={() => onBuy(d.id)}
                        disabled={isUnlocked || (!canBuy && d.price > 0)}
                      >
                        {isUnlocked ? 'Owned' : d.price === 0 ? 'Free' : 'Buy'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
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
