import { useRef, useEffect, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { homepageProjects } from '../../data/projects';
import './Projects.scss';

const Projects = () => {
  const { theme } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const timelineTop = scrollTop + rect.top;
      const timelineHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;

      const scrollableStart = timelineTop - viewportCenter;
      const scrollableEnd = timelineTop + timelineHeight - viewportCenter;
      const scrollableDistance = scrollableEnd - scrollableStart;
      
      const scrolled = scrollTop - scrollableStart;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project-id');
            if (projectId) {
              setVisibleProjects((prev) => new Set(prev).add(projectId));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const projectElements = timelineRef.current?.querySelectorAll('[data-project-id]');
    projectElements?.forEach((el) => observer.observe(el));

    return () => {
      projectElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className={`projects projects--${theme}`}>
      <div className="projects__container">
        <h2 className="projects__title">Projects</h2>
        <p className="projects__subtitle">A timeline of my work</p>

        <div className="projects__timeline" ref={timelineRef}>
          <div className="projects__timeline-line">
            <div 
              className="projects__timeline-line-progress"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {homepageProjects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`projects__item ${visibleProjects.has(project.id) ? 'projects__item--visible' : ''} ${index % 2 === 0 ? 'projects__item--left' : 'projects__item--right'}`}
            >
              <div className="projects__content">
                <div className="projects__header">
                  <span className="projects__date">{project.date}</span>
                  <h3 className="projects__item-title">{project.title}</h3>
                </div>

                <p className="projects__description">{project.description}</p>

                <div className="projects__tech">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="projects__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="projects__details">
                  <div className="projects__detail-section">
                    <h4 className="projects__detail-title">Challenges</h4>
                    <p className="projects__detail-text">{project.challenges}</p>
                  </div>

                  <div className="projects__detail-section">
                    <h4 className="projects__detail-title">Results</h4>
                    <p className="projects__detail-text">{project.results}</p>
                  </div>
                </div>

                <div className="projects__links">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__link"
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
                      className="projects__link"
                    >
                      <span className="material-symbols-outlined">code</span>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
