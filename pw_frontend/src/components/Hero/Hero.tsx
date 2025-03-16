import { useState, useEffect, useRef } from 'react';
import useTheme from '../../hooks/useTheme';
import './Hero.scss';

const Hero = () => {
  const { theme } = useTheme();
  const [activeSkill, setActiveSkill] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const skills = [
    {
      title: "UI Designer",
      description: "Creating intuitive and immersive user experiences",
      icon: "🎨",
      technologies: ["User Interface Design", "Figma", "Responsive Web", "Interactive Prototypes"]
    },
    {
      title: "Software Engineer",
      description: "Building robust and scalable applications",
      icon: "💻",
      technologies: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "CSS/SCSS"]
    },
    {
      title: "AI Engineer",
      description: "Developing intelligent solutions for complex problems",
      icon: "🧠",
      technologies: ["Agentic AI", "GPT-4", "OpenAI API", "Python", "Flask"]
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setIsTransitioning(true);

      timeoutRef.current = setTimeout(() => {
        setActiveSkill(prev => (prev + 1) % skills.length);
        setIsTransitioning(false);
      }, 600);
      
    }, 4000);
    
    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [skills.length]);

  return (
    <section className={`hero ${theme}`}>
      <div className="hero-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>
      
      <div className="container">
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <h1 className="hero-title">
            <span className="greeting">Hello, I'm</span>
            <span className="name">William Glickman</span>
          </h1>
          
          <div className="skill-transition">
            {skills.map((skill, index) => (
              <div 
                key={skill.title} 
                className={`skill-item ${index === activeSkill ? 'active' : ''}`}
              >
                <span className="skill-icon">{skill.icon}</span>
                <h2 className="skill-title">{skill.title}</h2>
                <p className="skill-description">{skill.description}</p>
              </div>
            ))}
          </div>
          
          <p className="hero-tagline">
            From neuroscience graduate to full stack engineer, I design and build entire frameworks.
            <br />
            <span className="philosophy">"Build, learn, scrap, rebuild better, repeat."</span>
          </p>
          
          <div className={`tech-stack ${isTransitioning ? 'transitioning' : ''}`}>
            {skills[activeSkill].technologies.map((tech, index) => (
              <span 
                key={`${activeSkill}-${index}`} 
                className="tech-bubble"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="hero-cta">
            <a href="/projects" className="cta-button primary">View Projects</a>
            <a href="/contact" className="cta-button secondary">Contact Me</a>
            <a href="" className="cta-button outline" download>
              Download Resume
            </a>
          </div>
        </div>
      </div>
      
      <div className="wave-divider">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 54.8676C239.5 -18.2892 479 -18.2892 718.5 54.8676C958 128.024 1199 128.024 1440 54.8676V120H0V54.8676Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;