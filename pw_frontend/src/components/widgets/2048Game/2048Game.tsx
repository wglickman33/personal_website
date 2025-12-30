import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import './2048Game.scss';

type Dir = 'up' | 'down' | 'left' | 'right';
type Grid = number[][];

type Tile = {
  id: string;
  value: number;
  r: number;
  c: number;
  justMerged?: boolean;
  isNew?: boolean;
};

const SIZE = 4;
const STORAGE_KEY_BEST = 'pw:2048:best';
const MOVE_MS = 160;

function makeEmptyGrid(): Grid {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => 0));
}

function cloneGrid(g: Grid): Grid {
  return g.map((row) => row.slice());
}

function tilesToGrid(tiles: Tile[]): Grid {
  const g = makeEmptyGrid();
  for (const t of tiles) g[t.r][t.c] = t.value;
  return g;
}

function pickEmptyCell(g: Grid): { r: number; c: number } | null {
  const empties: Array<{ r: number; c: number }> = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) empties.push({ r, c });
    }
  }
  if (empties.length === 0) return null;
  return empties[Math.floor(Math.random() * empties.length)];
}

function addRandomTileToGrid(g: Grid): Grid {
  const cell = pickEmptyCell(g);
  if (!cell) return g;
  const next = cloneGrid(g);
  next[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function rotateGridCW(g: Grid): Grid {
  const next = makeEmptyGrid();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      next[c][SIZE - 1 - r] = g[r][c];
    }
  }
  return next;
}

function rotateTimes(g: Grid, times: number): Grid {
  let out = g;
  for (let i = 0; i < times; i++) out = rotateGridCW(out);
  return out;
}

function compressAndMergeRow(row: number[]): { row: number[]; gained: number; moved: boolean } {
  const nums = row.filter((n) => n !== 0);
  let gained = 0;
  const merged: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i < nums.length - 1 && nums[i] === nums[i + 1]) {
      const v = nums[i] * 2;
      merged.push(v);
      gained += v;
      i++;
    } else {
      merged.push(nums[i]);
    }
  }
  while (merged.length < SIZE) merged.push(0);
  const moved = merged.some((v, i) => v !== row[i]);
  return { row: merged, gained, moved };
}

function moveGrid(g: Grid, dir: Dir): { grid: Grid; gained: number; moved: boolean } {
  const rotations =
    dir === 'left' ? 0 :
    dir === 'up' ? 3 :
    dir === 'right' ? 2 :
    1;

  const rotated = rotateTimes(g, rotations);
  let gained = 0;
  let moved = false;
  const next = rotated.map((row) => {
    const res = compressAndMergeRow(row);
    gained += res.gained;
    moved = moved || res.moved;
    return res.row;
  });
  const unrotated = rotateTimes(next, (4 - rotations) % 4);
  return { grid: unrotated, gained, moved };
}

function moveTiles(
  tiles: Tile[],
  dir: Dir,
  nextId: () => string
): { tiles: Tile[]; gained: number; moved: boolean } {
  const grid = tilesToGrid(tiles);
  const res = moveGrid(grid, dir);
  if (!res.moved) return { tiles, gained: 0, moved: false };

  const prevByCell = new Map<string, Tile>();
  for (const t of tiles) prevByCell.set(`${t.r},${t.c}`, t);

  const nextTiles: Tile[] = [];
  const usedPrevIds = new Set<string>();

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = res.grid[r][c];
      if (v === 0) continue;

      const candidates: Tile[] = [];
      if (dir === 'left' || dir === 'right') {
        const scanRow = r;
        const cols = dir === 'left'
          ? Array.from({ length: SIZE }, (_, i) => i)
          : Array.from({ length: SIZE }, (_, i) => SIZE - 1 - i);
        for (const cc of cols) {
          const t = prevByCell.get(`${scanRow},${cc}`);
          if (t && !usedPrevIds.has(t.id)) candidates.push(t);
        }
      } else {
        const scanCol = c;
        const rows = dir === 'up'
          ? Array.from({ length: SIZE }, (_, i) => i)
          : Array.from({ length: SIZE }, (_, i) => SIZE - 1 - i);
        for (const rr of rows) {
          const t = prevByCell.get(`${rr},${scanCol}`);
          if (t && !usedPrevIds.has(t.id)) candidates.push(t);
        }
      }

      const preferred = candidates.find((t) => t.value === v) ?? candidates.find((t) => t.value === v / 2);
      if (preferred) usedPrevIds.add(preferred.id);

      nextTiles.push({
        id: preferred?.id ?? nextId(),
        value: v,
        r,
        c,
        justMerged: preferred ? preferred.value !== v : false,
      });
    }
  }

  return { tiles: nextTiles, gained: res.gained, moved: true };
}

