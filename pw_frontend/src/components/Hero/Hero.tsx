import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import './Hero.scss';

const Hero = () => {
  const { theme } = useTheme();
  const [activeRole, setActiveRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const roles = [
    { text: 'Full Stack Engineer', color: 'blue' },
    { text: 'UI/UX Designer', color: 'blue-light' },
    { text: 'Agentic AI Engineer', color: 'blue-dark' },
    { text: 'Product Manager', color: 'blue-medium' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;
      
      heroRef.current.style.setProperty('--mouse-x', `${xPos}px`);
      heroRef.current.style.setProperty('--mouse-y', `${yPos}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className={`hero hero--${theme} ${isVisible ? 'hero--visible' : ''}`}>
      <div className="hero__background">
        <div className="hero__grid"></div>
        <div className="hero__gradient hero__gradient--1"></div>
        <div className="hero__gradient hero__gradient--2"></div>
        <div className="hero__gradient hero__gradient--3"></div>
      </div>

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Let's build something great
          </div>

          <h1 className="hero__name">
            <span className="hero__name-line">William</span>
            <span className="hero__name-line">Glickman</span>
          </h1>
          
          <div className="hero__roles">
            {roles.map((role, index) => (
              <span
                key={role.text}
                className={`hero__role hero__role--${role.color} ${index === activeRole ? 'hero__role--active' : ''}`}
              >
                {role.text}
              </span>
            ))}
          </div>

          <p className="hero__tagline">
            From neuroscience to code, I build products that make a difference.
            <br />
            Specializing in full-stack development, AI agents, and intuitive design.
          </p>

          <div className="hero__cta">
            <Link to="/projects" className="hero__button hero__button--primary">
              <span>View Projects</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link to="/contact" className="hero__button hero__button--secondary">
              <span>Get in Touch</span>
              <span className="material-symbols-outlined">mail</span>
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-value">150K+</div>
              <div className="hero__stat-label">Lines of Code</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">1500+</div>
              <div className="hero__stat-label">Hours Delivered</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">15+</div>
              <div className="hero__stat-label">AI Agents Built</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="material-symbols-outlined">expand_more</span>
      </div>
    </section>
  );
};

export default Hero;
