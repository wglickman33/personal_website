import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { drawCards, newShuffledDeck, type ApiCard, type DeckId } from '../../../../services/deckOfCardsApi';
import { usePlaygroundWallet } from '../../../../context/usePlaygroundWallet';
import '../../../../pages/PlaygroundPage/PlaygroundPage.scss';

type HandStatus = 'betting' | 'player_turn' | 'dealer_turn' | 'round_over';
type RoundResult = 'player_blackjack' | 'player_win' | 'dealer_win' | 'push' | 'player_bust' | 'dealer_bust';

type Card = ApiCard & { faceDown?: boolean };

function cardValue(value: string): number {
  if (value === 'ACE') return 11;
  if (value === 'KING' || value === 'QUEEN' || value === 'JACK') return 10;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function handTotals(cards: Card[]) {
  const up = cards.filter((c) => !c.faceDown);
  let total = 0;
  let aces = 0;
  for (const c of up) {
    const v = cardValue(c.value);
    total += v;
    if (c.value === 'ACE') aces++;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  const isSoft = up.some((c) => c.value === 'ACE') && total <= 21 && up.reduce((t, c) => t + cardValue(c.value), 0) !== total;
  return { total, isSoft, count: up.length };
}

function isBlackjack(cards: Card[]) {
  const up = cards.filter((c) => !c.faceDown);
  if (up.length !== 2) return false;
  const { total } = handTotals(up);
  return total === 21;
}

const chipOptions = [5, 10, 25, 50, 100] as const;

const BlackjackGame = () => {
  const wallet = usePlaygroundWallet();

  const [deckId, setDeckId] = useState<DeckId | null>(null);
  const [remaining, setRemaining] = useState<number>(0);
  const [status, setStatus] = useState<HandStatus>('betting');
  const [result, setResult] = useState<RoundResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [bet, setBet] = useState<number>(10);
  const betLockedRef = useRef<number>(0);

  const [player, setPlayer] = useState<Card[]>([]);
  const [dealer, setDealer] = useState<Card[]>([]);

  const playerTotals = useMemo(() => handTotals(player), [player]);
  const dealerTotals = useMemo(() => handTotals(dealer), [dealer]);

  const canHit = status === 'player_turn';
  const canStand = status === 'player_turn';
  const canDouble = status === 'player_turn' && player.filter((c) => !c.faceDown).length === 2 && wallet.balance >= betLockedRef.current;

  const ensureDeck = useCallback(async () => {
    if (deckId && remaining > 20) return deckId;
    const d = await newShuffledDeck(6);
    setDeckId(d.deck_id);
    setRemaining(d.remaining);
    return d.deck_id;
  }, [deckId, remaining]);

  const draw = useCallback(async (count: number) => {
    const id = await ensureDeck();
    const res = await drawCards(id, count);
    setRemaining(res.remaining);
    return res.cards;
  }, [ensureDeck]);

  const clearRound = useCallback(() => {
    setPlayer([]);
    setDealer([]);
    setResult(null);
    setError(null);
    betLockedRef.current = 0;
    setStatus('betting');
  }, []);

  const settle = useCallback((final: RoundResult) => {
    setResult(final);
    setStatus('round_over');

    const b = betLockedRef.current;
    if (b <= 0) return;

    // Wallet: we already spent the bet when dealing.
    // Add back depending on outcome.
    if (final === 'push') wallet.add(b);
    else if (final === 'player_blackjack') wallet.add(Math.floor(b * 2.5)); // 3:2 payout + original
    else if (final === 'player_win' || final === 'dealer_bust') wallet.add(b * 2);
  }, [wallet]);

  const revealDealer = useCallback(() => {
    setDealer((prev) => prev.map((c) => ({ ...c, faceDown: false })));
  }, []);

  const dealerPlay = useCallback(async () => {
    setStatus('dealer_turn');
    revealDealer();

    // Small delay loop for UX
    const stepOnce = async () => {
      const dTotals = handTotals(dealer.map((c) => ({ ...c, faceDown: false })));
      if (dTotals.total > 21) return 'bust' as const;
      if (dTotals.total > 17) return 'stand' as const;
      if (dTotals.total === 17 && dTotals.isSoft) return 'stand' as const; // stand on soft 17
      if (dTotals.total === 17) return 'stand' as const;
      return 'hit' as const;
    };

    while (true) {
      const action = await stepOnce();
      if (action === 'stand') break;
      if (action === 'bust') break;
      // hit
      const [c] = await draw(1);
      setDealer((prev) => [...prev, { ...c, faceDown: false }]);
      await new Promise((r) => setTimeout(r, 350));
    }

    // decide
    const p = handTotals(player);
    const d = handTotals(dealer.map((c) => ({ ...c, faceDown: false })));
    if (d.total > 21) {
      settle('dealer_bust');
      return;
    }
    if (p.total > d.total) settle('player_win');
    else if (p.total < d.total) settle('dealer_win');
    else settle('push');
  }, [dealer, player, draw, revealDealer, settle]);

  const startRound = useCallback(async () => {
    setError(null);
    setResult(null);

    const b = Math.max(1, Math.floor(bet));
    if (wallet.balance < b) {
      setError('Not enough coins for that bet.');
      return;
    }

    const ok = wallet.spend(b);
    if (!ok) {
      setError('Not enough coins for that bet.');
      return;
    }

    betLockedRef.current = b;

    const cards = await draw(4);
    const p1 = { ...cards[0], faceDown: false };
    const d1 = { ...cards[1], faceDown: false };
    const p2 = { ...cards[2], faceDown: false };
    const d2 = { ...cards[3], faceDown: true };

    setPlayer([p1, p2]);
    setDealer([d1, d2]);

    // Check naturals
    const playerBJ = isBlackjack([p1, p2]);
    const dealerBJ = isBlackjack([d1, { ...d2, faceDown: false }]);
    if (playerBJ && dealerBJ) {
      revealDealer();
      settle('push');
      return;
    }
    if (playerBJ) {
      revealDealer();
      settle('player_blackjack');
      return;
    }
    if (dealerBJ) {
      revealDealer();
      settle('dealer_win');
      return;
    }

    setStatus('player_turn');
  }, [bet, wallet, draw, revealDealer, settle]);

  const hit = useCallback(async () => {
    if (!canHit) return;
    const [c] = await draw(1);
    setPlayer((prev) => [...prev, { ...c, faceDown: false }]);
  }, [canHit, draw]);

  const stand = useCallback(async () => {
    if (!canStand) return;
    await dealerPlay();
  }, [canStand, dealerPlay]);

  const doubleDown = useCallback(async () => {
    if (!canDouble) return;
    const b = betLockedRef.current;
    const ok = wallet.spend(b);
    if (!ok) return;
    betLockedRef.current = b * 2;

    const [c] = await draw(1);
    setPlayer((prev) => [...prev, { ...c, faceDown: false }]);
    await dealerPlay();
  }, [canDouble, wallet, draw, dealerPlay]);

  // Auto-bust handling
  useEffect(() => {
    if (status !== 'player_turn') return;
    if (playerTotals.total > 21) {
      revealDealer();
      settle('player_bust');
    }
  }, [status, playerTotals.total, revealDealer, settle]);

  const resultLabel = useMemo(() => {
    if (!result) return null;
    switch (result) {
      case 'player_blackjack': return 'Blackjack! You win (3:2).';
      case 'player_win': return 'You win.';
      case 'dealer_win': return 'Dealer wins.';
      case 'push': return 'Push.';
      case 'player_bust': return 'Bust.';
      case 'dealer_bust': return 'Dealer busts. You win.';
      default: return null;
    }
  }, [result]);

  return (
    <div className="playground-casino__placeholder">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
        <div>
          <h2 style={{ margin: 0 }}>Blackjack</h2>
          <div style={{ opacity: 0.8, fontSize: 12 }}>
            <Link to="/playground/casino" className="playground-section__link">Back to Casino</Link>
            <span style={{ margin: '0 8px' }}>•</span>
            Shoe: {remaining} cards
          </div>
        </div>
        <div style={{ fontWeight: 700 }}>Coins: {wallet.balance}</div>
      </div>

      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>Bet</div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {chipOptions.map((c) => (
              <button
                key={c}
                type="button"
                disabled={status !== 'betting'}
                onClick={() => setBet(c)}
                style={{
                  padding: '8px 10px',
                  borderRadius: 10,
                  border: bet === c ? '1px solid rgba(59,130,246,0.55)' : '1px solid rgba(0,0,0,0.12)',
                  background: bet === c ? 'rgba(59,130,246,0.12)' : 'rgba(255,255,255,0.85)',
                  fontWeight: 700,
                  cursor: status === 'betting' ? 'pointer' : 'not-allowed',
                }}
              >
                {c}
              </button>
            ))}

            <button
              type="button"
              disabled={status !== 'betting'}
              onClick={startRound}
              style={{
                marginLeft: 'auto',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid rgba(59,130,246,0.45)',
                background: 'rgba(59,130,246,0.16)',
                fontWeight: 800,
                cursor: status === 'betting' ? 'pointer' : 'not-allowed',
              }}
            >
              Deal
            </button>
          </div>

          {error && <div style={{ marginTop: 10, color: '#b91c1c', fontSize: 12 }}>{error}</div>}
          {status !== 'betting' && (
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>
              Bet locked: {betLockedRef.current}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 10 }}>Dealer ({dealerTotals.total})</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {dealer.map((c) => (
                <div key={c.code} style={{ width: 80, height: 116, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(15,23,42,0.06)' }}>
                  {c.faceDown ? (
                    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', fontWeight: 800, opacity: 0.7 }}>?</div>
                  ) : (
                    <img src={c.image} alt={c.code} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 10 }}>Player ({playerTotals.total})</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {player.map((c) => (
                <div key={c.code} style={{ width: 80, height: 116, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(15,23,42,0.06)' }}>
                  <img src={c.image} alt={c.code} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" disabled={!canHit} onClick={hit} className="playground-landing__cardCta">Hit</button>
          <button type="button" disabled={!canStand} onClick={stand} className="playground-landing__cardCta">Stand</button>
          <button type="button" disabled={!canDouble} onClick={doubleDown} className="playground-landing__cardCta">Double</button>

          <button
            type="button"
            onClick={clearRound}
            style={{ marginLeft: 'auto', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.85)', fontWeight: 800 }}
          >
            New round
          </button>
        </div>

        {resultLabel && (
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.22)', fontWeight: 800 }}>
            {resultLabel}
          </div>
        )}

        <div style={{ fontSize: 12, opacity: 0.85 }}>
          Rules: dealer stands on soft 17 • blackjack pays 3:2 • split not yet implemented.
        </div>
      </div>
    </div>
  );
};

export default BlackjackGame;

