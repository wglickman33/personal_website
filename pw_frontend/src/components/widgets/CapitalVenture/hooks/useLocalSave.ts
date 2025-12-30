import { useEffect, useRef } from 'react';
import { GameState } from '../types/capitalVentureTypes';
import { saveGameState } from '../utils/storage';

const SAVE_INTERVAL_MS = 2000;

export function useLocalSave(gameState: GameState) {
  const lastSaveRef = useRef<number>(0);
  const gameStateRef = useRef<GameState>(gameState);

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

  const saveNow = () => {
    saveGameState(gameStateRef.current);
    lastSaveRef.current = Date.now();
  };

  return { saveNow };
}