function hasMoves(g: Grid): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) return true;
      if (c < SIZE - 1 && g[r][c] === g[r][c + 1]) return true;
      if (r < SIZE - 1 && g[r][c] === g[r + 1][c]) return true;
    }
  }
  return false;
}

function getMaxTile(g: Grid): number {
  let m = 0;
  for (const row of g) for (const v of row) m = Math.max(m, v);
  return m;
}


const Game2048 = () => {
  const { theme } = useTheme();
  const idRef = useRef(0);
  const nextId = useCallback(() => `t${++idRef.current}`, []);

  const [tiles, setTiles] = useState<Tile[]>(() => {
    let g = makeEmptyGrid();
    g = addRandomTileToGrid(g);
    g = addRandomTileToGrid(g);
    const out: Tile[] = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (g[r][c] !== 0) out.push({ id: `t${++idRef.current}`, value: g[r][c], r, c, isNew: true });
      }
    }
    return out;
  });
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => {
    const raw = localStorage.getItem(STORAGE_KEY_BEST);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) ? n : 0;
  });
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);
  const isAnimatingRef = useRef(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const tilesRef = useRef<HTMLDivElement | null>(null);
  const touchRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [cellSize, setCellSize] = useState(0);
  const [gapSize, setGapSize] = useState(0);

  const grid = useMemo(() => tilesToGrid(tiles), [tiles]);
  const maxTile = useMemo(() => getMaxTile(grid), [grid]);

  useEffect(() => {
    if (score > best) {
      setBest(score);
      localStorage.setItem(STORAGE_KEY_BEST, String(score));
    }
  }, [score, best]);

  useEffect(() => {
    if (!won && maxTile >= 2048) setWon(true);
  }, [won, maxTile]);

  useEffect(() => {
    if (!hasMoves(grid)) setOver(true);
  }, [grid]);

  useEffect(() => {
    const updateSizes = () => {
      if (!tilesRef.current || !boardRef.current) return;
      const containerWidth = tilesRef.current.offsetWidth;
      const gridElement = boardRef.current.querySelector('.g2048__grid') as HTMLElement;
      if (!gridElement) return;
      const computed = getComputedStyle(gridElement);
      const gapValue = computed.gap;
      const gap = parseFloat(gapValue) || 12;
      const cells = 4;
      const cell = (containerWidth - (cells - 1) * gap) / cells;
      setCellSize(cell);
      setGapSize(gap);
    };

    const timeoutId = setTimeout(updateSizes, 0);
    window.addEventListener('resize', updateSizes);
    const observer = new ResizeObserver(updateSizes);
    if (tilesRef.current) observer.observe(tilesRef.current);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateSizes);
      observer.disconnect();
    };
  }, []);

  const restart = useCallback(() => {
    let g = makeEmptyGrid();
    g = addRandomTileToGrid(g);
    g = addRandomTileToGrid(g);
    const out: Tile[] = [];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (g[r][c] !== 0) out.push({ id: nextId(), value: g[r][c], r, c, isNew: true });
      }
    }
    setTiles(out);
    setScore(0);
    setWon(false);
    setOver(false);
  }, [nextId]);

  const doMove = useCallback((dir: Dir) => {
    if (over) return;
    if (isAnimatingRef.current) return;

    const res = moveTiles(tiles, dir, nextId);
    if (!res.moved) {
      return;
    }

    isAnimatingRef.current = true;
    setTiles(res.tiles.map((t) => ({ ...t, isNew: false })));
    setScore((s) => s + res.gained);

    window.setTimeout(() => {
      setTiles((current) => {
        const cleared = current.map((t) => ({ ...t, justMerged: false }));
        const g = tilesToGrid(cleared);
        const cell = pickEmptyCell(g);
        if (!cell) return cleared;
        const value = Math.random() < 0.9 ? 2 : 4;
        return [...cleared, { id: nextId(), value, r: cell.r, c: cell.c, isNew: true }];
      });
      isAnimatingRef.current = false;
    }, MOVE_MS);
  }, [tiles, over, nextId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        restart();
        return;
      }

      const map: Record<string, Dir | undefined> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
        W: 'up',
        S: 'down',
        A: 'left',
        D: 'right',
      };
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      doMove(dir);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [doMove, restart]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      touchRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    
    const onPointerMove = (e: PointerEvent) => {
      if (touchRef.current.active) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    
    const onPointerUp = (e: PointerEvent) => {
      const t = touchRef.current;
      if (!t.active) return;
      e.preventDefault();
      e.stopPropagation();
      touchRef.current.active = false;
      const dx = e.clientX - t.x;
      const dy = e.clientY - t.y;
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      const threshold = 28;
      if (Math.max(ax, ay) < threshold) return;
      if (ax > ay) doMove(dx > 0 ? 'right' : 'left');
      else doMove(dy > 0 ? 'down' : 'up');
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        touchRef.current = { x: touch.clientX, y: touch.clientY, active: true };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchRef.current.active && e.touches.length === 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const t = touchRef.current;
      if (!t.active) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        touchRef.current.active = false;
        const dx = touch.clientX - t.x;
        const dy = touch.clientY - t.y;
        const ax = Math.abs(dx);
        const ay = Math.abs(dy);
        const threshold = 28;
        if (Math.max(ax, ay) < threshold) return;
        if (ax > ay) doMove(dx > 0 ? 'right' : 'left');
        else doMove(dy > 0 ? 'down' : 'up');
      }
    };

    el.addEventListener('pointerdown', onPointerDown, { passive: false });
    el.addEventListener('pointermove', onPointerMove, { passive: false });
    el.addEventListener('pointerup', onPointerUp, { passive: false });
    el.addEventListener('pointercancel', onPointerUp, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: false });
    el.addEventListener('touchcancel', onTouchEnd, { passive: false });
    
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [doMove]);

  return (
    <div ref={rootRef} className={`g2048 g2048--${theme}`}>
      <div className="g2048__header">
        <div className="g2048__brand">
          <div className="g2048__title">2048</div>
          <div className="g2048__subtitle">Join tiles. Reach 2048.</div>
        </div>

        <div className="g2048__stats">
          <div className="g2048__stat">
            <div className="g2048__stat-label">Score</div>
            <div className="g2048__stat-value">{score}</div>
          </div>
          <div className="g2048__stat">
            <div className="g2048__stat-label">Best</div>
            <div className="g2048__stat-value">{best}</div>
          </div>
        </div>
      </div>

      <div className="g2048__actions">
        <button className="g2048__btn" onClick={restart}>New Game</button>
        <div className="g2048__hint">Use Arrow Keys / WASD · Swipe on mobile · Press R to restart</div>
      </div>

      <div ref={boardRef} className="g2048__board">
        <div className="g2048__grid" aria-hidden="true">
          {Array.from({ length: SIZE * SIZE }).map((_, i) => (
            <div key={i} className="g2048__cell" />
          ))}
                  </div>

        <div ref={tilesRef} className="g2048__tiles" aria-hidden="true">
          {tiles.map((t) => {
            const step = cellSize + gapSize;
            const x = t.c * step;
            const y = t.r * step;
            return (
              <div
                key={t.id}
                className={[
                  'g2048__tile',
                  `g2048__tile--v${t.value}`,
                  t.isNew ? 'g2048__tile--new' : '',
                  t.justMerged ? 'g2048__tile--merge' : '',
                ].filter(Boolean).join(' ')}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0)`,
                }}
              >
                <div className="g2048__tile-inner">{t.value}</div>
              </div>
            );
          })}
        </div>

        {(won || over) && (
          <div className="g2048__overlay" role="dialog" aria-modal="true">
            <div className="g2048__overlay-card">
              <div className="g2048__overlay-title">{over ? 'Game Over' : 'You got 2048!'}</div>
              <div className="g2048__overlay-subtitle">
                {over ? 'No more moves left.' : 'Keep going for a higher score, or start a new game.'}
              </div>
              <div className="g2048__overlay-actions">
                <button className="g2048__btn g2048__btn--primary" onClick={restart}>
                  New Game
                </button>
                {!over && (
                  <button className="g2048__btn" onClick={() => setWon(false)}>
                    Keep Going
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game2048;
