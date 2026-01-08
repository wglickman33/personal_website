import { Challenge, BigNumber, Venture } from '../types/capitalVentureTypes';

export function createInitialChallenges(): Challenge[] {
  return [
    {
      id: 'first_million',
      name: 'First Million',
      description: 'Reach 1 million capital',
      type: 'scaling',
      completed: false,
      progress: 0,
      target: 1000000,
      reward: 'Unlock faster scaling'
    },
    {
      id: 'first_billion',
      name: 'First Billion',
      description: 'Reach 1 billion capital',
      type: 'scaling',
      completed: false,
      progress: 0,
      target: 1000000000,
      reward: 'Unlock advanced scaling'
    },
    {
      id: 'first_trillion',
      name: 'First Trillion',
      description: 'Reach 1 trillion capital',
      type: 'scaling',
      completed: false,
      progress: 0,
      target: 1000000000000,
      reward: 'Master scaler'
    },
    {
      id: 'venture_master',
      name: 'Venture Master',
      description: 'Reach level 100 on any venture',
      type: 'scaling',
      completed: false,
      progress: 0,
      target: 100,
      reward: 'Venture expertise'
    },
    {
      id: 'all_ventures_50',
      name: 'Balanced Growth',
      description: 'Reach level 50 on all unlocked ventures',
      type: 'scaling',
      completed: false,
      progress: 0,
      target: 50,
      reward: 'Balanced strategy'
    },
    {
      id: 'save_survivor',
      name: 'Save Survivor',
      description: 'Refresh the page 5 times and keep your progress',
      type: 'saving',
      completed: false,
      progress: 0,
      target: 5,
      reward: 'Save master'
    },
    {
      id: 'persistent_player',
      name: 'Persistent Player',
      description: 'Play for 10 minutes without losing progress',
      type: 'saving',
      completed: false,
      progress: 0,
      target: 600000,
      reward: 'Persistence badge'
    },
    {
      id: 'auto_clicker_pro',
      name: 'Auto-Clicker Pro',
      description: 'Use auto-clicker for 5 minutes',
      type: 'progress',
      completed: false,
      progress: 0,
      target: 300000,
      reward: 'Automation expert'
    },
    {
      id: 'upgrade_collector',
      name: 'Upgrade Collector',
      description: 'Purchase 10 upgrades',
      type: 'progress',
      completed: false,
      progress: 0,
      target: 10,
      reward: 'Upgrade enthusiast'
    },
    {
      id: 'milestone_hunter',
      name: 'Milestone Hunter',
      description: 'Reach 20 milestone thresholds across all ventures',
      type: 'progress',
      completed: false,
      progress: 0,
      target: 20,
      reward: 'Milestone master'
    }
  ];
}

export function updateChallengeProgress(
  challenges: Challenge[],
  gameState: {
    capital: BigNumber;
    totalEarned: BigNumber;
    ventures: Venture[];
    upgrades: Array<{ unlocked: boolean }>;
    autoClickEnabled: boolean;
  },
  challengeProgress: {
    refreshCount: number;
    longestSession: number;
    sessionStartTime: number;
    autoClickerTime: number;
  }
): Challenge[] {
  return challenges.map(challenge => {
    if (challenge.completed) return challenge;

    let progress = 0;

    switch (challenge.id) {
      case 'first_million':
      case 'first_billion':
      case 'first_trillion': {
        const capitalValue = gameState.capital.mantissa * Math.pow(10, gameState.capital.exponent);
        progress = Math.min(capitalValue, challenge.target);
        break;
      }
      case 'venture_master': {
        const maxLevel = Math.max(...gameState.ventures.map(v => v.level));
        progress = Math.min(maxLevel, challenge.target);
        break;
      }
      case 'all_ventures_50': {
        const unlockedVentures = gameState.ventures.filter(v => v.level > 0);
        if (unlockedVentures.length === 0) {
          progress = 0;
        } else {
          const allAt50 = unlockedVentures.every(v => v.level >= challenge.target);
          const minLevel = Math.min(...unlockedVentures.map(v => v.level));
          progress = allAt50 ? challenge.target : Math.min(minLevel, challenge.target);
        }
        break;
      }
      case 'save_survivor': {
        progress = Math.min(challengeProgress.refreshCount, challenge.target);
        break;
      }
      case 'persistent_player': {
        const sessionTime = Date.now() - challengeProgress.sessionStartTime;
        progress = Math.min(sessionTime, challenge.target);
        break;
      }
      case 'auto_clicker_pro': {
        progress = Math.min(challengeProgress.autoClickerTime, challenge.target);
        break;
      }
      case 'upgrade_collector': {
        const purchasedUpgrades = gameState.upgrades.filter(u => u.unlocked).length;
        progress = Math.min(purchasedUpgrades, challenge.target);
        break;
      }
      case 'milestone_hunter': {
        const totalMilestones = gameState.ventures.reduce((sum, v) => {
          const milestones = v.milestoneBoosts || [];
          return sum + milestones.filter(b => v.level >= b.threshold).length;
        }, 0);
        progress = Math.min(totalMilestones, challenge.target);
        break;
      }
    }

    const completed = progress >= challenge.target;
    return {
      ...challenge,
      progress,
      completed,
      completedAt: completed && !challenge.completedAt ? Date.now() : challenge.completedAt
    };
  });
}

