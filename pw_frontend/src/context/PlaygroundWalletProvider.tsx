import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlaygroundWalletContext, PLAYGROUND_WALLET_STORAGE_KEY } from './playgroundWalletContext';

export const PlaygroundWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalanceInternal] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PLAYGROUND_WALLET_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { balance?: number };
      if (typeof parsed.balance === 'number') setBalanceInternal(parsed.balance);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(PLAYGROUND_WALLET_STORAGE_KEY, JSON.stringify({ balance }));
    } catch {
      // ignore
    }
  }, [balance]);

  const setBalance = useCallback((amount: number) => {
    setBalanceInternal(Math.max(0, amount));
  }, []);

  const add = useCallback((amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return;
    setBalanceInternal((prev) => prev + amount);
  }, []);

  const spend = useCallback((amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return true;
    let ok = false;
    setBalanceInternal((prev) => {
      if (prev < amount) {
        ok = false;
        return prev;
      }
      ok = true;
      return prev - amount;
    });
    return ok;
  }, []);

  const value = useMemo(
    () => ({
      balance,
      add,
      spend,
      setBalance,
    }),
    [balance, add, spend, setBalance]
  );

  return <PlaygroundWalletContext.Provider value={value}>{children}</PlaygroundWalletContext.Provider>;
};
