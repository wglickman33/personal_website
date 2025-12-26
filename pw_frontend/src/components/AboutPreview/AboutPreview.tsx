// AboutPreview.tsx
import useTheme from '../../hooks/useTheme';
import Button from '../Button/Button';
import SectionDivider from '../SectionDivider/SectionDivider';
import './AboutPreview.scss';

const AboutPreview = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`about-preview ${theme}`} id="about-preview">
      <SectionDivider 
        position="top" 
        variant="angle" 
        color={theme === 'dark' ? '#0d1117' : '#f8f9fa'} 
        flip={true}
      />
      
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <div className="image-container">
              <img src="/assets/images/profile.jpg" alt="William Glickman" />
              <div className="image-shape"></div>
            </div>
          </div>
          
          <div className="about-content">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">From Neuroscience to Engineering</h2>
            
            <div className="about-text">
              <p>
                My journey from neuroscience graduate to full-stack engineer has given me a unique perspective on problem-solving. I blend scientific thinking with creative design to build solutions that are both functional and intuitive.
              </p>
              <p>
                I'm passionate about pushing boundaries where technology meets psychology. Whether it's crafting seamless user experiences or architecting complex systems, I approach each project with equal parts precision and creativity.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the latest AI advancements, experimenting with new technologies, or applying cognitive science principles to create more human-centered digital experiences.
              </p>
            </div>
            
            <div className="about-cta">
            <Button 
              to="/about" 
              variant="outline" 
              size="md"
              icon="→"
            >
              Learn More About Me
            </Button>
            </div>
          </div>
        </div>
      </div>
      
      <SectionDivider 
        position="bottom" 
        variant="triangle" 
        color={theme === 'dark' ? '#191c20' : '#f4f6f8'} 
      />
    </section>
  );
};

export default AboutPreview;