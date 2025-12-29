import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import wgLogo from '../../assets/styles/logos/wgLogo.png';
import './Sidebar.scss';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setIsMobile(true);
        setIsCollapsed(false);
        setIsOpen(false);
      } else if (width < 992) {
        setIsMobile(false);
        setIsCollapsed(true);
        setIsOpen(true);
      } else {
        setIsMobile(false);
        setIsCollapsed(false);
        setIsOpen(true);
      }
    };

    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/about', label: 'About', icon: 'person' },
    { path: '/projects', label: 'Projects', icon: 'work' },
    { path: '/skills', label: 'Skills', icon: 'bolt' },
    { path: '/resume', label: 'Experience', icon: 'description' },
    { path: '/contact', label: 'Contact', icon: 'mail' },
    { path: '/playground', label: 'Playground', icon: 'code' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isMobile && !isOpen && (
        <button
          className="sidebar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          <span className="sidebar__hamburger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      )}

      <aside className={`sidebar sidebar--${theme} ${isOpen ? 'sidebar--open' : ''} ${isMobile ? 'sidebar--mobile' : ''} ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar__header">
          {isMobile && isOpen && (
            <button
              className="sidebar__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
          <Link to="/" className="sidebar__logo" onClick={handleNavClick}>
            <img src={wgLogo} alt="William Glickman" className="sidebar__logo-img" />
          </Link>
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            {navItems.map((item) => (
              <li key={item.path} className="sidebar__item">
                <Link
                  to={item.path}
                  className={`sidebar__link ${isActive(item.path) ? 'sidebar__link--active' : ''}`}
                  onClick={handleNavClick}
                >
                  <span className="material-symbols-outlined sidebar__icon">{item.icon}</span>
                  <span className="sidebar__label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <button
            className="sidebar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined sidebar__theme-icon">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="sidebar__theme-label">Theme</span>
          </button>
        </div>
      </aside>

      {isMobile && isOpen && (
        <div
          className="sidebar__overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;