import { useMemo, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { projectsPageProjects, Project } from '../../data/projects';
import Footer from '../../components/Footer/Footer';
import ProjectCaseStudyModal from '../../components/ProjectCaseStudyModal/ProjectCaseStudyModal';
import whiteMKDIcon from '../../assets/styles/logos/whiteMKDIcon.png';
import bgworkspaceLogo from '../../assets/styles/logos/bgworkspaceLogo.png';
import toriLogo from '../../assets/styles/logos/toriLogo.png';
import './ProjectsPage.scss';

type ProjectCategory = 'all' | 'web' | 'widget' | 'game';

const ProjectsPage = () => {
  const { theme } = useTheme();
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const handleImageNavigation = (projectId: string, direction: 'prev' | 'next') => {
    const project = projectsPageProjects.find((p) => p.id === projectId);
    if (!project || !project.images || project.images.length === 0) return;

    const currentIndex = activeImageIndex[projectId] || 0;
    const maxIndex = project.images.length - 1;

    if (direction === 'next') {
      setActiveImageIndex((prev) => ({
        ...prev,
        [projectId]: currentIndex >= maxIndex ? 0 : currentIndex + 1,
      }));
    } else {
      setActiveImageIndex((prev) => ({
        ...prev,
        [projectId]: currentIndex <= 0 ? maxIndex : currentIndex - 1,
      }));
    }
  };

  const handleImageSelect = (projectId: string, index: number) => {
    setActiveImageIndex((prev) => ({
      ...prev,
      [projectId]: index,
    }));
  };

  const filteredProjects = activeCategory === 'all' 
    ? projectsPageProjects 
    : projectsPageProjects.filter((p) => p.category === activeCategory);

  const activeProject = useMemo(
    () => (activeProjectId ? projectsPageProjects.find((p) => p.id === activeProjectId) ?? null : null),
    [activeProjectId]
  );

  const closeModal = () => setActiveProjectId(null);

  const renderProject = (project: Project, isWidget: boolean = false) => {
    const isFeatured = project.id === 'my-kosher-delivery';
    const hasImages = project.images && project.images.length > 0;
    const isGame = project.category === 'game';
    const isInteractive = isWidget || isGame;

  return (
      <div
        key={project.id}
        className={`projects-portfolio__card ${isFeatured ? 'projects-portfolio__card--featured' : ''}`}
        onClick={() => setActiveProjectId(project.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setActiveProjectId(project.id);
        }}
        aria-label={`Open details for ${project.title}`}
          >
        <div className="projects-portfolio__media">
          
          {!hasImages && isInteractive && (project.widgetCode || project.widgetComponent) && project.id === 'afk-clock-screen' && (
            <div className="projects-portfolio__card-widget-preview">
              {project.widgetComponent && (() => {
                const WidgetComponent = project.widgetComponent!;
                const AFKClockComponent = WidgetComponent as React.ComponentType<{ isPreview?: boolean }>;
                return <AFKClockComponent isPreview={true} />;
              })()}
            </div>
          )}
          
          {!hasImages && project.id === '2048-game' && (
            <div className="projects-portfolio__card-2048-preview">
              <div className="projects-portfolio__card-2048-grid" aria-hidden="true">
                {[
                  2, 4, 8, 16,
                  0, 64, 128, 0,
                  0, 256, 512, 0,
                  0, 0, 1024, 2048,
                ].map((v, i) => (
                  <div
                    key={i}
                    className={[
                      'projects-portfolio__card-2048-cell',
                      v ? `projects-portfolio__card-2048-cell--v${v}` : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {v ? <span>{v}</span> : null}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!hasImages && project.id === 'wordle' && (
            <div className="projects-portfolio__card-wordle-preview">
              <div className="projects-portfolio__card-wordle-board" aria-hidden="true">
                {[
                  { letters: ['N', 'E', 'U', 'R', 'O'], states: ['absent', 'present', 'absent', 'present', 'present'] },
                  { letters: ['B', 'U', 'I', 'L', 'D'], states: ['absent', 'absent', 'absent', 'absent', 'present'] },
                  { letters: ['D', 'R', 'E', 'A', 'M'], states: ['present', 'present', 'present', 'absent', 'absent'] },
                  { letters: ['C', 'O', 'D', 'E', 'R'], states: ['correct', 'correct', 'correct', 'correct', 'correct'] },
                ].map((row, rowIndex) => (
                  <div key={rowIndex} className="projects-portfolio__card-wordle-row">
                    {row.letters.map((letter, colIndex) => (
                      <div
                        key={colIndex}
                        className={`projects-portfolio__card-wordle-cell projects-portfolio__card-wordle-cell--${row.states[colIndex]}`}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!hasImages && project.id === 'wavelength' && (
            <div className="projects-portfolio__card-wavelength-preview">
              <div className="projects-portfolio__card-wavelength-board" aria-hidden="true">
                <div className="projects-portfolio__card-wavelength-semicircle">
                  <div className="projects-portfolio__card-wavelength-target" />
                  <div className="projects-portfolio__card-wavelength-needle" />
                </div>
                <div className="projects-portfolio__card-wavelength-labels">
                  <span>Bad Company</span>
                  <span>Good Company</span>
                </div>
              </div>
            </div>
          )}
          
          {project.id === 'my-kosher-delivery' && (
            <div className="projects-portfolio__card-mkd-preview">
              <img src={whiteMKDIcon} alt="My Kosher Delivery" className="projects-portfolio__card-mkd-icon" />
            </div>
          )}
          
          {project.id === 'bg-workspace' && (
            <div className="projects-portfolio__card-bgworkspace-preview">
              <img src={bgworkspaceLogo} alt="BG Workspace" className="projects-portfolio__card-bgworkspace-icon" />
            </div>
          )}
          
          {project.id === 'tori' && (
            <div className="projects-portfolio__card-tori-preview">
              <img src={toriLogo} alt="Tori" className="projects-portfolio__card-tori-icon" />
            </div>
          )}
          
          {!hasImages && !(isInteractive && project.id === 'afk-clock-screen') && project.id !== '2048-game' && project.id !== 'wordle' && project.id !== 'wavelength' && project.id !== 'my-kosher-delivery' && project.id !== 'bg-workspace' && project.id !== 'tori' && (
            <div className={`projects-portfolio__card-placeholder projects-portfolio__card-placeholder--${project.category} ${project.id === 'my-kosher-delivery' ? 'projects-portfolio__card-placeholder--mkd' : ''}`}>
              {project.id === 'my-kosher-delivery' ? (
                <img src={whiteMKDIcon} alt="My Kosher Delivery" className="projects-portfolio__card-placeholder-mkd-icon" />
              ) : (
              <span className="material-symbols-outlined">
                {project.category === 'web' ? 'web' : 
                 project.category === 'widget' ? 'widgets' : 
                 project.category === 'game' ? 'sports_esports' : 
                 'code'}
              </span>
              )}
            </div>
          )}
        </div>

        <div className="projects-portfolio__meta">
          <div className="projects-portfolio__meta-top">
            <span className="projects-portfolio__meta-date">{project.date}</span>
            <div className="projects-portfolio__meta-links">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-portfolio__meta-link"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Open live site"
                  data-tooltip="Website"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-portfolio__meta-link"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Open GitHub"
                  data-tooltip="GitHub"
                >
                  <span className="material-symbols-outlined">code</span>
                </a>
              )}
            </div>
          </div>

          <h3 className="projects-portfolio__meta-title">{project.title}</h3>
          <p className="projects-portfolio__meta-description">{project.description}</p>

          <div className="projects-portfolio__meta-tech">
            {project.techStack.slice(0, isFeatured ? 8 : 4).map((tech) => (
              <span key={tech} className="projects-portfolio__tech-pill">
                {tech}
              </span>
            ))}
            {project.techStack.length > (isFeatured ? 8 : 4) && (
              <span className="projects-portfolio__tech-pill projects-portfolio__tech-pill--more">
                +{project.techStack.length - (isFeatured ? 8 : 4)}
              </span>
            )}
          </div>

          <button
            className="projects-portfolio__meta-cta"
            onClick={(e) => {
              e.stopPropagation();
              setActiveProjectId(project.id);
            }}
          >
            <span className="material-symbols-outlined">
              {project.category === 'game' ? 'play_arrow' : project.category === 'widget' ? 'play_arrow' : 'open_in_full'}
            </span>
            {project.category === 'game' ? 'Play Game' : project.category === 'widget' ? 'View in action' : 'View case study'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`projects-page projects-page--${theme}`}>
      <section className="projects-hero">
        <div className="projects-hero__background">
          <div className="projects-hero__grid"></div>
          <div className="projects-hero__gradient projects-hero__gradient--1"></div>
          <div className="projects-hero__gradient projects-hero__gradient--2"></div>
        </div>

        <div className="projects-hero__container">
          <div className="projects-hero__content">
            <div className="projects-hero__badge">
              <span className="projects-hero__badge-dot"></span>
              My Work
            </div>

            <h1 className="projects-hero__title">
              <span className="projects-hero__title-line">Projects &</span>
              <span className="projects-hero__title-line">Portfolio</span>
            </h1>

            <p className="projects-hero__subtitle">
              A collection of my work, from full-stack applications to interactive widgets and games.
              Each project tells a story of problem-solving and creativity.
            </p>
          </div>
        </div>
      </section>

      <section className="projects-portfolio-section">
        <div className="projects-portfolio-section__container">
          <div className="projects-portfolio-section__filters">
            <button
              className={`projects-portfolio-section__filter ${activeCategory === 'all' ? 'projects-portfolio-section__filter--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button
              className={`projects-portfolio-section__filter ${activeCategory === 'web' ? 'projects-portfolio-section__filter--active' : ''}`}
              onClick={() => setActiveCategory('web')}
            >
              Apps
            </button>
            <button
              className={`projects-portfolio-section__filter ${activeCategory === 'widget' ? 'projects-portfolio-section__filter--active' : ''}`}
              onClick={() => setActiveCategory('widget')}
            >
              Widgets
            </button>
            <button
              className={`projects-portfolio-section__filter ${activeCategory === 'game' ? 'projects-portfolio-section__filter--active' : ''}`}
              onClick={() => setActiveCategory('game')}
            >
              Games
            </button>
          </div>

          <div className="projects-portfolio__grid">
            {filteredProjects.map((project) => renderProject(project, project.category === 'widget' || project.category === 'game'))}
          </div>
        </div>
      </section>

      <Footer />

      {activeProject && (
        <ProjectCaseStudyModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={closeModal}
          activeImageIndex={activeImageIndex[activeProject.id] || 0}
          onPrevImage={() => handleImageNavigation(activeProject.id, 'prev')}
          onNextImage={() => handleImageNavigation(activeProject.id, 'next')}
          onSelectImage={(idx) => handleImageSelect(activeProject.id, idx)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
