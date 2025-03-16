import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProjectsPage.scss';

interface ProjectsPageProps {
  section?: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ section = 'all' }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(section);
  
  useEffect(() => {
    if (location.pathname.includes('/apps')) {
      setActiveSection('apps');
    } else if (location.pathname.includes('/widgets')) {
      setActiveSection('widgets');
    } else {
      setActiveSection('all');
    }
  }, [location]);

  return (
    <div className="projects-page">
      <div className="container">
        <h1>Projects</h1>
        
        <div className="section-tabs">
          <button 
            className={`section-tab ${activeSection === 'all' ? 'active' : ''}`}
            onClick={() => setActiveSection('all')}
          >
            All Projects
          </button>
          <button 
            className={`section-tab ${activeSection === 'apps' ? 'active' : ''}`}
            onClick={() => setActiveSection('apps')}
          >
            Apps
          </button>
          <button 
            className={`section-tab ${activeSection === 'widgets' ? 'active' : ''}`}
            onClick={() => setActiveSection('widgets')}
          >
            Widgets
          </button>
        </div>
        
        <div className="projects-content">
          {activeSection === 'all' && (
            <div className="project-section">
              <h2>All Projects</h2>
              <p>This will display all projects.</p>
            </div>
          )}
          
          {activeSection === 'apps' && (
            <div className="project-section">
              <h2>Apps</h2>
              <p>This will display the apps projects.</p>
            </div>
          )}
          
          {activeSection === 'widgets' && (
            <div className="project-section">
              <h2>Widgets</h2>
              <p>This will display the widgets projects.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;