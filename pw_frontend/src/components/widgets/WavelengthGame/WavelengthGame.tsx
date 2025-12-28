import { useCallback, useEffect, useRef, useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import { categoryPairs, CategoryPair } from './categoryPairs';
import './WavelengthGame.scss';

type Team = 'A' | 'B';
type GameState = 'setup' | 'reveal-target' | 'guessing' | 'reveal-score';

const WavelengthGame = () => {
  const { theme } = useTheme();
  const [gameState, setGameState] = useState<GameState>('setup');
  const [currentPair, setCurrentPair] = useState<CategoryPair | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [targetAngle, setTargetAngle] = useState(0);
  const [needleAngle, setNeedleAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [canMoveNeedle, setCanMoveNeedle] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [teamScores, setTeamScores] = useState({ A: 0, B: 0 });
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const needleContainerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const startNewRound = useCallback(() => {
    const randomPair = categoryPairs[Math.floor(Math.random() * categoryPairs.length)];
    const shouldFlip = Math.random() < 0.5;
    setCurrentPair(randomPair);
    setFlipped(shouldFlip);
    setTargetAngle(Math.random() * 180 - 90); // -90 to 90 degrees
    setNeedleAngle(0);
    setCanMoveNeedle(false);
    setRoundScore(0);
    setGameState('reveal-target');
  }, []);

  const handleStartGame = useCallback(() => {
    startNewRound();
  }, [startNewRound]);

  const handleRevealTarget = useCallback(() => {
    setGameState('guessing');
    setCanMoveNeedle(true);
  }, []);

  const handleNeedleStart = useCallback((e: React.PointerEvent) => {
    if (!canMoveNeedle) return;
    setIsDragging(true);
    e.preventDefault();
  }, [canMoveNeedle]);

  const handleNeedleMove = useCallback((e: PointerEvent) => {
    if (!isDragging || !canMoveNeedle || !needleContainerRef.current) return;
    e.preventDefault();
    
    const rect = needleContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.bottom;
    
    const dx = e.clientX - centerX;
    const dy = centerY - e.clientY;
    const angle = (Math.atan2(dx, dy) * 180) / Math.PI;
    
    const clampedAngle = Math.max(-90, Math.min(90, angle));
    setNeedleAngle(clampedAngle);
  }, [isDragging, canMoveNeedle]);

  const handleNeedleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handleNeedleMove);
      window.addEventListener('pointerup', handleNeedleEnd);
      return () => {
        window.removeEventListener('pointermove', handleNeedleMove);
        window.removeEventListener('pointerup', handleNeedleEnd);
      };
    }
  }, [isDragging, handleNeedleMove, handleNeedleEnd]);

  const calculateScore = useCallback((angle: number) => {
    const diff = Math.abs(angle - targetAngle);
    if (diff <= 4.5) return 4;
    if (diff <= 13.5) return 3;
    if (diff <= 22.5) return 2;
    return 0;
  }, [targetAngle]);

  const getTargetGradient = useCallback(() => {
    const normalizedAngle = targetAngle + 90;
    
    const start1 = Math.max(0, normalizedAngle - 22.5);
    const start2 = Math.max(0, normalizedAngle - 13.5);
    const start3 = Math.max(0, normalizedAngle - 4.5);
    const end1 = Math.min(180, normalizedAngle + 4.5);
    const end2 = Math.min(180, normalizedAngle + 13.5);
    const end3 = Math.min(180, normalizedAngle + 22.5);
    
    return `conic-gradient(
      from -90deg at 50% 100%,
      rgba(203, 213, 225, 0.8) 0deg ${start1}deg,
      rgba(96, 165, 250, 0.7) ${start1}deg ${start2}deg,
      rgba(59, 130, 246, 0.7) ${start2}deg ${start3}deg,
      rgba(0, 0, 128, 0.8) ${start3}deg ${end1}deg,
      rgba(59, 130, 246, 0.7) ${end1}deg ${end2}deg,
      rgba(96, 165, 250, 0.7) ${end2}deg ${end3}deg,
      rgba(203, 213, 225, 0.8) ${end3}deg 180deg
    )`;
  }, [targetAngle]);

  const handleRevealScore = useCallback(() => {
    const score = calculateScore(needleAngle);
    setRoundScore(score);
    const teams: Team[] = ['A', 'B'];
    const currentTeam = teams[currentTeamIndex];
    setTeamScores(prev => ({
      ...prev,
      [currentTeam]: prev[currentTeam] + score
    }));
    setGameState('reveal-score');
    setCanMoveNeedle(false);
  }, [calculateScore, needleAngle, currentTeamIndex]);

  const handleNextRound = useCallback(() => {
    setCurrentTeamIndex(prev => (prev + 1) % 2);
    startNewRound();
  }, [startNewRound]);

  const handleResetGame = useCallback(() => {
    setTeamScores({ A: 0, B: 0 });
    setCurrentTeamIndex(0);
    setGameState('setup');
  }, []);

  const leftLabel = currentPair ? (flipped ? currentPair.right : currentPair.left) : '';
  const rightLabel = currentPair ? (flipped ? currentPair.left : currentPair.right) : '';

  return (
    <div className={`wavelength wavelength--${theme}`}>
      <div className="wavelength__header">
        <h1 className="wavelength__title">WAVELENGTH</h1>
        <div className="wavelength__scores">
          <div className="wavelength__score">
            <span className="wavelength__score-label">Team A</span>
            <span className="wavelength__score-value">{teamScores.A}</span>
          </div>
          <div className="wavelength__score">
            <span className="wavelength__score-label">Team B</span>
            <span className="wavelength__score-value">{teamScores.B}</span>
          </div>
        </div>
      </div>

      {gameState === 'setup' && (
        <div className="wavelength__setup">
          <p className="wavelength__setup-text">Ready to play Wavelength?</p>
          <button className="wavelength__btn wavelength__btn--primary" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      )}

      {(gameState === 'reveal-target' || gameState === 'guessing' || gameState === 'reveal-score') && currentPair && (
        <>
          <div className="wavelength__board-container">
            <div 
              className="wavelength__board"
              ref={boardRef}
            >
              <div 
                className="wavelength__target-area"
                style={{
                  display: gameState === 'reveal-target' || gameState === 'reveal-score' ? 'block' : 'none',
                  background: getTargetGradient()
                }}
              />
              <div 
                className="wavelength__needle-container"
                ref={needleContainerRef}
                onPointerDown={handleNeedleStart}
              >
                <div 
                  className="wavelength__needle"
                  style={{
                    display: gameState === 'guessing' || gameState === 'reveal-score' ? 'block' : 'none',
                    transform: `rotate(${needleAngle}deg)`
                  }}
                />
              </div>
            </div>
            <div className="wavelength__clues-container">
              <div className="wavelength__clue wavelength__clue--left">{leftLabel}</div>
              <div className="wavelength__bidirectional-arrow"></div>
              <div className="wavelength__clue wavelength__clue--right">{rightLabel}</div>
            </div>
          </div>

          <div className="wavelength__controls">
            {gameState === 'reveal-target' && (
              <button
                className="wavelength__btn wavelength__btn--primary"
                onClick={handleRevealTarget}
              >
                Hide Target / Ready
              </button>
            )}
            {gameState === 'guessing' && (
              <button
                className="wavelength__btn wavelength__btn--primary"
                onClick={handleRevealScore}
              >
                Reveal Target
              </button>
            )}
            {gameState === 'reveal-score' && (
              <>
                <div className="wavelength__reveal-score">
                  <div className="wavelength__reveal-score-value">{roundScore} points!</div>
                  <div className="wavelength__reveal-score-label">
                    Team {['A', 'B'][currentTeamIndex]} earned {roundScore} points
                  </div>
                </div>
                <button
                  className="wavelength__btn wavelength__btn--primary"
                  onClick={handleNextRound}
                >
                  Next Round
                </button>
              </>
            )}
            <button
              className="wavelength__btn wavelength__btn--reset"
              onClick={handleResetGame}
            >
              New Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WavelengthGame;
