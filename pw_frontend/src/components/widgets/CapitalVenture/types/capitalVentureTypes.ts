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
  challenges?: Challenge[];
  challengeProgress?: {
    refreshCount: number;
    longestSession: number;
    sessionStartTime: number;
    autoClickerTime: number;
    lastAutoClickerState: boolean;
    autoClickerStartTime?: number;
  };
}

export interface PrestigeConfig {
  enabled: boolean;
  minTotalEarned: BigNumber;
  prestigeScale: number;
  multiplierPerPoint: number;
}

export type ChallengeType = 'scaling' | 'saving' | 'progress';

export interface Challenge {
  id: string;
  name: string;
  description: string;
  type: ChallengeType;
  completed: boolean;
  completedAt?: number;
  progress: number;
  target: number;
  reward?: string;
}

export interface ChallengeProgress {
  challenges: Challenge[];
  totalCompleted: number;
  lastSaveVerified: number;
  refreshCount: number;
  longestSession: number;
  sessionStartTime: number;
}

