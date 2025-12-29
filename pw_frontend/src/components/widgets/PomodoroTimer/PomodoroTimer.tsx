import { useState, useEffect, useRef } from 'react';
import useTheme from '../../../hooks/useTheme';
import './PomodoroTimer.scss';

interface PomodoroTimerProps {
  isPreview?: boolean;
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const PomodoroTimer = ({ isPreview = false }: PomodoroTimerProps) => {
  const { theme } = useTheme();
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playNotificationSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !isRunning) {
      if (mode === 'work') {
        const newCount = completedPomodoros + 1;
        setCompletedPomodoros(newCount);
        if (newCount % 4 === 0) {
          setMode('longBreak');
          setTimeLeft(LONG_BREAK_TIME);
        } else {
          setMode('shortBreak');
          setTimeLeft(SHORT_BREAK_TIME);
        }
      } else {
        setMode('work');
        setTimeLeft(WORK_TIME);
      }
    }
  }, [timeLeft, isRunning, mode, completedPomodoros]);

  const playNotificationSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch {
      void 0;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    const totalTime = mode === 'work' ? WORK_TIME : mode === 'shortBreak' ? SHORT_BREAK_TIME : LONG_BREAK_TIME;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setTimeLeft(WORK_TIME);
    } else if (mode === 'shortBreak') {
      setTimeLeft(SHORT_BREAK_TIME);
    } else {
      setTimeLeft(LONG_BREAK_TIME);
    }
  };

  const handleModeChange = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'work') {
      setTimeLeft(WORK_TIME);
    } else if (newMode === 'shortBreak') {
      setTimeLeft(SHORT_BREAK_TIME);
    } else {
      setTimeLeft(LONG_BREAK_TIME);
    }
  };

  const modeLabels = {
    work: 'Focus',
    shortBreak: 'Short Break',
    longBreak: 'Long Break',
  };

  if (isPreview) {
    return (
      <div className={`pomodoro-timer pomodoro-timer--${theme} pomodoro-timer--preview`}>
        <div className="pomodoro-timer__preview-content">
          <div className="pomodoro-timer__preview-circle">
            <div className="pomodoro-timer__preview-time">25:00</div>
          </div>
          <div className="pomodoro-timer__preview-label">Focus</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pomodoro-timer pomodoro-timer--${theme}`}>
      <div className="pomodoro-timer__header">
        <h3 className="pomodoro-timer__title">Pomodoro Timer</h3>
        <div className="pomodoro-timer__pomodoros">
          <span className="pomodoro-timer__pomodoros-label">Completed:</span>
          <span className="pomodoro-timer__pomodoros-count">{completedPomodoros}</span>
        </div>
      </div>

      <div className="pomodoro-timer__mode-selector">
        <button
          className={`pomodoro-timer__mode-btn ${mode === 'work' ? 'pomodoro-timer__mode-btn--active' : ''}`}
          onClick={() => handleModeChange('work')}
          disabled={isRunning}
        >
          Focus
        </button>
        <button
          className={`pomodoro-timer__mode-btn ${mode === 'shortBreak' ? 'pomodoro-timer__mode-btn--active' : ''}`}
          onClick={() => handleModeChange('shortBreak')}
          disabled={isRunning}
        >
          Short Break
        </button>
        <button
          className={`pomodoro-timer__mode-btn ${mode === 'longBreak' ? 'pomodoro-timer__mode-btn--active' : ''}`}
          onClick={() => handleModeChange('longBreak')}
          disabled={isRunning}
        >
          Long Break
        </button>
      </div>

      <div className="pomodoro-timer__display">
        <div className="pomodoro-timer__circle">
          <svg className="pomodoro-timer__svg" viewBox="0 0 200 200">
            <circle
              className="pomodoro-timer__circle-bg"
              cx="100"
              cy="100"
              r="90"
              fill="none"
            />
            <circle
              className="pomodoro-timer__circle-progress"
              cx="100"
              cy="100"
              r="90"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - getProgress() / 100)}`}
            />
          </svg>
          <div className="pomodoro-timer__time">{formatTime(timeLeft)}</div>
          <div className="pomodoro-timer__mode-label">{modeLabels[mode]}</div>
        </div>
      </div>

      <div className="pomodoro-timer__controls">
        <button
          className="pomodoro-timer__btn pomodoro-timer__btn--primary"
          onClick={handleStartPause}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="pomodoro-timer__btn pomodoro-timer__btn--secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;

