import useTheme from '../../hooks/useTheme';
import { Project } from '../../data/projects';
import './ProjectCard.scss';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={`project-card ${theme}`}>
      {project.images && project.images[0] && (
      <div className="project-image">
          <img src={project.images[0]} alt={project.title} />
        <div className="project-overlay">
            {project.liveLink && (
              <a href={project.liveLink} className="view-project" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
            )}
          </div>
        </div>
      )}
      
      <div className="project-content">
        <span className="project-type">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-technologies">
          {project.techStack.map((tech: string, index: number) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;