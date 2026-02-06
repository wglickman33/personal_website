import { createContext } from 'react';

export type PlaygroundWalletState = {
  balance: number;
  add: (amount: number) => void;
  spend: (amount: number) => boolean;
  setBalance: (amount: number) => void;
};

export const PLAYGROUND_WALLET_STORAGE_KEY = 'pw_playground_wallet_v1';

export const PlaygroundWalletContext = createContext<PlaygroundWalletState | null>(null);

