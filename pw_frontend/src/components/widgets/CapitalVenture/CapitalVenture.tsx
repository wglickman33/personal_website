import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import useTheme from '../../../hooks/useTheme';
import { GameState, Venture, BuyMode, BigNumber, Upgrade } from './types/capitalVentureTypes';
import { createInitialGameState, generateRandomUpgrade } from './data/capitalVentureData';
import { loadGameState, saveGameState, clearGameState } from './utils/storage';
import { useGameLoop } from './hooks/useGameLoop';
import { useLocalSave } from './hooks/useLocalSave';
import * as BN from './utils/bigNumber';
import * as Economy from './utils/economy';
import ConfirmModal from './ConfirmModal';
import './CapitalVenture.scss';

interface CapitalVentureProps {
  isPreview?: boolean;
}

const CapitalVenture = ({ isPreview = false }: CapitalVentureProps) => {
  const { theme } = useTheme();
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGameState();
    if (saved) {
      if (!saved.ventures || !saved.upgrades || saved.prestigePoints === undefined) {
        return createInitialGameState();
      }
      return saved;
    }
    return createInitialGameState();
  });

  const gameStateRef = useRef<GameState>(gameState);
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const [prestigeModalOpen, setPrestigeModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const { saveNow } = useLocalSave(gameState);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveGameState(gameStateRef.current);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveGameState(gameStateRef.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const prestigeMultiplier = Economy.calculatePrestigeMultiplier(gameState.prestigePoints);
  const totalIncomePerSec = Economy.calculateTotalIncomePerSec(
    gameState.ventures,
    gameState.upgrades,
    prestigeMultiplier
  );
  const capitalPerClick = Economy.calculateCapitalPerClick(
    gameState.capitalPerClick,
    gameState.clickValueLevel || 0,
    gameState.upgrades,
    prestigeMultiplier
  );
  const baseClickSpeed = Economy.calculateClickSpeed(gameState.clickSpeedLevel || 0);
  const currentClickSpeed = Economy.calculateClickSpeedWithUpgrades(baseClickSpeed, gameState.upgrades);
  const clickSpeedCost = Economy.calculateClickSpeedCost(gameState.clickSpeedLevel || 0);
  const clickValueCost = Economy.calculateClickValueCost(gameState.clickValueLevel || 0);
  const baseClickValue = Economy.calculateClickValue(gameState.clickValueLevel || 0);

  useGameLoop(
    useCallback((deltaTime: number) => {
      const state = gameStateRef.current;
      
      const currentPrestigeMultiplier = Economy.calculatePrestigeMultiplier(state.prestigePoints);
      const currentTotalIncomePerSec = Economy.calculateTotalIncomePerSec(
        state.ventures,
        state.upgrades,
        currentPrestigeMultiplier
      );
      
      if (currentTotalIncomePerSec.mantissa === 0) return;

      const income = BN.multiplyScalar(currentTotalIncomePerSec, deltaTime);
      setGameState((prev) => ({
        ...prev,
        capital: BN.add(prev.capital, income),
        totalEarned: BN.add(prev.totalEarned, income)
      }));
    }, []),
    true
  );

  const capitalPerClickRef = useRef(capitalPerClick);
  useEffect(() => {
    capitalPerClickRef.current = capitalPerClick;
  }, [capitalPerClick]);

  useGameLoop(
    useCallback((deltaTime: number) => {
      const state = gameStateRef.current;
      if (state.autoClickEnabled) {
        const baseSpeed = Economy.calculateClickSpeed(state.clickSpeedLevel || 0);
        const currentClickSpeed = Economy.calculateClickSpeedWithUpgrades(baseSpeed, state.upgrades);
        if (currentClickSpeed > 0) {
          const clicksPerSecond = currentClickSpeed;
          const clicksThisFrame = clicksPerSecond * deltaTime;
          const clickValue = capitalPerClickRef.current;
          const autoClickIncome = BN.multiplyScalar(clickValue, clicksThisFrame);
          
          if (autoClickIncome.mantissa > 0) {
            setGameState((prev) => ({
              ...prev,
              capital: BN.add(prev.capital, autoClickIncome),
              totalEarned: BN.add(prev.totalEarned, autoClickIncome)
            }));
          }
        }
      }
    }, []),
    true
  );

  const handleClick = useCallback(() => {
    setGameState((prev) => {
      const clickValue = capitalPerClickRef.current;
      const newCapital = BN.add(prev.capital, clickValue);
      const newTotalEarned = BN.add(prev.totalEarned, clickValue);
      saveNow();
      return {
        ...prev,
        capital: newCapital,
        totalEarned: newTotalEarned
      };
    });
  }, [saveNow]);

  const toggleAutoClick = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      autoClickEnabled: !prev.autoClickEnabled
    }));
  }, []);

  const buyClickSpeed = useCallback(() => {
    setGameState((prev) => {
      const currentLevel = prev.clickSpeedLevel || 0;
      const cost = Economy.calculateClickSpeedCost(currentLevel);
      
      if (BN.greaterThan(cost, prev.capital)) return prev;
      
      saveNow();
      return {
        ...prev,
        capital: BN.subtract(prev.capital, cost),
        clickSpeedLevel: currentLevel + 1
      };
    });
  }, [saveNow]);

  const buyClickValue = useCallback(() => {
    setGameState((prev) => {
      const currentLevel = prev.clickValueLevel || 0;
      const cost = Economy.calculateClickValueCost(currentLevel);
      
      if (BN.greaterThan(cost, prev.capital)) return prev;
      
      saveNow();
      return {
        ...prev,
        capital: BN.subtract(prev.capital, cost),
        clickValueLevel: currentLevel + 1
      };
    });
  }, [saveNow]);

  const calculateLevelsToBuy = useCallback(
    (venture: Venture, buyMode: BuyMode, capital: BigNumber): number => {
      switch (buyMode) {
        case 'x1':
          return 1;
        case 'x5':
          return 5;
        case 'x10':
          return 10;
        case 'x100':
          return 100;
        case 'Next': {
          const nextMilestone = Economy.calculateNextMilestoneLevel(venture);
          if (!nextMilestone) return 0;
          const levelsNeeded = nextMilestone - venture.level;
          return levelsNeeded > 0 ? levelsNeeded : 0;
        }
        case 'Max':
          return Economy.calculateMaxAffordableLevels(
            capital,
            venture.baseCost,
            venture.costGrowth,
            venture.level
          );
        default:
          return 0;
      }
    },
    []
  );

  const buyVentureLevel = useCallback(
    (ventureId: string) => {
      setGameState((prev) => {
        const venture = prev.ventures.find((v) => v.id === ventureId);
        if (!venture || BN.lessThan(prev.totalEarned, venture.unlockAtTotalEarned)) {
          return prev;
        }

        let levelsToBuy = calculateLevelsToBuy(venture, prev.buyMode, prev.capital);
        if (levelsToBuy === 0) return prev;

        const MAX_SAFE_LEVELS = 1000;
        if (levelsToBuy > MAX_SAFE_LEVELS) {
          levelsToBuy = MAX_SAFE_LEVELS;
        }

        const cost = Economy.calculateVentureCost(
          venture.baseCost,
          venture.costGrowth,
          venture.level,
          levelsToBuy
        );

        if (BN.greaterThan(cost, prev.capital)) {
          const affordable = Economy.calculateMaxAffordableLevels(
            prev.capital,
            venture.baseCost,
            venture.costGrowth,
            venture.level
          );
          if (affordable === 0) return prev;

          const actualLevels = Math.min(affordable, MAX_SAFE_LEVELS);
          const affordableCost = Economy.calculateVentureCost(
            venture.baseCost,
            venture.costGrowth,
            venture.level,
            actualLevels
          );

          saveNow();
          return {
            ...prev,
            capital: BN.subtract(prev.capital, affordableCost),
            ventures: prev.ventures.map((v) =>
              v.id === ventureId ? { ...v, level: v.level + actualLevels } : v
            )
          };
        }

        saveNow();
        return {
          ...prev,
          capital: BN.subtract(prev.capital, cost),
          ventures: prev.ventures.map((v) =>
            v.id === ventureId ? { ...v, level: v.level + levelsToBuy } : v
          )
        };
      });
    },
    [calculateLevelsToBuy, saveNow]
  );

  const buyManager = useCallback(
    (ventureId: string) => {
      setGameState((prev) => {
        const venture = prev.ventures.find((v) => v.id === ventureId);
        if (!venture || venture.level === 0) return prev;

        const managerCost = Economy.calculateManagerCost(venture, venture.managerLevel);
        if (BN.greaterThan(managerCost, prev.capital)) return prev;

        saveNow();
        return {
          ...prev,
          capital: BN.subtract(prev.capital, managerCost),
          ventures: prev.ventures.map((v) =>
            v.id === ventureId ? { ...v, managerLevel: v.managerLevel + 1 } : v
          )
        };
      });
    },
    [saveNow]
  );

  const buyUpgrade = useCallback(
    (upgradeId: string) => {
      setGameState((prev) => {
        const upgrade = prev.upgrades.find((u) => u.id === upgradeId);
        if (!upgrade || upgrade.unlocked) return prev;

        if (upgrade.unlockAtTotalEarned && BN.lessThan(prev.totalEarned, upgrade.unlockAtTotalEarned)) {
          return prev;
        }

        if (upgrade.unlockAtVentureLevel) {
          const venture = prev.ventures.find((v) => v.id === upgrade.unlockAtVentureLevel!.ventureId);
          if (!venture || venture.level < upgrade.unlockAtVentureLevel!.level) {
            return prev;
          }
        }

        if (BN.greaterThan(upgrade.cost, prev.capital)) return prev;

        const newUpgrades = prev.upgrades.map((u) =>
          u.id === upgradeId ? { ...u, unlocked: true } : u
        );

        saveNow();
        return {
          ...prev,
          capital: BN.subtract(prev.capital, upgrade.cost),
          upgrades: newUpgrades
        };
      });
    },
    [saveNow]
  );

  const handlePrestige = useCallback(() => {
    const currentState = gameStateRef.current;
    const prestigePoints = Economy.calculatePrestigePoints(currentState.totalEarned);
    if (prestigePoints === 0) return;
    setPrestigeModalOpen(true);
  }, []);

  const confirmPrestige = useCallback(() => {
    const currentState = gameStateRef.current;
    const prestigePoints = Economy.calculatePrestigePoints(currentState.totalEarned);
    const newState = createInitialGameState();
    newState.prestigePoints = currentState.prestigePoints + prestigePoints;
    newState.lastSavedAt = Date.now();

    setGameState(newState);
    saveGameState(newState);
    setPrestigeModalOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    setResetModalOpen(true);
  }, []);

  const confirmReset = useCallback(() => {
    clearGameState();
    setGameState(createInitialGameState());
    setResetModalOpen(false);
  }, []);

  const availableUpgrades = useMemo(
    () =>
      gameState.upgrades.filter((u) => {
        if (u.unlocked) return false;
        if (u.unlockAtTotalEarned && BN.lessThan(gameState.totalEarned, u.unlockAtTotalEarned)) {
          return false;
        }
        if (u.unlockAtVentureLevel) {
          const venture = gameState.ventures.find((v) => v.id === u.unlockAtVentureLevel!.ventureId);
          if (!venture || venture.level < u.unlockAtVentureLevel!.level) {
            return false;
          }
        }
        return true;
      }),
    [gameState.upgrades, gameState.totalEarned, gameState.ventures]
  );

  const generatingUpgradesRef = useRef(false);
  
  useEffect(() => {
    if (availableUpgrades.length < 3 && gameState.upgrades.length < 100 && !generatingUpgradesRef.current) {
      generatingUpgradesRef.current = true;
      const totalValue = gameState.totalEarned.mantissa * Math.pow(10, gameState.totalEarned.exponent);
      const currentUpgradeCount = gameState.upgrades.length;
      const neededUpgrades = 3 - availableUpgrades.length;
      
      const newUpgrades: Upgrade[] = [];
      for (let i = 0; i < neededUpgrades; i++) {
        const baseCost = BN.multiplyScalar(BN.create(10000000), Math.pow(3, currentUpgradeCount + i));
        const unlockAt = BN.multiplyScalar(BN.create(Math.max(1, totalValue * 2)), Math.pow(2, i));
        const upgrade = generateRandomUpgrade(baseCost, unlockAt, currentUpgradeCount + i, gameState.ventures);
        newUpgrades.push(upgrade);
      }
      
      if (newUpgrades.length > 0) {
        setGameState((prev) => ({
          ...prev,
          upgrades: [...prev.upgrades, ...newUpgrades]
        }));
      }
      generatingUpgradesRef.current = false;
    }
  }, [availableUpgrades.length, gameState.upgrades.length, gameState.totalEarned, gameState.ventures]);

  const ventureCalculations = useMemo(() => {
    return gameState.ventures.map((venture) => {
      const isUnlocked = BN.greaterThanOrEqual(
        gameState.totalEarned,
        venture.unlockAtTotalEarned
      );
      const incomePerSec = isUnlocked && venture.level > 0
        ? Economy.calculateVentureIncomePerSec(
            venture,
            gameState.upgrades,
            prestigeMultiplier
          )
        : BN.ZERO;
      const levelsToBuy = isUnlocked
        ? calculateLevelsToBuy(venture, gameState.buyMode, gameState.capital)
        : 0;
      const cost = levelsToBuy > 0
        ? Economy.calculateVentureCost(
            venture.baseCost,
            venture.costGrowth,
            venture.level,
            levelsToBuy
          )
        : BN.ZERO;
      const canAfford = BN.lessThanOrEqual(cost, gameState.capital);
      const managerCost = venture.level > 0
        ? Economy.calculateManagerCost(venture, venture.managerLevel || 0)
        : BN.ZERO;

      const milestoneProgress = Economy.getCurrentMilestoneProgress(venture);
      const activeBoosts = Economy.getActiveMilestoneBoosts(venture);

      return {
        venture,
        isUnlocked,
        incomePerSec,
        levelsToBuy,
        cost,
        canAfford,
        managerCost,
        milestoneProgress,
        activeBoosts
      };
    });
  }, [
    gameState.ventures,
    gameState.totalEarned,
    gameState.upgrades,
    gameState.buyMode,
    gameState.capital,
    prestigeMultiplier,
    calculateLevelsToBuy
  ]);

  const canPrestige = useMemo(
    () => Economy.calculatePrestigePoints(gameState.totalEarned) > 0,
    [gameState.totalEarned]
  );

  if (isPreview) {
    return (
      <div className={`capital-venture capital-venture--${theme} capital-venture--preview`}>
        <div className="capital-venture__preview-content">
          <div className="capital-venture__preview-icon">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <div className="capital-venture__preview-title">Capital Venture</div>
          <div className="capital-venture__preview-stats">
            <div className="capital-venture__preview-stat">
              <span className="capital-venture__preview-stat-label">Capital</span>
              <span className="capital-venture__preview-stat-value">{BN.formatCompact(gameState.capital)}</span>
            </div>
            <div className="capital-venture__preview-stat">
              <span className="capital-venture__preview-stat-label">Income/sec</span>
              <span className="capital-venture__preview-stat-value">{BN.formatCompact(totalIncomePerSec)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`capital-venture capital-venture--${theme}`}>
      <div className="capital-venture__top-bar">
        <div className="capital-venture__stats-compact">
          <div className="capital-venture__stat-compact">
            <span className="capital-venture__stat-compact-label">Capital</span>
            <span className="capital-venture__stat-compact-value">{BN.formatCompact(gameState.capital)}</span>
          </div>
          <div className="capital-venture__stat-compact">
            <span className="capital-venture__stat-compact-label">/sec</span>
            <span className="capital-venture__stat-compact-value">{BN.formatCompact(totalIncomePerSec)}</span>
          </div>
          <div className="capital-venture__stat-compact">
            <span className="capital-venture__stat-compact-label">/click</span>
            <span className="capital-venture__stat-compact-value">{BN.formatCompact(capitalPerClick)}</span>
          </div>
          {gameState.prestigePoints > 0 && (
            <div className="capital-venture__stat-compact capital-venture__stat-compact--prestige">
              <span className="capital-venture__stat-compact-label">Prestige</span>
              <span className="capital-venture__stat-compact-value">
                {(prestigeMultiplier * 100).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className="capital-venture__top-bar-actions">
          <button
            className={`capital-venture__autoclick-toggle ${gameState.autoClickEnabled ? 'capital-venture__autoclick-toggle--active' : ''}`}
            onClick={toggleAutoClick}
            type="button"
            title={gameState.autoClickEnabled ? 'Disable Auto-Click' : 'Enable Auto-Click'}
          >
            <span className="material-symbols-outlined">
              {gameState.autoClickEnabled ? 'auto_awesome' : 'touch_app'}
            </span>
            <span className="capital-venture__autoclick-label">
              {gameState.autoClickEnabled ? `${currentClickSpeed}/s` : 'Auto'}
            </span>
          </button>
          <button
            className="capital-venture__click-btn"
            onClick={handleClick}
            type="button"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="capital-venture__click-btn-value">
              +{BN.formatCompact(capitalPerClick)}
            </span>
          </button>
        </div>
      </div>

      <div className="capital-venture__click-speed-upgrade">
        <div className="capital-venture__click-speed-info">
          <div className="capital-venture__click-speed-label">
            <span className="material-symbols-outlined">speed</span>
            Click Speed: <strong>{currentClickSpeed}/s</strong>
            {gameState.clickSpeedLevel > 0 && (
              <span className="capital-venture__click-speed-level"> (Lv.{gameState.clickSpeedLevel})</span>
            )}
          </div>
        </div>
        <button
          className={`capital-venture__click-speed-btn ${
            BN.greaterThan(clickSpeedCost, gameState.capital) ? 'capital-venture__click-speed-btn--disabled' : ''
          }`}
          onClick={buyClickSpeed}
          disabled={BN.greaterThan(clickSpeedCost, gameState.capital)}
          type="button"
        >
          <span className="material-symbols-outlined">trending_up</span>
          <span className="capital-venture__click-speed-btn-text">Upgrade Speed</span>
          <span className="capital-venture__click-speed-btn-cost">
            {BN.formatCompact(clickSpeedCost)}
          </span>
        </button>
      </div>

      <div className="capital-venture__click-value-upgrade">
        <div className="capital-venture__click-value-info">
          <div className="capital-venture__click-value-label">
            <span className="material-symbols-outlined">attach_money</span>
            Click Value: <strong>{BN.formatCompact(baseClickValue)}</strong>
            {gameState.clickValueLevel > 0 && (
              <span className="capital-venture__click-value-level"> (Lv.{gameState.clickValueLevel})</span>
            )}
          </div>
        </div>
        <button
          className={`capital-venture__click-value-btn ${
            BN.greaterThan(clickValueCost, gameState.capital) ? 'capital-venture__click-value-btn--disabled' : ''
          }`}
          onClick={buyClickValue}
          disabled={BN.greaterThan(clickValueCost, gameState.capital)}
          type="button"
        >
          <span className="material-symbols-outlined">trending_up</span>
          <span className="capital-venture__click-value-btn-text">Upgrade Value</span>
          <span className="capital-venture__click-value-btn-cost">
            {BN.formatCompact(clickValueCost)}
          </span>
        </button>
      </div>

      <div className="capital-venture__buy-mode-bar">
        {(['x1', 'x5', 'x10', 'x100', 'Next', 'Max'] as BuyMode[]).map((mode) => (
          <button
            key={mode}
            className={`capital-venture__buy-mode-btn ${
              gameState.buyMode === mode ? 'capital-venture__buy-mode-btn--active' : ''
            }`}
            onClick={() => setGameState((prev) => ({ ...prev, buyMode: mode }))}
            type="button"
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="capital-venture__ventures">
        {ventureCalculations.map((calc) => {
          const { venture, isUnlocked, incomePerSec, levelsToBuy, cost, canAfford, managerCost, milestoneProgress, activeBoosts } = calc;

          return (
            <div
              key={venture.id}
              className={`capital-venture__venture-card ${
                !isUnlocked ? 'capital-venture__venture-card--locked' : ''
              } ${canAfford && isUnlocked ? 'capital-venture__venture-card--affordable' : ''}`}
            >
              <div className="capital-venture__venture-card-content">
                <div className="capital-venture__venture-card-header">
                  <div className="capital-venture__venture-card-title">
                    <span className="capital-venture__venture-card-name">{venture.name}</span>
                    {(venture.managerLevel || 0) > 0 && (
                      <span className="capital-venture__venture-manager-badge">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        {1 + ((venture.managerLevel || 0) * 2)}x Lv.{venture.managerLevel || 0}
                      </span>
                    )}
                  </div>
                  <div className="capital-venture__venture-card-level">
                    Lv. <strong>{venture.level}</strong>
                  </div>
                </div>
                <div className="capital-venture__venture-card-info">
                  {venture.level > 0 && (
                    <div className="capital-venture__venture-card-income">
                      <span className="material-symbols-outlined">trending_up</span>
                      {BN.formatCompact(incomePerSec)}/sec
                    </div>
                  )}
                  {milestoneProgress && milestoneProgress.next !== null && (
                    <div className="capital-venture__venture-milestone-progress">
                      <span className="material-symbols-outlined">flag</span>
                      <span className="capital-venture__venture-milestone-text">
                        {milestoneProgress.current}/{milestoneProgress.next}
                      </span>
                    </div>
                  )}
                  {activeBoosts && activeBoosts.length > 0 && (
                    <div className="capital-venture__venture-active-boosts">
                      {activeBoosts.map((boost, idx) => (
                        <div key={idx} className="capital-venture__venture-boost-badge">
                          <span className="material-symbols-outlined">
                            {boost.type === 'income' ? 'trending_up' : boost.type === 'multiplier' ? 'auto_awesome' : 'speed'}
                          </span>
                          <span className="capital-venture__venture-boost-text">
                            {boost.type === 'income' ? `+${boost.value}x` : boost.type === 'multiplier' ? `${boost.value}x` : `${boost.value}x`}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="capital-venture__venture-card-actions">
                {!isUnlocked ? (
                  <div className="capital-venture__venture-locked">
                    <div className="capital-venture__venture-locked-label">
                      <span className="material-symbols-outlined">lock</span>
                      Unlocks at
                    </div>
                    <div className="capital-venture__venture-locked-amount">
                      {BN.formatCompact(venture.unlockAtTotalEarned)}
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      className={`capital-venture__venture-buy-btn ${
                        !canAfford || levelsToBuy === 0 ? 'capital-venture__venture-buy-btn--disabled' : ''
                      }`}
                      onClick={() => buyVentureLevel(venture.id)}
                      disabled={!canAfford || levelsToBuy === 0}
                      type="button"
                    >
                      <span className="material-symbols-outlined">shopping_cart</span>
                      <span className="capital-venture__venture-buy-text">
                        {gameState.buyMode === 'Next' && levelsToBuy === 0
                          ? 'Max'
                          : levelsToBuy > 0 ? `+${levelsToBuy}` : 'Max'}
                      </span>
                      <span className="capital-venture__venture-buy-cost">
                        {levelsToBuy > 0 ? BN.formatCompact(cost) : '—'}
                      </span>
                    </button>

                    {venture.level > 0 && (
                      <button
                        className={`capital-venture__venture-manager-btn ${
                          BN.greaterThan(managerCost, gameState.capital)
                            ? 'capital-venture__venture-manager-btn--disabled'
                            : ''
                        }`}
                        onClick={() => buyManager(venture.id)}
                        disabled={BN.greaterThan(managerCost, gameState.capital)}
                        type="button"
                      >
                        <span className="material-symbols-outlined">person</span>
                        <span className="capital-venture__venture-manager-text">
                          Manager {venture.managerLevel ? `Lv.${venture.managerLevel + 1}` : ''}
                        </span>
                        <span className="capital-venture__venture-manager-cost">
                          {BN.formatCompact(managerCost)}
                        </span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="capital-venture__upgrades">
        <div className="capital-venture__upgrades-grid">
          {Array.from({ length: 3 }, (_, index) => {
            const upgrade = availableUpgrades[index];
            if (!upgrade) {
              return (
                <div key={`placeholder-${index}`} className="capital-venture__upgrade-card capital-venture__upgrade-card--locked">
                  <div className="capital-venture__upgrade-card-content">
                    <div className="capital-venture__upgrade-card-name">Locked</div>
                    <div className="capital-venture__upgrade-card-desc">More upgrades unlock as you progress</div>
                  </div>
                  <div className="capital-venture__upgrade-buy-btn capital-venture__upgrade-buy-btn--disabled">
                    <span className="material-symbols-outlined">lock</span>
                    <span className="capital-venture__upgrade-cost">—</span>
                  </div>
                </div>
              );
            }
            const canAfford = BN.lessThanOrEqual(upgrade.cost, gameState.capital);
            return (
              <div key={upgrade.id} className={`capital-venture__upgrade-card ${canAfford ? 'capital-venture__upgrade-card--affordable' : ''}`}>
                <div className="capital-venture__upgrade-card-content">
                  <div className="capital-venture__upgrade-card-name">{upgrade.name}</div>
                  <div className="capital-venture__upgrade-card-desc">{upgrade.description}</div>
                </div>
                <button
                  className={`capital-venture__upgrade-buy-btn ${
                    !canAfford ? 'capital-venture__upgrade-buy-btn--disabled' : ''
                  }`}
                  onClick={() => buyUpgrade(upgrade.id)}
                  disabled={!canAfford}
                  type="button"
                >
                  <span className="material-symbols-outlined">flash_on</span>
                  <span className="capital-venture__upgrade-cost">
                    {BN.formatCompact(upgrade.cost)}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {canPrestige && (
        <div className="capital-venture__prestige">
          <h3 className="capital-venture__section-title">Prestige</h3>
          <div className="capital-venture__prestige-info">
            <div className="capital-venture__prestige-text">
              Prestige Points Available:{' '}
              <strong>{Economy.calculatePrestigePoints(gameState.totalEarned)}</strong>
            </div>
            <div className="capital-venture__prestige-multiplier">
              Permanent Multiplier:{' '}
              <strong>
                +
                {(
                  Economy.calculatePrestigePoints(gameState.totalEarned) *
                  Economy.PRESTIGE_MULTIPLIER_PER_POINT *
                  100
                ).toFixed(1)}
                %
              </strong>
            </div>
            <button
              className="capital-venture__prestige-btn"
              onClick={handlePrestige}
              type="button"
            >
              Prestige (Reset & Reinvest)
            </button>
          </div>
        </div>
      )}

      <div className="capital-venture__footer">
        <button
          className="capital-venture__reset-btn"
          onClick={handleReset}
          type="button"
        >
          Reset Save
        </button>
      </div>

      {canPrestige && (
        <ConfirmModal
          isOpen={prestigeModalOpen}
          title="Prestige"
          message={`Prestige will reset your progress and grant ${Economy.calculatePrestigePoints(gameState.totalEarned)} prestige points.\n\nThis will give you a ${(Economy.calculatePrestigePoints(gameState.totalEarned) * Economy.PRESTIGE_MULTIPLIER_PER_POINT * 100).toFixed(1)}% permanent multiplier.\n\nContinue?`}
          confirmText="Prestige"
          cancelText="Cancel"
          onConfirm={confirmPrestige}
          onCancel={() => setPrestigeModalOpen(false)}
        />
      )}

      <ConfirmModal
        isOpen={resetModalOpen}
        title="Reset Save"
        message="Are you sure you want to reset your save? This cannot be undone."
        confirmText="Reset"
        cancelText="Cancel"
        onConfirm={confirmReset}
        onCancel={() => setResetModalOpen(false)}
      />
    </div>
  );
};

export default CapitalVenture;

