import { useState, useEffect, useCallback, useRef } from 'react';
import useTheme from '../../../hooks/useTheme';
import './ColorSortPuzzle.scss';

interface ColorSortPuzzleProps {
  isPreview?: boolean;
}

type Color = string | null;

const COLORS = ['#ef4444', '#51cf66', '#2563eb', '#ffd43b', '#ff922b', '#845ef7', '#ec4899', '#06b6d4'];
const NUM_COLORS = 8;
const BALLS_PER_COLOR = 4;
const MAX_BALLS_PER_TUBE = 4;

type Move = {
  from: number;
  to: number;
  count: number;
};

function topColor(tube: Color[]): Color {
  return tube.length === 0 ? null : tube[0];
}

function topColorCount(tube: Color[]): number {
  if (tube.length === 0) return 0;
  const c = tube[0];
  let n = 0;
  for (let i = 0; i < tube.length; i++) {
    if (tube[i] === c) n++;
    else break;
  }
  return n;
}

function canPourMove(fromTube: Color[], toTube: Color[], maxPerTube: number): boolean {
  if (fromTube.length === 0) return false;
  if (toTube.length >= maxPerTube) return false;
  const c = topColor(fromTube);
  if (!c) return false;
  if (toTube.length === 0) return true;
  return c === topColor(toTube);
}

function ballsToMove(fromTube: Color[], toTube: Color[], maxPerTube: number): number {
  if (!canPourMove(fromTube, toTube, maxPerTube)) return 0;
  const count = topColorCount(fromTube);
  const space = maxPerTube - toTube.length;
  return Math.min(count, space);
}

function applyMove(tubes: Color[][], move: Move): Color[][] {
  const next = tubes.map(t => [...t]);
  const fromTube = [...next[move.from]];
  const toTube = [...next[move.to]];

  const moved: Color[] = [];
  for (let i = 0; i < move.count; i++) {
    const b = fromTube.shift();
    if (b) moved.push(b);
  }

  for (let i = moved.length - 1; i >= 0; i--) {
    const b = moved[i];
    if (toTube.length === 0) {
      toTube.push(b);
    } else {
      toTube.unshift(b);
    }
  }

  next[move.from] = fromTube;
  next[move.to] = toTube;
  return next;
}

function isSolvedState(tubes: Color[][], maxPerTube: number): boolean {
  return tubes.every(tube => {
    if (tube.length === 0) return true;
    if (tube.length !== maxPerTube) return false;
    const c = tube[0];
    return tube.every(x => x === c);
  });
}

