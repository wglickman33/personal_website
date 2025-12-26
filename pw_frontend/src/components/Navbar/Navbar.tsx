import { Link, useLocation } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import './Navbar.scss';

const Navbar = () => {
  const { theme } = useTheme();
  const location = useLocation();
  
  return (
    <nav className={`navbar ${theme}`}>
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link 
            to="/" 
            className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link 
            to="/about" 
            className={`navbar__link ${location.pathname === '/about' ? 'navbar__link--active' : ''}`}
          >
            About
          </Link>
        </li>
        <li className="navbar__item">
          <Link 
            to="/projects" 
            className={`navbar__link ${location.pathname.includes('/projects') ? 'navbar__link--active' : ''}`}
          >
            Projects
          </Link>
        </li>
        <li className="navbar__item">
          <Link 
            to="/resume" 
            className={`navbar__link ${location.pathname === '/resume' ? 'navbar__link--active' : ''}`}
          >
            Resume
          </Link>
        </li>
        <li className="navbar__item">
          <Link 
            to="/contact" 
            className={`navbar__link ${location.pathname === '/contact' ? 'navbar__link--active' : ''}`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;