import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import Navbar from '../Navbar/Navbar';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import './Header.scss';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`header ${theme} ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__background">
        <div className="header__gradient-blur"></div>
      </div>
      
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <span className="header__logo-text">WG</span>
          </Link>
          
          <Navbar />
          
          <div className="header__actions">
            <Link to="/playground" className="header__playground-link">
              Playground
            </Link>
            
            <button 
              className={`header__theme-toggle ${theme}`}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span className="header__toggle-icon header__toggle-icon--light">☀️</span>
              <span className="header__toggle-icon header__toggle-icon--dark">🌙</span>
            </button>
            
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;