function generateSolvablePuzzle(opts: {
  colors: string[];
  numColors: number;
  ballsPerColor: number;
  maxPerTube: number;
  emptyTubes: number;
  scrambleMoves: number;
  maxAttempts?: number;
}): Color[][] {
  const { colors, numColors, ballsPerColor, maxPerTube, emptyTubes, scrambleMoves, maxAttempts = 100 } = opts;

  const numTubes = numColors + emptyTubes;

  const solved: Color[][] = [];
  for (let i = 0; i < numColors; i++) solved.push(Array(ballsPerColor).fill(colors[i]));
  for (let i = 0; i < emptyTubes; i++) solved.push([]);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let tubes = solved.map(t => [...t]);
    
    for (let mix = 0; mix < 1500; mix++) {
      const from = Math.floor(Math.random() * numTubes);
      const to = Math.floor(Math.random() * numTubes);
      if (from !== to && tubes[from].length > 0 && tubes[to].length < maxPerTube) {
        const ball = tubes[from].shift();
        if (ball) {
          if (tubes[to].length === 0) {
            tubes[to].push(ball);
          } else {
            tubes[to].unshift(ball);
          }
        }
      }
    }
    
    let last: Move | null = null;
    let consecutiveNoMoves = 0;
    let movesMade = 0;

    for (let step = 0; step < scrambleMoves && movesMade < scrambleMoves * 0.8; step++) {
      const moves: Move[] = [];

      for (let from = 0; from < numTubes; from++) {
        for (let to = 0; to < numTubes; to++) {
          if (from === to) continue;

          const count = ballsToMove(tubes[from], tubes[to], maxPerTube);
          if (count <= 0) continue;

          if (last && last.from === to && last.to === from) continue;

          moves.push({ from, to, count });
        }
      }

      if (moves.length === 0) {
        consecutiveNoMoves++;
        if (consecutiveNoMoves > 200) {
          for (let mix = 0; mix < 100; mix++) {
            const from = Math.floor(Math.random() * numTubes);
            const to = Math.floor(Math.random() * numTubes);
            if (from !== to && tubes[from].length > 0 && tubes[to].length < maxPerTube) {
              const ball = tubes[from].shift();
              if (ball) {
                if (tubes[to].length === 0) {
                  tubes[to].push(ball);
                } else {
                  tubes[to].unshift(ball);
                }
              }
            }
          }
          consecutiveNoMoves = 0;
        }
        continue;
      }

      consecutiveNoMoves = 0;
      const move = moves[Math.floor(Math.random() * moves.length)];
      tubes = applyMove(tubes, move);
      last = move;
      movesMade++;
    }

    if (!isSolvedState(tubes, maxPerTube)) return tubes;
  }

  let tubes = solved.map(t => [...t]);
  
  for (let mix = 0; mix < 1500; mix++) {
    const from = Math.floor(Math.random() * numTubes);
    const to = Math.floor(Math.random() * numTubes);
    if (from !== to && tubes[from].length > 0 && tubes[to].length < maxPerTube) {
      const ball = tubes[from].shift();
      if (ball) {
        if (tubes[to].length === 0) {
          tubes[to].push(ball);
        } else {
          tubes[to].unshift(ball);
        }
      }
    }
  }
  
  let last: Move | null = null;
  let consecutiveNoMoves = 0;
  let movesMade = 0;

  for (let step = 0; step < scrambleMoves && movesMade < scrambleMoves * 0.8; step++) {
    const moves: Move[] = [];

    for (let from = 0; from < numTubes; from++) {
      for (let to = 0; to < numTubes; to++) {
        if (from === to) continue;
        const count = ballsToMove(tubes[from], tubes[to], maxPerTube);
        if (count <= 0) continue;
        if (last && last.from === to && last.to === from) continue;
        moves.push({ from, to, count });
      }
    }

    if (moves.length === 0) {
      consecutiveNoMoves++;
      if (consecutiveNoMoves > 200) {
        for (let mix = 0; mix < 100; mix++) {
          const from = Math.floor(Math.random() * numTubes);
          const to = Math.floor(Math.random() * numTubes);
          if (from !== to && tubes[from].length > 0 && tubes[to].length < maxPerTube) {
            const ball = tubes[from].shift();
            if (ball) {
              if (tubes[to].length === 0) {
                tubes[to].push(ball);
              } else {
                tubes[to].unshift(ball);
              }
            }
          }
        }
        consecutiveNoMoves = 0;
      }
      continue;
    }

    consecutiveNoMoves = 0;
    const move = moves[Math.floor(Math.random() * moves.length)];
    tubes = applyMove(tubes, move);
    last = move;
    movesMade++;
  }

  return tubes;
}

