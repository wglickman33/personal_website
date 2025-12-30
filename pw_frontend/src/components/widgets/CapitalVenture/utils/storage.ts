import { GameState } from '../types/capitalVentureTypes';
import * as BN from './bigNumber';
import { createInitialChallenges } from '../data/challenges';

const STORAGE_KEY = 'pw:capital-venture:state';

export function saveGameState(state: GameState): void {
  try {
    // Explicitly save all fields to ensure nothing is missed
    const serialized = {
      capital: BN.toJSON(state.capital),
      totalEarned: BN.toJSON(state.totalEarned),
      capitalPerClick: BN.toJSON(state.capitalPerClick),
      prestigePoints: state.prestigePoints ?? 0,
      ventures: state.ventures.map(v => ({
        id: v.id,
        name: v.name,
        description: v.description,
        level: v.level ?? 0,
        baseCost: BN.toJSON(v.baseCost),
        costGrowth: v.costGrowth ?? 1.15,
        baseIncomePerSec: BN.toJSON(v.baseIncomePerSec),
        incomeGrowth: v.incomeGrowth ?? 1.1,
        unlockAtTotalEarned: BN.toJSON(v.unlockAtTotalEarned),
        managerLevel: v.managerLevel ?? 0,
        milestoneMultipliers: v.milestoneMultipliers || [],
        milestoneThresholds: v.milestoneThresholds || [],
        milestoneBoosts: v.milestoneBoosts || []
      })),
      upgrades: state.upgrades.map(u => ({
        id: u.id,
        name: u.name,
        description: u.description,
        cost: BN.toJSON(u.cost),
        unlocked: u.unlocked ?? false,
        unlockAtTotalEarned: u.unlockAtTotalEarned ? BN.toJSON(u.unlockAtTotalEarned) : undefined,
        unlockAtVentureLevel: u.unlockAtVentureLevel,
        type: u.type,
        ventureId: u.ventureId,
        multiplier: u.multiplier ?? 1,
        boostType: u.boostType
      })),
      buyMode: state.buyMode || 'x1',
      autoClickEnabled: state.autoClickEnabled ?? false,
      autoClickRate: state.autoClickRate ?? 10,
      clickSpeedLevel: state.clickSpeedLevel ?? 0,
      clickValueLevel: state.clickValueLevel ?? 0,
      lastSavedAt: Date.now(),
      challenges: state.challenges || [],
      challengeProgress: state.challengeProgress ? {
        refreshCount: state.challengeProgress.refreshCount ?? 0,
        longestSession: state.challengeProgress.longestSession ?? 0,
        sessionStartTime: state.challengeProgress.sessionStartTime ?? Date.now(),
        autoClickerTime: state.challengeProgress.autoClickerTime ?? 0,
        lastAutoClickerState: state.challengeProgress.lastAutoClickerState ?? false,
        autoClickerStartTime: state.challengeProgress.autoClickerStartTime
      } : {
        refreshCount: 0,
        longestSession: 0,
        sessionStartTime: Date.now(),
        autoClickerTime: 0,
        lastAutoClickerState: false
      }
    };
    const serializedString = JSON.stringify(serialized);
    localStorage.setItem(STORAGE_KEY, serializedString);
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function loadGameState(): GameState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed = JSON.parse(stored);
    
    if (!parsed.ventures || !Array.isArray(parsed.ventures) ||
        !parsed.upgrades || !Array.isArray(parsed.upgrades) ||
        typeof parsed.prestigePoints !== 'number' ||
        !parsed.capital || !parsed.totalEarned || !parsed.capitalPerClick) {
      return null;
    }
    
    // Ensure all numeric fields are properly loaded
    if (typeof parsed.autoClickEnabled !== 'boolean') {
      parsed.autoClickEnabled = false;
    }
    if (typeof parsed.autoClickRate !== 'number') {
      parsed.autoClickRate = 10;
    }
    if (typeof parsed.clickSpeedLevel !== 'number') {
      parsed.clickSpeedLevel = 0;
    }
    if (typeof parsed.clickValueLevel !== 'number') {
      parsed.clickValueLevel = 0;
    }
    if (typeof parsed.prestigePoints !== 'number') {
      parsed.prestigePoints = 0;
    }
    if (typeof parsed.buyMode !== 'string') {
      parsed.buyMode = 'x1';
    }
    
    if (!parsed.challengeProgress) {
      parsed.challengeProgress = {
        refreshCount: 0,
        longestSession: 0,
        sessionStartTime: Date.now(),
        autoClickerTime: 0,
        lastAutoClickerState: false
      };
    } else {
      parsed.challengeProgress.refreshCount = (parsed.challengeProgress.refreshCount || 0) + 1;
      parsed.challengeProgress.sessionStartTime = parsed.challengeProgress.sessionStartTime || Date.now();
    }
    
    return {
      ...parsed,
      capital: BN.fromJSON(parsed.capital),
      totalEarned: BN.fromJSON(parsed.totalEarned),
      capitalPerClick: BN.fromJSON(parsed.capitalPerClick),
      ventures: parsed.ventures.map((v: {
        id: string;
        name: string;
        description: string;
        level?: number;
        baseCost: { mantissa: number; exponent: number };
        costGrowth?: number;
        baseIncomePerSec: { mantissa: number; exponent: number };
        incomeGrowth?: number;
        unlockAtTotalEarned: { mantissa: number; exponent: number };
        hasManager?: boolean;
        managerLevel?: number;
        milestoneMultipliers?: Array<{ level: number; multiplier: number }>;
        milestoneThresholds?: number[];
        milestoneBoosts?: Array<{ threshold: number; type: 'income' | 'speed' | 'multiplier'; value: number }>;
        [key: string]: unknown;
      }) => ({
        id: v.id,
        name: v.name,
        description: v.description,
        level: typeof v.level === 'number' ? v.level : 0,
        baseCost: BN.fromJSON(v.baseCost),
        costGrowth: typeof v.costGrowth === 'number' ? v.costGrowth : 1.15,
        baseIncomePerSec: BN.fromJSON(v.baseIncomePerSec),
        incomeGrowth: typeof v.incomeGrowth === 'number' ? v.incomeGrowth : 1.1,
        unlockAtTotalEarned: BN.fromJSON(v.unlockAtTotalEarned),
        managerLevel: typeof v.managerLevel === 'number' 
          ? v.managerLevel 
          : (v.hasManager === true ? 1 : 0),
        milestoneMultipliers: Array.isArray(v.milestoneMultipliers) ? v.milestoneMultipliers : [],
        milestoneThresholds: Array.isArray(v.milestoneThresholds) ? v.milestoneThresholds : [],
        milestoneBoosts: Array.isArray(v.milestoneBoosts) ? v.milestoneBoosts : []
      })),
      upgrades: parsed.upgrades.map((u: {
        id: string;
        name: string;
        description: string;
        cost: { mantissa: number; exponent: number };
        unlocked?: boolean;
        unlockAtTotalEarned?: { mantissa: number; exponent: number };
        unlockAtVentureLevel?: { ventureId: string; level: number };
        type?: string;
        ventureId?: string;
        multiplier?: number;
        boostType?: string;
        [key: string]: unknown;
      }) => ({
        id: u.id,
        name: u.name,
        description: u.description,
        cost: BN.fromJSON(u.cost),
        unlocked: typeof u.unlocked === 'boolean' ? u.unlocked : false,
        unlockAtTotalEarned: u.unlockAtTotalEarned ? BN.fromJSON(u.unlockAtTotalEarned) : undefined,
        unlockAtVentureLevel: u.unlockAtVentureLevel,
        type: u.type || 'global',
        ventureId: u.ventureId,
        multiplier: typeof u.multiplier === 'number' ? u.multiplier : 1,
        boostType: u.boostType
      })),
      challenges: parsed.challenges || createInitialChallenges(),
      challengeProgress: parsed.challengeProgress || {
        refreshCount: 0,
        longestSession: 0,
        sessionStartTime: Date.now(),
        autoClickerTime: 0,
        lastAutoClickerState: false
      }
    };
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
}

export function clearGameState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

