import { useState, useEffect, useRef, useMemo } from 'react';
import useTheme from '../../hooks/useTheme';
import { skills, skillCategories } from '../../data/skills';
import { projects } from '../../data/projects';
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
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
    if (flippedCard === skillId) {
      setFlippedCard(null);
    } else {
      setFlippedCard(skillId);
    }
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="skills-page__star skills-page__star--full" aria-hidden="true">
          <span className="material-symbols-outlined">star</span>
        </span>
      );
    }

    if (hasHalfStar && fullStars < 5) {
      stars.push(
        <span key="half" className="skills-page__star skills-page__star--half" aria-hidden="true">
          <span className="material-symbols-outlined">star_half</span>
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="skills-page__star skills-page__star--empty" aria-hidden="true">
          <span className="material-symbols-outlined">star</span>
        </span>
      );
    }

    return stars;
  };

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
              className={`skills-page__toggle-button ${animationsEnabled && !reducedMotion ? 'skills-page__toggle-button--active' : ''}`}
              onClick={() => setAnimationsEnabled(!animationsEnabled)}
              disabled={reducedMotion}
              aria-label="Enable animations"
              aria-pressed={animationsEnabled && !reducedMotion}
            >
              <span className="material-symbols-outlined">animation</span>
              <span className="skills-page__toggle-button-text">
                {reducedMotion ? 'Animations' : 'Animations'}
              </span>
            </button>
          </div>
        </div>

        <div 
          className={`skills-page__grid ${animationsEnabled && !reducedMotion ? 'skills-page__grid--animated' : ''}`}
          role="grid"
          aria-label="Skills grid"
        >
          {filteredSkills.map((skill) => {
            const isFlipped = flippedCard === skill.id;
            const relatedProjects = getProjectsForSkill(skill.name);
            
            return (
                <div
                  key={skill.id}
                  ref={(el) => (cardRefs.current[skill.id] = el)}
                  className={`skills-page__card ${isFlipped ? 'skills-page__card--flipped' : ''} ${favorites.has(skill.id) ? 'skills-page__card--favorite' : ''}`}
                  role="gridcell"
                  tabIndex={0}
                  onClick={() => handleCardClick(skill.id)}
                  onKeyDown={(e) => handleKeyDown(e, skill.id)}
                  aria-label={`${skill.name} skill card, rating ${skill.rating} out of 5. ${isFlipped ? 'Showing details' : 'Click to view details'}`}
                >
                  <div className="skills-page__card-inner">
                    <div className="skills-page__card-front">
                      <button
                        className={`skills-page__favorite-icon ${favorites.has(skill.id) ? 'skills-page__favorite-icon--active' : ''}`}
                        onClick={(e) => toggleFavorite(skill.id, e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleFavorite(skill.id, e);
                          }
                        }}
                        aria-label={favorites.has(skill.id) ? `Remove ${skill.name} from favorites` : `Add ${skill.name} to favorites`}
                        aria-pressed={favorites.has(skill.id)}
                        tabIndex={0}
                      >
                        <span className="material-symbols-outlined">
                          {favorites.has(skill.id) ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>
                    <h3 className="skills-page__card-title">{skill.name}</h3>
                    <div className="skills-page__card-rating" aria-label={`Rating: ${skill.rating} out of 5 stars`}>
                      {renderStars(skill.rating)}
                      <span className="skills-page__rating-value">{skill.rating.toFixed(1)}</span>
                    </div>
                    <div className="skills-page__card-category">
                      <span className="skills-page__category-badge">{skillCategories.find(c => c.id === skill.category)?.label}</span>
                    </div>
                    <div className="skills-page__card-hint">
                      <span className="material-symbols-outlined">touch_app</span>
                      Click for details
                    </div>
                  </div>

                  <div className="skills-page__card-back">
                    <button
                      className="skills-page__card-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlippedCard(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setFlippedCard(null);
                        }
                      }}
                      aria-label="Close card details"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    <h3 className="skills-page__card-title">{skill.name}</h3>
                    {skill.description && (
                      <p className="skills-page__card-description">{skill.description}</p>
                    )}
                    <div className="skills-page__card-rating" aria-label={`Rating: ${skill.rating} out of 5 stars`}>
                      {renderStars(skill.rating)}
                      <span className="skills-page__rating-value">{skill.rating.toFixed(1)}/5.0</span>
                    </div>
                    {relatedProjects.length > 0 && (
                      <div className="skills-page__card-projects">
                        <h4 className="skills-page__projects-title">Used in Projects:</h4>
                        <ul className="skills-page__projects-list">
                          {relatedProjects.slice(0, 3).map(project => (
                            <li key={project.id}>{project.title}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="skills-page__empty" role="status" aria-live="polite">
            <span className="material-symbols-outlined">search_off</span>
            <p>No skills match your current filters.</p>
            <button
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