const ColorSortPuzzle = ({ isPreview = false }: ColorSortPuzzleProps) => {
  const { theme } = useTheme();
  const [tubes, setTubes] = useState<Color[][]>([]);
  const [selectedTube, setSelectedTube] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [invalidMove, setInvalidMove] = useState<number | null>(null);
  const historyRef = useRef<Color[][][]>([]);

  const checkWin = useCallback((currentTubes: Color[][]) => {
    if (isSolvedState(currentTubes, MAX_BALLS_PER_TUBE)) setIsWon(true);
  }, []);

  const initializeGame = useCallback(() => {
    const emptyTubes = 1;
    const scrambleMoves = 100000 + Math.floor(Math.random() * 100000);

    const newTubes = generateSolvablePuzzle({
      colors: COLORS,
      numColors: NUM_COLORS,
      ballsPerColor: BALLS_PER_COLOR,
      maxPerTube: MAX_BALLS_PER_TUBE,
      emptyTubes,
      scrambleMoves,
    });

    setTubes(newTubes);
    setSelectedTube(null);
    setMoves(0);
    setIsWon(false);
    setInvalidMove(null);
    historyRef.current = [];
  }, []);

  useEffect(() => {
    if (!isPreview) {
      initializeGame();
      return;
    }

    const previewTubes: Color[][] = [
      [COLORS[0], COLORS[0], COLORS[0], COLORS[0]],
      [COLORS[1], COLORS[1], COLORS[1], COLORS[1]],
      [COLORS[2], COLORS[2], COLORS[2], COLORS[2]],
      [COLORS[3], COLORS[3], COLORS[3], COLORS[3]],
      [COLORS[4], COLORS[4], COLORS[4], COLORS[4]],
      [COLORS[5], COLORS[5], COLORS[5], COLORS[5]],
      [COLORS[6], COLORS[6], COLORS[6], COLORS[6]],
      [COLORS[7], COLORS[7], COLORS[7], COLORS[7]],
      [],
    ];
    setTubes(previewTubes);
  }, [isPreview, initializeGame]);

  const canPour = useCallback((fromTube: Color[], toTube: Color[]) => {
    return canPourMove(fromTube, toTube, MAX_BALLS_PER_TUBE);
  }, []);

  const calculateBallsToMove = useCallback((fromTube: Color[], toTube: Color[]) => {
    return ballsToMove(fromTube, toTube, MAX_BALLS_PER_TUBE);
  }, []);

  const handleTubeClick = useCallback(
    (index: number) => {
      if (isPreview || isWon) return;

      if (selectedTube === null) {
        if (tubes[index].length > 0) {
          setSelectedTube(index);
          setInvalidMove(null);
        }
        return;
      }

      if (selectedTube === index) {
        setSelectedTube(null);
        setInvalidMove(null);
        return;
      }

      const fromTube = tubes[selectedTube];
      const toTube = tubes[index];

      if (!canPour(fromTube, toTube)) {
        setInvalidMove(index);
        setTimeout(() => {
          setSelectedTube(null);
          setInvalidMove(null);
        }, 450);
        return;
      }

      const count = calculateBallsToMove(fromTube, toTube);
      if (count <= 0) {
        setInvalidMove(index);
        setTimeout(() => {
          setSelectedTube(null);
          setInvalidMove(null);
        }, 450);
        return;
      }

      setTubes(prev => {
        const prevSnapshot = prev.map(t => [...t]);
        historyRef.current = [...historyRef.current, prevSnapshot];

        const next = prev.map(t => [...t]);
        const move: Move = { from: selectedTube, to: index, count };
        const updated = applyMove(next, move);

        setTimeout(() => checkWin(updated), 80);
        return updated;
      });

      setSelectedTube(null);
      setInvalidMove(null);
      setMoves(m => m + 1);
    },
    [isPreview, isWon, selectedTube, tubes, canPour, calculateBallsToMove, checkWin]
  );

  const renderBall = useCallback((color: Color, ballIndex: number, tubeIndex: number) => {
    if (!color) return null;
    return (
      <div
        key={`tube-${tubeIndex}-ball-${ballIndex}-color-${color}`}
        className="color-sort-puzzle__ball"
        style={{
          backgroundColor: color,
          animationDelay: `${ballIndex * 0.05}s`,
        }}
      />
    );
  }, []);

  if (isPreview) {
    return (
      <div className={`color-sort-puzzle color-sort-puzzle--${theme} color-sort-puzzle--preview`}>
        <div className="color-sort-puzzle__tubes">
          {tubes.slice(0, 9).map((tube, index) => (
            <div key={index} className="color-sort-puzzle__tube">
              <div className="color-sort-puzzle__tube-content">
                {tube.map((ball, ballIndex) => renderBall(ball, ballIndex, index))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`color-sort-puzzle color-sort-puzzle--${theme}`}>
      <div className="color-sort-puzzle__header">
        <div className="color-sort-puzzle__header-left">
          <h3 className="color-sort-puzzle__title">Color Sort Puzzle</h3>
          <span className="color-sort-puzzle__game-tag">Puzzle Game</span>
        </div>
        <div className="color-sort-puzzle__stats">
          <div className="color-sort-puzzle__stat-item">
            <span className="color-sort-puzzle__stat-label">Moves</span>
            <span className="color-sort-puzzle__stat-value">{moves}</span>
          </div>
        </div>
      </div>

      <div className="color-sort-puzzle__instructions">
        <p>Click a tube to select it, then click another to pour. Sort all balls so each tube contains only one color!</p>
      </div>

      {isWon && (
        <div className="color-sort-puzzle__win-message">
          <h2>🎉 You Won!</h2>
          <p>Completed in {moves} moves</p>
          <button className="color-sort-puzzle__reset-btn" onClick={initializeGame}>
            Play Again
          </button>
        </div>
      )}

      <div className="color-sort-puzzle__tubes">
        {tubes.map((tube, index) => (
          <div
            key={index}
            className={`color-sort-puzzle__tube ${
              selectedTube === index ? 'color-sort-puzzle__tube--selected' : ''
            } ${invalidMove === index ? 'color-sort-puzzle__tube--invalid' : ''}`}
            onClick={() => handleTubeClick(index)}
          >
            <div className="color-sort-puzzle__tube-content">
              {tube.map((ball, ballIndex) => renderBall(ball, ballIndex, index))}
            </div>
          </div>
        ))}
      </div>

      <div className="color-sort-puzzle__controls">
        <button
          className="color-sort-puzzle__undo-btn"
          onClick={() => {
            if (historyRef.current.length === 0 || isWon) return;
            const prev = historyRef.current[historyRef.current.length - 1];
            historyRef.current = historyRef.current.slice(0, -1);
            setTubes(prev.map(t => [...t]));
            setSelectedTube(null);
            setInvalidMove(null);
            setMoves(m => Math.max(0, m - 1));
            setIsWon(false);
          }}
          disabled={historyRef.current.length === 0 || isWon}
        >
          Undo
        </button>
        <button className="color-sort-puzzle__reset-btn" onClick={initializeGame}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ColorSortPuzzle;
