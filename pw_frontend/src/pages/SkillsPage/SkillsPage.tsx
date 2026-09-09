import { useState, useEffect, useMemo } from 'react';
import useTheme from '../../hooks/useTheme';
import { skills, skillCategories } from '../../data/skills';
import { projects } from '../../data/projects';
import StarRating from '../../components/StarRating/StarRating';
import Footer from '../../components/Footer/Footer';
import './SkillsPage.scss';

const SkillsPage = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProficiency, setSelectedProficiency] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('skill-favorites');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch {
        return new Set(skills.filter(s => s.favorite).map(s => s.id));
      }
    }
    return new Set(skills.filter(s => s.favorite).map(s => s.id));
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        setAnimationsEnabled(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getProjectsForSkill = (skillName: string) => {
    return projects.filter(project =>
      project.techStack.some(tech =>
        tech.toLowerCase().includes(skillName.toLowerCase()) ||
        skillName.toLowerCase().includes(tech.toLowerCase())
      )
    );
  };

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      if (selectedCategory !== 'all' && skill.category !== selectedCategory) return false;
      if (showFavoritesOnly && !favorites.has(skill.id)) return false;
      if (selectedProficiency !== 'all') {
        const minRating = parseFloat(selectedProficiency);
        if (skill.rating < minRating) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedProficiency, showFavoritesOnly, favorites]);

  const handleCardClick = (skillId: string) => {
    setFlippedCard(prev => (prev === skillId ? null : skillId));
  };

  const handleKeyDown = (e: React.KeyboardEvent, skillId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(skillId);
    } else if (e.key === 'Escape' && flippedCard === skillId) {
      setFlippedCard(null);
    }
  };

  const toggleFavorite = (skillId: string, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(skillId)) {
      newFavorites.delete(skillId);
    } else {
      newFavorites.add(skillId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('skill-favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFlippedCard(null);
  };

  const handleProficiencyChange = (proficiency: string) => {
    setSelectedProficiency(proficiency);
    setFlippedCard(null);
  };

  const toggleFavorites = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    setFlippedCard(null);
  };

  const categoryLabel = (categoryId: string) =>
    skillCategories.find(c => c.id === categoryId)?.label ?? categoryId;

  const showAnimations = animationsEnabled && !reducedMotion;

  return (
    <div className={`skills-page skills-page--${theme}`}>
      <div className="skills-page__container">
        <header className="skills-page__header">
          <h1 className="skills-page__title">Skills & Expertise</h1>
          <p className="skills-page__subtitle">
            Interactive exploration of my technical capabilities
          </p>
        </header>

        <div className="skills-page__controls">
          <div className="skills-page__filters">
            <div className="skills-page__filter-group">
              <label htmlFor="category-filter" className="skills-page__filter-label">
                Category
              </label>
              <select
                id="category-filter"
                className="skills-page__filter-select"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                aria-label="Filter skills by category"
              >
                <option value="all">All Categories</option>
                {skillCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="skills-page__filter-group">
              <label htmlFor="proficiency-filter" className="skills-page__filter-label">
                Proficiency
              </label>
              <select
                id="proficiency-filter"
                className="skills-page__filter-select"
                value={selectedProficiency}
                onChange={(e) => handleProficiencyChange(e.target.value)}
                aria-label="Filter skills by proficiency level"
              >
                <option value="all">All Levels</option>
                <option value="4.5">Expert (4.5+)</option>
                <option value="4.0">Advanced (4.0+)</option>
                <option value="3.5">Intermediate (3.5+)</option>
                <option value="3.0">Beginner (3.0+)</option>
              </select>
            </div>
          </div>

          <div className="skills-page__toggle-group">
            <button
              type="button"
              className={`skills-page__toggle-button ${showFavoritesOnly ? 'skills-page__toggle-button--active' : ''}`}
              onClick={toggleFavorites}
              aria-label="Show only favorite skills"
              aria-pressed={showFavoritesOnly}
            >
              <span className="material-symbols-outlined">favorite</span>
              <span className="skills-page__toggle-button-text">Favorites</span>
            </button>

            <button
              type="button"
              className={`skills-page__toggle-button ${showAnimations ? 'skills-page__toggle-button--active' : ''}`}
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              disabled={reducedMotion}
              aria-label="Enable animations"
              aria-pressed={showAnimations}
            >
              <span className="material-symbols-outlined">animation</span>
              <span className="skills-page__toggle-button-text">Animations</span>
            </button>
          </div>
        </div>

        <div className="skills-page__grid" role="list" aria-label="Skills grid">
          {filteredSkills.map((skill) => {
            const isFlipped = flippedCard === skill.id;
            const isFavorite = favorites.has(skill.id);
            const relatedProjects = getProjectsForSkill(skill.name);

            return (
              <article
                key={skill.id}
                className={[
                  'skills-page__card',
                  isFlipped && 'skills-page__card--expanded',
                  isFavorite && 'skills-page__card--favorite',
                  showAnimations && 'skills-page__card--animated',
                ].filter(Boolean).join(' ')}
                role="listitem"
              >
                <div
                  className="skills-page__card-face"
                  role={!isFlipped ? 'button' : undefined}
                  tabIndex={!isFlipped ? 0 : undefined}
                  onClick={!isFlipped ? () => handleCardClick(skill.id) : undefined}
                  onKeyDown={!isFlipped ? (e) => handleKeyDown(e, skill.id) : undefined}
                  aria-label={!isFlipped ? `${skill.name}, rating ${skill.rating} out of 5. Click for details.` : undefined}
                  aria-expanded={isFlipped}
                >
                  <div className="skills-page__card-header">
                    <h3 className="skills-page__card-title" title={skill.name}>{skill.name}</h3>
                    {isFlipped ? (
                      <button
                        type="button"
                        className="skills-page__close-btn"
                        onClick={() => setFlippedCard(null)}
                        aria-label="Close details"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`skills-page__favorite-btn ${isFavorite ? 'skills-page__favorite-btn--active' : ''}`}
                        onClick={(e) => toggleFavorite(skill.id, e)}
                        aria-label={isFavorite ? `Remove ${skill.name} from favorites` : `Add ${skill.name} to favorites`}
                        aria-pressed={isFavorite}
                      >
                        <span className="material-symbols-outlined">
                          {isFavorite ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>
                    )}
                  </div>

                  <StarRating rating={skill.rating} size="sm" />

                  {!isFlipped && (
                    <>
                      <span className="skills-page__category-badge">
                        {categoryLabel(skill.category)}
                      </span>
                      <span className="skills-page__card-hint">
                        <span className="material-symbols-outlined" aria-hidden="true">touch_app</span>
                        Click for details
                      </span>
                    </>
                  )}

                  <div className={`skills-page__card-details ${isFlipped ? 'skills-page__card-details--open' : ''}`}>
                    <div className="skills-page__card-details-inner">
                      {skill.description && (
                        <p className="skills-page__card-description">{skill.description}</p>
                      )}

                      {relatedProjects.length > 0 && (
                        <div className="skills-page__card-projects">
                          <h4 className="skills-page__projects-title">Used in projects</h4>
                          <ul className="skills-page__projects-list">
                            {relatedProjects.slice(0, 4).map(project => (
                              <li key={project.id}>{project.title}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <button
                        type="button"
                        className="skills-page__back-btn"
                        onClick={() => setFlippedCard(null)}
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
                        Back to overview
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="skills-page__empty" role="status" aria-live="polite">
            <span className="material-symbols-outlined">search_off</span>
            <p>No skills match your current filters.</p>
            <button
              type="button"
              className="skills-page__reset-filters"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedProficiency('all');
                setShowFavoritesOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SkillsPage;
