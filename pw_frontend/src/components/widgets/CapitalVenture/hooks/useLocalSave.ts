import { useEffect, useRef } from 'react';
import { GameState } from '../types/capitalVentureTypes';
import { saveGameState } from '../utils/storage';

const SAVE_INTERVAL_MS = 2000;
const DEBOUNCE_MS = 500;

export function useLocalSave(gameState: GameState) {
  const lastSaveRef = useRef<number>(0);
  const gameStateRef = useRef<GameState>(gameState);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastSaveRef.current >= SAVE_INTERVAL_MS) {
        saveGameState(gameStateRef.current);
        lastSaveRef.current = now;
      }
    }, SAVE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveGameState(gameStateRef.current);
      lastSaveRef.current = Date.now();
    }, DEBOUNCE_MS);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    gameState.capital.mantissa,
    gameState.capital.exponent,
    gameState.totalEarned.mantissa,
    gameState.totalEarned.exponent,
    JSON.stringify(gameState.ventures.map(v => ({ id: v.id, level: v.level, managerLevel: v.managerLevel }))),
    JSON.stringify(gameState.upgrades.map(u => ({ id: u.id, unlocked: u.unlocked }))),
    gameState.clickSpeedLevel,
    gameState.clickValueLevel,
    gameState.autoClickEnabled,
    gameState.buyMode,
    gameState.prestigePoints
  ]);

  const saveNow = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveGameState(gameStateRef.current);
    lastSaveRef.current = Date.now();
  };

  return { saveNow };
}

