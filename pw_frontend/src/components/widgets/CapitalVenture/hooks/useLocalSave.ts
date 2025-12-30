import { useEffect, useRef } from 'react';
import { GameState } from '../types/capitalVentureTypes';
import { saveGameState } from '../utils/storage';

const SAVE_INTERVAL_MS = 500;
const DEBOUNCE_MS = 300;

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
  }, [gameState.capital, gameState.totalEarned, gameState.ventures, gameState.upgrades, gameState.clickSpeedLevel, gameState.clickValueLevel, gameState.autoClickEnabled]);

  const saveNow = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveGameState(gameStateRef.current);
    lastSaveRef.current = Date.now();
  };

  return { saveNow };
}

