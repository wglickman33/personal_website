import { GameState } from '../types/capitalVentureTypes';
import * as BN from './bigNumber';
import { createInitialChallenges } from '../data/challenges';

const STORAGE_KEY = 'pw:capital-venture:state';

export function saveGameState(state: GameState): void {
  try {
    const serialized = {
      ...state,
      capital: BN.toJSON(state.capital),
      totalEarned: BN.toJSON(state.totalEarned),
      capitalPerClick: BN.toJSON(state.capitalPerClick),
      ventures: state.ventures.map(v => ({
        ...v,
        baseCost: BN.toJSON(v.baseCost),
        baseIncomePerSec: BN.toJSON(v.baseIncomePerSec),
        unlockAtTotalEarned: BN.toJSON(v.unlockAtTotalEarned),
        managerLevel: v.managerLevel || 0,
        milestoneThresholds: v.milestoneThresholds || [],
        milestoneBoosts: v.milestoneBoosts || []
      })),
      upgrades: state.upgrades.map(u => ({
        ...u,
        cost: BN.toJSON(u.cost),
        unlockAtTotalEarned: u.unlockAtTotalEarned ? BN.toJSON(u.unlockAtTotalEarned) : undefined
      })),
      buyMode: state.buyMode || 'x1',
      autoClickEnabled: state.autoClickEnabled || false,
      autoClickRate: state.autoClickRate || 10,
      clickSpeedLevel: state.clickSpeedLevel || 0,
      clickValueLevel: state.clickValueLevel || 0,
      lastSavedAt: Date.now(),
      challenges: state.challenges || [],
      challengeProgress: state.challengeProgress || {
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
    
    if (parsed.autoClickEnabled === undefined) {
      parsed.autoClickEnabled = false;
    }
    if (parsed.autoClickRate === undefined) {
      parsed.autoClickRate = 10;
    }
    if (parsed.clickSpeedLevel === undefined) {
      parsed.clickSpeedLevel = 0;
    }
    if (parsed.clickValueLevel === undefined) {
      parsed.clickValueLevel = 0;
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
        baseCost: { mantissa: number; exponent: number };
        baseIncomePerSec: { mantissa: number; exponent: number };
        unlockAtTotalEarned: { mantissa: number; exponent: number };
        hasManager?: boolean;
        managerLevel?: number;
        [key: string]: unknown;
      }) => ({
        ...v,
        baseCost: BN.fromJSON(v.baseCost),
        baseIncomePerSec: BN.fromJSON(v.baseIncomePerSec),
        unlockAtTotalEarned: BN.fromJSON(v.unlockAtTotalEarned),
        managerLevel: v.managerLevel !== undefined 
          ? v.managerLevel 
          : (v.hasManager === true ? 1 : 0),
        milestoneThresholds: v.milestoneThresholds || [],
        milestoneBoosts: v.milestoneBoosts || []
      })),
      upgrades: parsed.upgrades.map((u: {
        cost: { mantissa: number; exponent: number };
        unlockAtTotalEarned?: { mantissa: number; exponent: number };
        [key: string]: unknown;
      }) => ({
        ...u,
        cost: BN.fromJSON(u.cost),
        unlockAtTotalEarned: u.unlockAtTotalEarned ? BN.fromJSON(u.unlockAtTotalEarned) : undefined
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

