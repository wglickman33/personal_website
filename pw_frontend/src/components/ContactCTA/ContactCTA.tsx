import Button from '../Button/Button';
import useTheme from '../../hooks/useTheme';
import SectionDivider from '../SectionDivider/SectionDivider';
import './ContactCTA.scss';

const ContactCTA = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`contact-cta ${theme}`}>
      <SectionDivider 
        position="top" 
        variant="triangle" 
        color={theme === 'dark' ? '#0d1117' : '#f8f9fa'} 
        flip={true}
      />
      
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Let's Create Something Amazing</h2>
          <p className="cta-text">
            Have a challenging project or an innovative idea? I'm always excited to collaborate on new opportunities that push boundaries.
          </p>
          
          <div className="cta-buttons">
          <Button 
            to="/contact" 
            variant="primary" 
            size="lg"
          >
            Get in Touch
          </Button>
          <Button 
            to="/projects" 
            variant="outline" 
            size="lg"
          >
            Explore My Work
          </Button>
          </div>
        </div>
      </div>
      
      <div className="cta-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
        <div className="grid-overlay"></div>
      </div>
    </section>
  );
};

export default ContactCTA;