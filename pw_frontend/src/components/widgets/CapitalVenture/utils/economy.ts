import { BigNumber, Venture, Upgrade } from '../types/capitalVentureTypes';
import * as BN from './bigNumber';

export const PRESTIGE_SCALE = 1e12;
export const PRESTIGE_MULTIPLIER_PER_POINT = 0.02;
export const MIN_PRESTIGE_TOTAL_EARNED = BN.create(1e15);
export const BASE_CLICK_SPEED = 10;
export const CLICK_SPEED_INCREASE_PER_LEVEL = 5;
export const BASE_CLICK_VALUE = 1;
export const CLICK_VALUE_INCREASE_PER_LEVEL = 1;

export function calculateManagerCost(
  venture: Venture,
  currentManagerLevel: number
): BigNumber {
  if (venture.level === 0) return BN.ZERO;
  
  const currentLevelCost = calculateVentureCost(
    venture.baseCost,
    venture.costGrowth,
    venture.level,
    1
  );
  
  const baseManagerCost = BN.multiply(currentLevelCost, BN.create(10));
  const levelMultiplier = Math.pow(2, currentManagerLevel);
  
  return BN.multiplyScalar(baseManagerCost, levelMultiplier);
}

export function calculateVentureCost(baseCost: BigNumber, costGrowth: number, currentLevel: number, levelsToBuy: number): BigNumber {
  if (levelsToBuy === 0) return BN.ZERO;
  if (levelsToBuy < 0) return BN.ZERO;
  if (currentLevel < 0) return BN.ZERO;
  
  const growthPower = Math.pow(costGrowth, currentLevel);
  if (!isFinite(growthPower)) return BN.ZERO;
  
  const firstCost = BN.multiply(baseCost, BN.create(growthPower));
  
  if (levelsToBuy === 1) return firstCost;
  
  if (costGrowth === 1) {
    return BN.multiplyScalar(firstCost, levelsToBuy);
  }
  
  if (costGrowth <= 0) return BN.ZERO;
  
  const levelsGrowthPower = Math.pow(costGrowth, levelsToBuy);
  if (!isFinite(levelsGrowthPower)) return BN.ZERO;
  
  const growthDiff = costGrowth - 1;
  if (Math.abs(growthDiff) < 1e-10) {
    return BN.multiplyScalar(firstCost, levelsToBuy);
  }
  
  const seriesSum = (levelsGrowthPower - 1) / growthDiff;
  return BN.multiplyScalar(firstCost, seriesSum);
}

export function calculateMaxAffordableLevels(
  capital: BigNumber,
  baseCost: BigNumber,
  costGrowth: number,
  currentLevel: number
): number {
  if (BN.lessThan(capital, baseCost) || currentLevel < 0 || costGrowth <= 0) return 0;
  
  const MAX_LEVELS_PER_PURCHASE = 1000;
  
  if (costGrowth === 1) {
    const singleCost = BN.multiply(baseCost, BN.create(Math.pow(costGrowth, currentLevel)));
    if (BN.greaterThan(singleCost, capital)) return 0;
    const capitalValue = capital.mantissa * Math.pow(10, capital.exponent);
    const costValue = singleCost.mantissa * Math.pow(10, singleCost.exponent);
    if (costValue === 0) return 0;
    return Math.min(Math.max(0, Math.floor(capitalValue / costValue)), MAX_LEVELS_PER_PURCHASE);
  }
  
  let low = 0;
  let high = MAX_LEVELS_PER_PURCHASE;
  let best = 0;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (mid === 0) {
      low = 1;
      continue;
    }
    const cost = calculateVentureCost(baseCost, costGrowth, currentLevel, mid);
    
    if (BN.lessThanOrEqual(cost, capital)) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  return Math.max(0, Math.min(best, MAX_LEVELS_PER_PURCHASE));
}

export function calculateNextMilestoneLevel(
  venture: Venture
): number | null {
  if (!venture.milestoneThresholds || venture.milestoneThresholds.length === 0) {
    return null;
  }
  for (const threshold of venture.milestoneThresholds) {
    if (venture.level < threshold) {
      return threshold;
    }
  }
  return null;
}

export function getCurrentMilestoneProgress(venture: Venture): { current: number; next: number | null } {
  const next = calculateNextMilestoneLevel(venture);
  return {
    current: venture.level,
    next: next
  };
}

export function getActiveMilestoneBoosts(venture: Venture): Array<{ type: 'income' | 'speed' | 'multiplier'; value: number }> {
  if (!venture.milestoneBoosts || venture.milestoneBoosts.length === 0) {
    return [];
  }
  return venture.milestoneBoosts
    .filter(boost => venture.level >= boost.threshold)
    .map(boost => ({ type: boost.type, value: boost.value }));
}

