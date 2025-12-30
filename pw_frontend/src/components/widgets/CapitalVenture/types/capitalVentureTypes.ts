export type BuyMode = 'x1' | 'x5' | 'x10' | 'x100' | 'Next' | 'Max';

export interface BigNumber {
  mantissa: number;
  exponent: number;
}

export interface Venture {
  id: string;
  name: string;
  description: string;
  level: number;
  baseCost: BigNumber;
  costGrowth: number;
  baseIncomePerSec: BigNumber;
  incomeGrowth: number;
  unlockAtTotalEarned: BigNumber;
  managerLevel: number;
  milestoneMultipliers: Array<{ level: number; multiplier: number }>;
  milestoneThresholds: number[];
  milestoneBoosts: Array<{ threshold: number; type: 'income' | 'speed' | 'multiplier'; value: number }>;
}

export type UpgradeType = 'global' | 'venture' | 'clickValue' | 'clickSpeed';
export type BoostType = 'multiplier' | 'additive';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: BigNumber;
  unlocked: boolean;
  unlockAtTotalEarned?: BigNumber;
  unlockAtVentureLevel?: { ventureId: string; level: number };
  type: UpgradeType;
  ventureId?: string;
  multiplier: number;
  boostType?: BoostType;
}

export interface GameState {
  capital: BigNumber;
  totalEarned: BigNumber;
  capitalPerClick: BigNumber;
  prestigePoints: number;
  ventures: Venture[];
  upgrades: Upgrade[];
  buyMode: BuyMode;
  autoClickEnabled: boolean;
  autoClickRate: number;
  clickSpeedLevel: number;
  clickValueLevel: number;
  lastSavedAt: number;
}

export interface PrestigeConfig {
  enabled: boolean;
  minTotalEarned: BigNumber;
  prestigeScale: number;
  multiplierPerPoint: number;
}

