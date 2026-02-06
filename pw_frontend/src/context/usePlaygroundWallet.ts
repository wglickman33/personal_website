import { useContext } from 'react';
import { PlaygroundWalletContext } from './playgroundWalletContext';

export function usePlaygroundWallet() {
  const ctx = useContext(PlaygroundWalletContext);
  if (!ctx) throw new Error('usePlaygroundWallet must be used within PlaygroundWalletProvider');
  return ctx;
}

