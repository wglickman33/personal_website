import { useEffect, useMemo, useRef } from 'react';
import useTheme from '../../hooks/useTheme';
import { Project } from '../../data/projects';
import WidgetDemo from '../WidgetDemo/WidgetDemo';
import './ProjectCaseStudyModal.scss';

interface ProjectCaseStudyModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  activeImageIndex: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
}

const ProjectCaseStudyModal = ({
  project,
  isOpen,
  onClose,
  activeImageIndex,
  onPrevImage,
  onNextImage,
  onSelectImage,
}: ProjectCaseStudyModalProps) => {
  const { theme } = useTheme();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const hasImages = (project.images?.length ?? 0) > 0;
  const images = useMemo(() => project.images ?? [], [project.images]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`project-modal project-modal--${theme}`} role="dialog" aria-modal="true">
      <button className="project-modal__backdrop" onClick={onClose} aria-label="Close dialog" />

      <div className="project-modal__panel" role="document">
        <button
          ref={closeBtnRef}
          className="project-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="project-modal__header">
          <div className="project-modal__header-left">
            <span className="project-modal__date">{project.date}</span>
            <h2 className="project-modal__title">{project.title}</h2>
          </div>
        </div>

        <div className={`project-modal__body ${project.id === 'wavelength' ? 'project-modal__body--full-width' : ''}`}>
            {project.id === 'wavelength' && project.widgetComponent ? (
              <div className="project-modal__full-game">
                {(() => {
                  const WidgetComponent = project.widgetComponent!;
                  return <WidgetComponent />;
                })()}
              </div>
            ) : (
              <>
            <div className="project-modal__media">
                {(project.category === 'widget' || project.category === 'game') && (project.widgetCode || project.widgetComponent) ? (
                  <WidgetDemo project={project} />
                ) : hasImages ? (
              <div className="project-modal__carousel">
                <div className="project-modal__carousel-main">
                  <button
                    className="project-modal__carousel-arrow project-modal__carousel-arrow--prev"
                    onClick={onPrevImage}
                    aria-label="Previous image"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>

                  <div className="project-modal__carousel-image-wrapper">
                    <img
                      src={images[activeImageIndex]}
                      alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                      className="project-modal__carousel-image"
                    />
                  </div>

                  <button
                    className="project-modal__carousel-arrow project-modal__carousel-arrow--next"
                    onClick={onNextImage}
                    aria-label="Next image"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>

                {images.length > 1 && (
                  <div className="project-modal__carousel-thumbs">
                    {images.map((img, idx) => (
                      <button
                        key={img + idx}
                        className={`project-modal__thumb ${idx === activeImageIndex ? 'project-modal__thumb--active' : ''}`}
                        onClick={() => onSelectImage(idx)}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="project-modal__placeholder">
                <span className="material-symbols-outlined">image</span>
                <span>Images coming soon</span>
              </div>
            )}
          </div>

          <div className="project-modal__content">
            <p className="project-modal__description">{project.description}</p>

            <div className="project-modal__tech">
              {project.techStack.map((t) => (
                <span key={t} className="project-modal__tech-tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="project-modal__sections">
              <div className="project-modal__section">
                <h3 className="project-modal__section-title">Challenges</h3>
                <p className="project-modal__section-text">{project.challenges}</p>
              </div>
              <div className="project-modal__section">
                <h3 className="project-modal__section-title">Results</h3>
                <p className="project-modal__section-text">{project.results}</p>
              </div>
            </div>

            <div className="project-modal__links">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal__link"
                  data-tooltip="Website"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  Live Site
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal__link"
                  data-tooltip="GitHub"
                >
                  <span className="material-symbols-outlined">code</span>
                  GitHub
                </a>
              )}
            </div>
          </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCaseStudyModal;


