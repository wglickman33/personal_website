import { useMemo } from 'react';
import useTheme from '../../../hooks/useTheme';
import { Challenge } from './types/capitalVentureTypes';
import './Challenges.scss';

interface ChallengesProps {
  challenges: Challenge[];
  onClose: () => void;
}

const Challenges = ({ challenges, onClose }: ChallengesProps) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!challenges || challenges.length === 0) return null;

  const completedCount = useMemo(() => 
    challenges.filter(c => c.completed).length,
    [challenges]
  );

  const challengesByType = useMemo(() => {
    const scaling = challenges.filter(c => c.type === 'scaling');
    const saving = challenges.filter(c => c.type === 'saving');
    const progress = challenges.filter(c => c.type === 'progress');
    return { scaling, saving, progress };
  }, [challenges]);

  const formatProgress = (challenge: Challenge): string => {
    if (challenge.completed) return '100%';
    const percent = Math.min(100, Math.round((challenge.progress / challenge.target) * 100));
    return `${percent}%`;
  };

  const formatTarget = (challenge: Challenge): string => {
    if (challenge.id.includes('million') || challenge.id.includes('billion') || challenge.id.includes('trillion')) {
      return challenge.target.toLocaleString();
    }
    if (challenge.id === 'persistent_player' || challenge.id === 'auto_clicker_pro') {
      const minutes = Math.floor(challenge.target / 60000);
      return `${minutes} min`;
    }
    return challenge.target.toString();
  };

  return (
    <div className={`challenges challenges--${theme}`}>
      <div className="challenges__overlay" onClick={onClose} />
      <div className="challenges__content">
        <div className="challenges__header">
          <h2 className="challenges__title">Challenges</h2>
          <button
            className="challenges__close-btn"
            onClick={onClose}
            type="button"
            aria-label="Close challenges"
            autoFocus
          >
            <span className="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>

        <div className="challenges__summary">
          <div className="challenges__summary-stat">
            <span className="challenges__summary-label">Completed</span>
            <span className="challenges__summary-value">
              {completedCount} / {challenges.length}
            </span>
          </div>
        </div>

        <div className="challenges__sections">
          <div className="challenges__section">
            <h3 className="challenges__section-title">
              <span className="material-symbols-outlined">trending_up</span>
              Scaling Challenges
            </h3>
            <div className="challenges__list">
              {challengesByType.scaling.map(challenge => (
                <div
                  key={challenge.id}
                  className={`challenges__item ${
                    challenge.completed ? 'challenges__item--completed' : ''
                  }`}
                >
                  <div className="challenges__item-header">
                    <span className="challenges__item-name">{challenge.name}</span>
                    {challenge.completed && (
                      <span className="material-symbols-outlined challenges__item-check">check_circle</span>
                    )}
                  </div>
                  <p className="challenges__item-description">{challenge.description}</p>
                  <div className="challenges__item-progress">
                    <div className="challenges__progress-bar">
                      <div
                        className="challenges__progress-fill"
                        style={{ width: formatProgress(challenge) }}
                      />
                    </div>
                    <span className="challenges__progress-text">
                      {formatProgress(challenge)} ({challenge.progress.toLocaleString()} / {formatTarget(challenge)})
                    </span>
                  </div>
                  {challenge.reward && challenge.completed && (
                    <div className="challenges__item-reward">
                      <span className="material-symbols-outlined">stars</span>
                      {challenge.reward}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="challenges__section">
            <h3 className="challenges__section-title">
              <span className="material-symbols-outlined">save</span>
              Saving Challenges
            </h3>
            <div className="challenges__list">
              {challengesByType.saving.map(challenge => (
                <div
                  key={challenge.id}
                  className={`challenges__item ${
                    challenge.completed ? 'challenges__item--completed' : ''
                  }`}
                >
                  <div className="challenges__item-header">
                    <span className="challenges__item-name">{challenge.name}</span>
                    {challenge.completed && (
                      <span className="material-symbols-outlined challenges__item-check">check_circle</span>
                    )}
                  </div>
                  <p className="challenges__item-description">{challenge.description}</p>
                  <div className="challenges__item-progress">
                    <div className="challenges__progress-bar">
                      <div
                        className="challenges__progress-fill"
                        style={{ width: formatProgress(challenge) }}
                      />
                    </div>
                    <span className="challenges__progress-text">
                      {formatProgress(challenge)} ({challenge.progress.toLocaleString()} / {formatTarget(challenge)})
                    </span>
                  </div>
                  {challenge.reward && challenge.completed && (
                    <div className="challenges__item-reward">
                      <span className="material-symbols-outlined">stars</span>
                      {challenge.reward}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="challenges__section">
            <h3 className="challenges__section-title">
              <span className="material-symbols-outlined">flag</span>
              Progress Challenges
            </h3>
            <div className="challenges__list">
              {challengesByType.progress.map(challenge => (
                <div
                  key={challenge.id}
                  className={`challenges__item ${
                    challenge.completed ? 'challenges__item--completed' : ''
                  }`}
                >
                  <div className="challenges__item-header">
                    <span className="challenges__item-name">{challenge.name}</span>
                    {challenge.completed && (
                      <span className="material-symbols-outlined challenges__item-check">check_circle</span>
                    )}
                  </div>
                  <p className="challenges__item-description">{challenge.description}</p>
                  <div className="challenges__item-progress">
                    <div className="challenges__progress-bar">
                      <div
                        className="challenges__progress-fill"
                        style={{ width: formatProgress(challenge) }}
                      />
                    </div>
                    <span className="challenges__progress-text">
                      {formatProgress(challenge)} ({challenge.progress.toLocaleString()} / {formatTarget(challenge)})
                    </span>
                  </div>
                  {challenge.reward && challenge.completed && (
                    <div className="challenges__item-reward">
                      <span className="material-symbols-outlined">stars</span>
                      {challenge.reward}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;