export function calculateVentureIncomePerSec(
  venture: Venture,
  upgrades: Upgrade[],
  prestigeMultiplier: number
): BigNumber {
  if (venture.level === 0) return BN.ZERO;
  
  let income = BN.multiplyScalar(venture.baseIncomePerSec, venture.level);
  
  const milestoneMultiplier = venture.milestoneMultipliers
    .filter(m => venture.level >= m.level)
    .reduce((acc, m) => acc * m.multiplier, 1);
  
  income = BN.multiplyScalar(income, milestoneMultiplier);
  
  if (venture.managerLevel > 0) {
    const managerMultiplier = 1 + (venture.managerLevel * 2);
    income = BN.multiplyScalar(income, managerMultiplier);
  }
  
  const ventureUpgrades = upgrades.filter(
    u => u.unlocked && u.type === 'venture' && u.ventureId === venture.id
  );
  const upgradeMultiplier = ventureUpgrades.reduce((acc, u) => acc * u.multiplier, 1);
  
  income = BN.multiplyScalar(income, upgradeMultiplier);
  
  const globalUpgrades = upgrades.filter(
    u => u.unlocked && u.type === 'global'
  );
  const globalMultiplier = globalUpgrades.reduce((acc, u) => acc * u.multiplier, 1);
  
  income = BN.multiplyScalar(income, globalMultiplier);
  income = BN.multiplyScalar(income, 1 + prestigeMultiplier);
  
  return income;
}

export function calculateTotalIncomePerSec(
  ventures: Venture[],
  upgrades: Upgrade[],
  prestigeMultiplier: number
): BigNumber {
  return ventures
    .filter(v => v.level > 0)
    .reduce((total, venture) => {
      const income = calculateVentureIncomePerSec(venture, upgrades, prestigeMultiplier);
      return BN.add(total, income);
    }, BN.ZERO);
}

export function calculateCapitalPerClick(
  baseClickValue: BigNumber,
  clickValueLevel: number,
  upgrades: Upgrade[],
  prestigeMultiplier: number
): BigNumber {
  let clickValue = BN.add(baseClickValue, BN.create(clickValueLevel * CLICK_VALUE_INCREASE_PER_LEVEL));
  
  const clickValueUpgrades = upgrades.filter(
    u => u.unlocked && u.type === 'clickValue'
  );
  const clickValueMultiplier = clickValueUpgrades.reduce((acc, u) => acc * u.multiplier, 1);
  
  const legacyClickUpgrades = upgrades.filter(
    u => u.unlocked && u.type === 'global' && u.id.startsWith('click_')
  );
  const legacyMultiplier = legacyClickUpgrades.reduce((acc, u) => acc * u.multiplier, 1);
  
  clickValue = BN.multiplyScalar(clickValue, clickValueMultiplier * legacyMultiplier);
  clickValue = BN.multiplyScalar(clickValue, 1 + prestigeMultiplier);
  
  return clickValue;
}

export function calculateClickSpeedWithUpgrades(
  baseSpeed: number,
  upgrades: Upgrade[]
): number {
  const speedUpgrades = upgrades.filter(
    u => u.unlocked && u.type === 'clickSpeed'
  );
  const speedMultiplier = speedUpgrades.reduce((acc, u) => acc * u.multiplier, 1);
  
  return baseSpeed * speedMultiplier;
}

export function calculatePrestigePoints(totalEarned: BigNumber): number {
  if (BN.lessThan(totalEarned, MIN_PRESTIGE_TOTAL_EARNED)) return 0;
  
  const totalValue = totalEarned.mantissa * Math.pow(10, totalEarned.exponent);
  const scaledValue = totalValue / PRESTIGE_SCALE;
  
  if (scaledValue <= 0) return 0;
  
  const sqrtValue = Math.sqrt(scaledValue);
  return Math.max(0, Math.floor(sqrtValue));
}

export function calculatePrestigeMultiplier(prestigePoints: number): number {
  return prestigePoints * PRESTIGE_MULTIPLIER_PER_POINT;
}

export function calculateClickSpeed(currentLevel: number): number {
  return BASE_CLICK_SPEED + (currentLevel * CLICK_SPEED_INCREASE_PER_LEVEL);
}

export function calculateClickSpeedCost(currentLevel: number, totalEarned: BigNumber): BigNumber {
  const baseCost = BN.create(1000);
  const levelMultiplier = Math.pow(1.5, currentLevel);
  const totalValue = totalEarned.mantissa * Math.pow(10, totalEarned.exponent);
  const earnedMultiplier = Math.max(1, Math.log10(Math.max(1, totalValue)));
  
  return BN.multiplyScalar(baseCost, levelMultiplier * earnedMultiplier);
}

export function calculateClickValue(currentLevel: number): BigNumber {
  return BN.create(BASE_CLICK_VALUE + (currentLevel * CLICK_VALUE_INCREASE_PER_LEVEL));
}

export function calculateClickValueCost(currentLevel: number, totalEarned: BigNumber): BigNumber {
  const baseCost = BN.create(500);
  const levelMultiplier = Math.pow(1.8, currentLevel);
  const totalValue = totalEarned.mantissa * Math.pow(10, totalEarned.exponent);
  const earnedMultiplier = Math.max(1, Math.log10(Math.max(1, totalValue)));
  
  return BN.multiplyScalar(baseCost, levelMultiplier * earnedMultiplier);
}

