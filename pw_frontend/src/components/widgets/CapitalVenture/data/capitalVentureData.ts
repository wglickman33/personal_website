import { Venture, Upgrade, GameState, BuyMode } from '../types/capitalVentureTypes';
import * as BN from '../utils/bigNumber';

export const INITIAL_BUY_MODE: BuyMode = 'x1';

export function createInitialVentures(): Venture[] {
  return [
    {
      id: 'studio',
      name: 'Creative Studio',
      description: 'Design and branding services',
      level: 0,
      baseCost: BN.create(10),
      costGrowth: 1.15,
      baseIncomePerSec: BN.create(0.1),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.ZERO,
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'product',
      name: 'Productized Service',
      description: 'Scalable service offering',
      level: 0,
      baseCost: BN.create(100),
      costGrowth: 1.18,
      baseIncomePerSec: BN.create(1),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(100),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'newsletter',
      name: 'Newsletter',
      description: 'Weekly content and insights',
      level: 0,
      baseCost: BN.create(1000),
      costGrowth: 1.2,
      baseIncomePerSec: BN.create(10),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(1000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'saas',
      name: 'Micro-SaaS',
      description: 'Subscription software product',
      level: 0,
      baseCost: BN.create(10000),
      costGrowth: 1.22,
      baseIncomePerSec: BN.create(100),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(10000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'templates',
      name: 'Templates & Assets',
      description: 'Digital product marketplace',
      level: 0,
      baseCost: BN.create(100000),
      costGrowth: 1.25,
      baseIncomePerSec: BN.create(1000),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(100000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'consulting',
      name: 'Consulting Retainer',
      description: 'High-value advisory services',
      level: 0,
      baseCost: BN.create(1000000),
      costGrowth: 1.28,
      baseIncomePerSec: BN.create(10000),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(1000000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'courses',
      name: 'Courses & Workshops',
      description: 'Educational content platform',
      level: 0,
      baseCost: BN.create(10000000),
      costGrowth: 1.3,
      baseIncomePerSec: BN.create(100000),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(10000000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'tooling',
      name: 'Tooling & Automation',
      description: 'Developer tools and scripts',
      level: 0,
      baseCost: BN.create(100000000),
      costGrowth: 1.32,
      baseIncomePerSec: BN.create(1000000),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(100000000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'partnerships',
      name: 'Partnerships',
      description: 'Strategic alliances and JVs',
      level: 0,
      baseCost: BN.create(1000000000),
      costGrowth: 1.35,
      baseIncomePerSec: BN.create(10000000),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(1000000000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    },
    {
      id: 'holdings',
      name: 'Holdings & Portfolio',
      description: 'Equity and investments',
      level: 0,
      baseCost: BN.create(10000000000),
      costGrowth: 1.4,
      baseIncomePerSec: BN.create(100000000),
      incomeGrowth: 1.0,
      unlockAtTotalEarned: BN.create(10000000000),
      managerLevel: 0,
      milestoneMultipliers: [
        { level: 25, multiplier: 2 },
        { level: 50, multiplier: 3 },
        { level: 100, multiplier: 5 }
      ]
    }
  ];
}

export function createInitialUpgrades(): Upgrade[] {
  return [
    {
      id: 'click_2x',
      name: 'Double Click',
      description: '2x click value',
      cost: BN.create(100),
      unlocked: false,
      unlockAtTotalEarned: BN.create(100),
      type: 'global',
      multiplier: 2
    },
    {
      id: 'click_5x',
      name: 'Mega Click',
      description: '5x click value',
      cost: BN.create(10000),
      unlocked: false,
      unlockAtTotalEarned: BN.create(10000),
      type: 'global',
      multiplier: 5
    },
    {
      id: 'global_2x',
      name: 'Global Boost',
      description: '2x all income',
      cost: BN.create(100000),
      unlocked: false,
      unlockAtTotalEarned: BN.create(100000),
      type: 'global',
      multiplier: 2
    },
    {
      id: 'global_5x',
      name: 'Global Surge',
      description: '5x all income',
      cost: BN.create(10000000),
      unlocked: false,
      unlockAtTotalEarned: BN.create(10000000),
      type: 'global',
      multiplier: 5
    }
  ];
}

export function createInitialGameState(): GameState {
  return {
    capital: BN.create(0),
    totalEarned: BN.create(0),
    capitalPerClick: BN.create(1),
    prestigePoints: 0,
    ventures: createInitialVentures(),
    upgrades: createInitialUpgrades(),
    buyMode: INITIAL_BUY_MODE,
    autoClickEnabled: false,
    autoClickRate: 10,
    clickSpeedLevel: 0,
    clickValueLevel: 0,
    lastSavedAt: Date.now()
  };
}

