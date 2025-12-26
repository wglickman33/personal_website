// FeaturedProjects.tsx
import { useEffect, useRef } from 'react';
import useTheme from '../../hooks/useTheme';
import { staggeredAnimation } from '../../utils/animation';
import ProjectCard from '../ProjectCard/ProjectCard';
import Button from '../Button/Button';
import SectionDivider from '../SectionDivider/SectionDivider';
import { featuredProjects } from '../../data/projects';
import './FeaturedProjects.scss';

const FeaturedProjects = () => {
  const { theme } = useTheme();
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (projectsRef.current) {
      const projectElements = Array.from(
        projectsRef.current.querySelectorAll('.project-card')
      ) as HTMLElement[];
      
      staggeredAnimation(projectElements, 100, 150);
    }
  }, []);
  
  return (
    <section className={`featured-projects ${theme}`} id="featured-projects">
      <SectionDivider 
        position="top" 
        variant="wave" 
        color={theme === 'dark' ? '#0d1117' : '#f8f9fa'} 
        flip={true}
      />
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Selected works that showcase my skills and approach to problem-solving
          </p>
        </div>
        
        <div className="projects-grid" ref={projectsRef}>
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="projects-cta">
        <Button 
          to="/projects" 
          variant="gradient" 
          size="md"
          icon="→"
        >
          View All Projects
        </Button>
        </div>
      </div>
      
      <SectionDivider 
        position="bottom" 
        variant="curve" 
        color={theme === 'dark' ? '#0a0c0f' : '#f0f2f5'} 
      />
    </section>
  );
};

export default FeaturedProjects;