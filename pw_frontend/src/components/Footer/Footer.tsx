import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import './Footer.scss';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`footer footer--${theme}`}>
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            <Link to="/" className="footer__logo-link">
              <span className="footer__logo-text">WG</span>
            </Link>
            <p className="footer__tagline">Full Stack Engineer & AI Engineer</p>
          </div>
          
          <div className="footer__navigation">
            <div className="footer__links">
              <h4 className="footer__title">Navigation</h4>
              <ul className="footer__list">
                <li className="footer__item">
                  <Link to="/" className="footer__link">Home</Link>
                </li>
                <li className="footer__item">
                  <Link to="/about" className="footer__link">About</Link>
                </li>
                <li className="footer__item">
                  <Link to="/projects" className="footer__link">Projects</Link>
                </li>
                <li className="footer__item">
                  <Link to="/skills" className="footer__link">Skills</Link>
                </li>
                <li className="footer__item">
                  <Link to="/resume" className="footer__link">Experience</Link>
                </li>
                <li className="footer__item">
                  <Link to="/contact" className="footer__link">Contact</Link>
                </li>
              </ul>
            </div>
            
            <div className="footer__contact">
              <h4 className="footer__title">Contact</h4>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="mailto:william@example.com" className="footer__link">
                    <span className="material-symbols-outlined footer__icon">mail</span>
                    Email
                  </a>
                </li>
                <li className="footer__item">
                  <a 
                    href="https://github.com/wglickman33" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer__link"
                  >
                    <span className="material-symbols-outlined footer__icon">code</span>
                    GitHub
                  </a>
                </li>
                <li className="footer__item">
                  <a 
                    href="https://linkedin.com/in/william-glickman/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer__link"
                  >
                    <span className="material-symbols-outlined footer__icon">work</span>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} William Glickman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
