import { Venture, Upgrade, GameState, BuyMode, UpgradeType, BigNumber } from '../types/capitalVentureTypes';
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
      ],
      milestoneThresholds: [30, 60, 120, 240, 480, 960],
      milestoneBoosts: [
        { threshold: 30, type: 'income', value: 0.5 },
        { threshold: 60, type: 'multiplier', value: 2 },
        { threshold: 120, type: 'income', value: 1 },
        { threshold: 240, type: 'multiplier', value: 3 },
        { threshold: 480, type: 'income', value: 2 },
        { threshold: 960, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [40, 80, 160, 320, 640, 1280],
      milestoneBoosts: [
        { threshold: 40, type: 'income', value: 0.5 },
        { threshold: 80, type: 'multiplier', value: 2 },
        { threshold: 160, type: 'income', value: 1 },
        { threshold: 320, type: 'multiplier', value: 3 },
        { threshold: 640, type: 'income', value: 2 },
        { threshold: 1280, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [50, 100, 200, 400, 800, 1600],
      milestoneBoosts: [
        { threshold: 50, type: 'income', value: 0.5 },
        { threshold: 100, type: 'multiplier', value: 2 },
        { threshold: 200, type: 'income', value: 1 },
        { threshold: 400, type: 'multiplier', value: 3 },
        { threshold: 800, type: 'income', value: 2 },
        { threshold: 1600, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [60, 120, 240, 480, 960, 1920],
      milestoneBoosts: [
        { threshold: 60, type: 'income', value: 0.5 },
        { threshold: 120, type: 'multiplier', value: 2 },
        { threshold: 240, type: 'income', value: 1 },
        { threshold: 480, type: 'multiplier', value: 3 },
        { threshold: 960, type: 'income', value: 2 },
        { threshold: 1920, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [70, 140, 280, 560, 1120, 2240],
      milestoneBoosts: [
        { threshold: 70, type: 'income', value: 0.5 },
        { threshold: 140, type: 'multiplier', value: 2 },
        { threshold: 280, type: 'income', value: 1 },
        { threshold: 560, type: 'multiplier', value: 3 },
        { threshold: 1120, type: 'income', value: 2 },
        { threshold: 2240, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [80, 160, 320, 640, 1280, 2560],
      milestoneBoosts: [
        { threshold: 80, type: 'income', value: 0.5 },
        { threshold: 160, type: 'multiplier', value: 2 },
        { threshold: 320, type: 'income', value: 1 },
        { threshold: 640, type: 'multiplier', value: 3 },
        { threshold: 1280, type: 'income', value: 2 },
        { threshold: 2560, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [90, 180, 360, 720, 1440, 2880],
      milestoneBoosts: [
        { threshold: 90, type: 'income', value: 0.5 },
        { threshold: 180, type: 'multiplier', value: 2 },
        { threshold: 360, type: 'income', value: 1 },
        { threshold: 720, type: 'multiplier', value: 3 },
        { threshold: 1440, type: 'income', value: 2 },
        { threshold: 2880, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [100, 200, 400, 800, 1600, 3200],
      milestoneBoosts: [
        { threshold: 100, type: 'income', value: 0.5 },
        { threshold: 200, type: 'multiplier', value: 2 },
        { threshold: 400, type: 'income', value: 1 },
        { threshold: 800, type: 'multiplier', value: 3 },
        { threshold: 1600, type: 'income', value: 2 },
        { threshold: 3200, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [120, 240, 480, 960, 1920, 3840],
      milestoneBoosts: [
        { threshold: 120, type: 'income', value: 0.5 },
        { threshold: 240, type: 'multiplier', value: 2 },
        { threshold: 480, type: 'income', value: 1 },
        { threshold: 960, type: 'multiplier', value: 3 },
        { threshold: 1920, type: 'income', value: 2 },
        { threshold: 3840, type: 'multiplier', value: 5 }
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
      ],
      milestoneThresholds: [150, 300, 600, 1200, 2400, 4800],
      milestoneBoosts: [
        { threshold: 150, type: 'income', value: 0.5 },
        { threshold: 300, type: 'multiplier', value: 2 },
        { threshold: 600, type: 'income', value: 1 },
        { threshold: 1200, type: 'multiplier', value: 3 },
        { threshold: 2400, type: 'income', value: 2 },
        { threshold: 4800, type: 'multiplier', value: 5 }
      ]
    }
  ];
}

function generateRandomUpgrade(
  baseCost: BigNumber,
  unlockAt: BigNumber,
  upgradeIndex: number,
  ventures: Venture[]
): Upgrade {
  const randomMultiplier = Math.floor(Math.random() * 10) + 1;
  const upgradeTypes: UpgradeType[] = ['global', 'clickValue', 'clickSpeed', 'venture'];
  const type = upgradeTypes[Math.floor(Math.random() * upgradeTypes.length)];
  
  let name = '';
  let description = '';
  let ventureId: string | undefined;
  
  switch (type) {
    case 'global':
      name = `${randomMultiplier}x Global Boost`;
      description = `${randomMultiplier}x all income`;
      break;
    case 'clickValue':
      name = `${randomMultiplier}x Click Power`;
      description = `${randomMultiplier}x click value`;
      break;
    case 'clickSpeed':
      name = `Speed Boost ${randomMultiplier}x`;
      description = `${randomMultiplier}x click speed`;
      break;
    case 'venture': {
      const randomVenture = ventures[Math.floor(Math.random() * ventures.length)];
      ventureId = randomVenture.id;
      name = `${randomMultiplier}x ${randomVenture.name}`;
      description = `${randomMultiplier}x ${randomVenture.name} income`;
      break;
    }
  }
  
  return {
    id: `random_upgrade_${upgradeIndex}`,
    name,
    description,
    cost: baseCost,
    unlocked: false,
    unlockAtTotalEarned: unlockAt,
    type,
    ventureId,
    multiplier: randomMultiplier,
    boostType: 'multiplier'
  };
}

export function createInitialUpgrades(): Upgrade[] {
  const baseUpgrades: Upgrade[] = [
    {
      id: 'click_2x',
      name: 'Double Click',
      description: '2x click value',
      cost: BN.create(100),
      unlocked: false,
      unlockAtTotalEarned: BN.create(100),
      type: 'clickValue',
      multiplier: 2,
      boostType: 'multiplier'
    },
    {
      id: 'click_5x',
      name: 'Mega Click',
      description: '5x click value',
      cost: BN.create(10000),
      unlocked: false,
      unlockAtTotalEarned: BN.create(10000),
      type: 'clickValue',
      multiplier: 5,
      boostType: 'multiplier'
    },
    {
      id: 'global_2x',
      name: 'Global Boost',
      description: '2x all income',
      cost: BN.create(100000),
      unlocked: false,
      unlockAtTotalEarned: BN.create(100000),
      type: 'global',
      multiplier: 2,
      boostType: 'multiplier'
    },
    {
      id: 'global_5x',
      name: 'Global Surge',
      description: '5x all income',
      cost: BN.create(10000000),
      unlocked: false,
      unlockAtTotalEarned: BN.create(10000000),
      type: 'global',
      multiplier: 5,
      boostType: 'multiplier'
    }
  ];
  
  const randomUpgrades: Upgrade[] = [];
  const ventures = createInitialVentures();
  
  for (let i = 0; i < 50; i++) {
    const baseCost = BN.multiplyScalar(BN.create(1000000), Math.pow(2, i));
    const unlockAt = BN.multiplyScalar(BN.create(100000), Math.pow(2, i + 1));
    randomUpgrades.push(generateRandomUpgrade(baseCost, unlockAt, i, ventures));
  }
  
  return [...baseUpgrades, ...randomUpgrades];
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

