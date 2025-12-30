import { useCallback, useEffect, useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import { WORDS } from './wordleWords';
import './Wordle.scss';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;
const STORAGE_KEY_STATS = 'pw:wordle:stats';

type LetterState = 'correct' | 'present' | 'absent' | 'empty';

type Guess = {
  word: string;
  states: LetterState[];
};

type Stats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
};

const getDailyWord = (date: Date): string => {
  const dateStr = date.toDateString();
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed) + dateStr.charCodeAt(i);
    seed = seed & seed;
  }
  const index = Math.abs(seed) % WORDS.length;
  return WORDS[index];
};

const getRandomWord = (): string => {
  const index = Math.floor(Math.random() * WORDS.length);
  return WORDS[index];
};

const Wordle = () => {
  const { theme } = useTheme();
  const [targetWord, setTargetWord] = useState(() => {
    const stored = localStorage.getItem('pw:wordle:word');
    const storedDate = localStorage.getItem('pw:wordle:date');
    const today = new Date().toDateString();
    
    if (stored && storedDate === today) {
      return stored;
    }
    
    const word = getDailyWord(new Date());
    localStorage.setItem('pw:wordle:word', word);
    localStorage.setItem('pw:wordle:date', today);
    return word;
  });
  
  const [currentGuess, setCurrentGuess] = useState('');
  const [invalidWord, setInvalidWord] = useState(false);
  const [guesses, setGuesses] = useState<Guess[]>(() => {
    const storedGuesses = localStorage.getItem('pw:wordle:guesses');
    const storedDate = localStorage.getItem('pw:wordle:date');
    const today = new Date().toDateString();
    
    if (storedGuesses && storedDate === today) {
      try {
        return JSON.parse(storedGuesses);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>(() => {
    const storedState = localStorage.getItem('pw:wordle:state');
    const storedDate = localStorage.getItem('pw:wordle:date');
    const today = new Date().toDateString();
    
    if (storedState && storedDate === today) {
      return storedState as 'playing' | 'won' | 'lost';
    }
    return 'playing';
  });
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({});
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<Stats>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_STATS);
    const lastPlayedDate = localStorage.getItem('pw:wordle:lastPlayedDate');
    const today = new Date().toDateString();
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (lastPlayedDate !== today && lastPlayedDate) {
          const lastState = localStorage.getItem('pw:wordle:state');
          if (lastState === 'lost') {
            parsed.currentStreak = 0;
          }
        }
        return parsed;
      } catch {
        return { gamesPlayed: 0, gamesWon: 0, currentStreak: 0, maxStreak: 0, guessDistribution: [0, 0, 0, 0, 0, 0] };
      }
    }
    return { gamesPlayed: 0, gamesWon: 0, currentStreak: 0, maxStreak: 0, guessDistribution: [0, 0, 0, 0, 0, 0] };
  });

  const checkGuess = useCallback((guess: string): LetterState[] => {
    const states: LetterState[] = Array(WORD_LENGTH).fill('absent');
    const targetLetters = targetWord.split('');
    const guessLetters = guess.split('');
    const used = Array(WORD_LENGTH).fill(false);

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        states[i] = 'correct';
        used[i] = true;
      }
    }

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (states[i] === 'correct') continue;
      for (let j = 0; j < WORD_LENGTH; j++) {
        if (!used[j] && guessLetters[i] === targetLetters[j]) {
          states[i] = 'present';
          used[j] = true;
          break;
        }
      }
    }

    return states;
  }, [targetWord]);

  const updateLetterStates = useCallback((guess: string, states: LetterState[]) => {
    const newStates = { ...letterStates };
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const state = states[i];
      if (!newStates[letter] || (state === 'correct') || (state === 'present' && newStates[letter] === 'absent')) {
        newStates[letter] = state;
      }
    }
    setLetterStates(newStates);
  }, [letterStates]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) return;
    if (!WORDS.includes(currentGuess)) {
      setInvalidWord(true);
      setTimeout(() => setInvalidWord(false), 600);
      return;
    }

    const guessWord = currentGuess;
    const states = checkGuess(guessWord);
    const newGuess: Guess = { word: guessWord, states };
    const newGuesses = guesses.length + 1;
    
    setGuesses(prev => [...prev, newGuess]);
    setCurrentGuess('');
    updateLetterStates(guessWord, states);
    
    const gameId = `${targetWord}-${guesses.length}`;
    const countedGames = localStorage.getItem('pw:wordle:countedGames');
    const countedSet = countedGames ? new Set(JSON.parse(countedGames)) : new Set();
    
    const updatedGuesses = [...guesses, newGuess];
    localStorage.setItem('pw:wordle:guesses', JSON.stringify(updatedGuesses));
    
    if (guessWord === targetWord) {
      setTimeout(() => {
        setGameState('won');
        const hasBeenCounted = countedSet.has(gameId);
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + (hasBeenCounted ? 0 : 1),
          gamesWon: stats.gamesWon + (hasBeenCounted ? 0 : 1),
          currentStreak: hasBeenCounted ? stats.currentStreak : stats.currentStreak + 1,
          maxStreak: hasBeenCounted ? stats.maxStreak : Math.max(stats.maxStreak, stats.currentStreak + 1),
          guessDistribution: hasBeenCounted ? stats.guessDistribution : stats.guessDistribution.map((count, idx) => 
            idx === newGuesses - 1 ? count + 1 : count
          ),
        };
        setStats(newStats);
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
        localStorage.setItem('pw:wordle:state', 'won');
        if (!hasBeenCounted) {
          countedSet.add(gameId);
          localStorage.setItem('pw:wordle:countedGames', JSON.stringify(Array.from(countedSet)));
        }
        setTimeout(() => setShowStats(true), 1500);
      }, WORD_LENGTH * 300 + 300);
    } else if (newGuesses >= MAX_GUESSES) {
      setTimeout(() => {
        setGameState('lost');
        const hasBeenCounted = countedSet.has(gameId);
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + (hasBeenCounted ? 0 : 1),
          currentStreak: hasBeenCounted ? stats.currentStreak : 0,
        };
        setStats(newStats);
        localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
        localStorage.setItem('pw:wordle:state', 'lost');
        if (!hasBeenCounted) {
          countedSet.add(gameId);
          localStorage.setItem('pw:wordle:countedGames', JSON.stringify(Array.from(countedSet)));
        }
        setTimeout(() => setShowStats(true), 1500);
      }, WORD_LENGTH * 300 + 300);
    }
  }, [currentGuess, targetWord, guesses, checkGuess, updateLetterStates, stats]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing') return;
    
    if (key === 'Enter') {
      submitGuess();
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && /[A-Za-z]/.test(key)) {
      setCurrentGuess(prev => {
        if (prev.length < WORD_LENGTH) {
          return prev + key.toUpperCase();
        }
        return prev;
      });
    }
  }, [gameState, submitGuess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        handleKeyPress('Enter');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        e.stopPropagation();
        handleKeyPress('Backspace');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, gameState]);


  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];

  const resetGame = useCallback(() => {
    const word = getRandomWord();
    const today = new Date().toDateString();
    
    localStorage.setItem('pw:wordle:word', word);
    localStorage.setItem('pw:wordle:date', today);
    localStorage.removeItem('pw:wordle:guesses');
    localStorage.removeItem('pw:wordle:state');
    
    setTargetWord(word);
    setCurrentGuess('');
    setGuesses([]);
    setGameState('playing');
    setLetterStates({});
    setShowStats(false);
  }, []);

  const resetStats = useCallback(() => {
    const newStats = { gamesPlayed: 0, gamesWon: 0, currentStreak: 0, maxStreak: 0, guessDistribution: [0, 0, 0, 0, 0, 0] };
    setStats(newStats);
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(newStats));
  }, []);

  const maxDistribution = Math.max(...stats.guessDistribution, 1);

  return (
    <div className={`wordle wordle--${theme}`}>
      <div className="wordle__header">
        <h1 className="wordle__title">WORDLE</h1>
        <div className="wordle__header-actions">
          <button 
            className="wordle__btn wordle__btn--stats" 
            onClick={() => setShowStats(true)} 
            title="Statistics"
          >
            <span className="material-symbols-outlined">bar_chart</span>
          </button>
          <button className="wordle__btn wordle__btn--reset" onClick={resetGame} title="New Game">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </div>

      <div className={`wordle__board ${invalidWord ? 'wordle__board--shake' : ''}`}>
        {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
          const guess = guesses[rowIndex];
          const isCurrentRow = rowIndex === guesses.length;
          const isRevealed = guess !== undefined;
          
          return (
            <div key={rowIndex} className="wordle__row">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const letter = isCurrentRow 
                  ? currentGuess[colIndex] || ''
                  : guess?.word[colIndex] || '';
                const state = guess?.states[colIndex] || 'empty';
                
                return (
                  <div
                    key={colIndex}
                    className={`wordle__cell wordle__cell--${state} ${isRevealed ? 'wordle__cell--revealed' : ''}`}
                    style={isRevealed ? { animationDelay: `${colIndex * 300}ms` } : undefined}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="wordle__keyboard">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="wordle__keyboard-row">
            {row.map((key) => {
              const isSpecial = key === 'Enter' || key === 'Backspace';
              const letterState = letterStates[key] || 'empty';
              
              return (
                <button
                  key={key}
                  className={`wordle__key ${isSpecial ? 'wordle__key--special' : ''} wordle__key--${letterState}`}
                  onClick={() => handleKeyPress(key)}
                >
                  {key === 'Backspace' ? '⌫' : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {showStats && (
        <div className="wordle__overlay" onClick={() => setShowStats(false)}>
          <div className="wordle__stats-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wordle__stats-header">
              <h2 className="wordle__stats-title">Statistics</h2>
              <button className="wordle__stats-close" onClick={() => setShowStats(false)}>×</button>
            </div>
            
            <div className="wordle__stats-grid">
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.gamesPlayed}</div>
                <div className="wordle__stat-label">Played</div>
              </div>
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.gamesWon > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}%</div>
                <div className="wordle__stat-label">Win %</div>
              </div>
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.currentStreak}</div>
                <div className="wordle__stat-label">Current Streak</div>
              </div>
              <div className="wordle__stat-item">
                <div className="wordle__stat-value">{stats.maxStreak}</div>
                <div className="wordle__stat-label">Max Streak</div>
              </div>
            </div>

            <div className="wordle__distribution">
              <div className="wordle__distribution-title">Guess Distribution</div>
              {stats.guessDistribution.map((count, idx) => (
                <div key={idx} className="wordle__distribution-row">
                  <div className="wordle__distribution-label">{idx + 1}</div>
                  <div className="wordle__distribution-bar">
                    <div 
                      className="wordle__distribution-fill" 
                      style={{ width: `${(count / maxDistribution) * 100}%` }}
                    >
                      {count > 0 && <span className="wordle__distribution-count">{count}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="wordle__stats-actions">
              <button className="wordle__btn wordle__btn--reset-stats" onClick={resetStats}>
                Reset Stats
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'won' && !showStats && (
        <div className="wordle__result wordle__result--won">
          <div className="wordle__result-title">Splendid!</div>
          <div className="wordle__result-subtitle">You got it in {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}!</div>
        </div>
      )}

      {gameState === 'lost' && !showStats && (
        <div className="wordle__result wordle__result--lost">
          <div className="wordle__result-title">Better luck next time!</div>
          <div className="wordle__result-subtitle">The word was: <strong>{targetWord}</strong></div>
        </div>
      )}
    </div>
  );
};

export default Wordle;
