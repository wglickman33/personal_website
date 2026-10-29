import { useState, useEffect, useRef } from 'react';
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
  const wasMobileRef = useRef(false);

  useEffect(() => {
    // These thresholds must stay in sync with the precise media queries in
    // Sidebar.scss (`@include max(767px)` and `@include between(768px, 991px)`).
    // Using exclusive `<` here with an exclusive CSS range avoids the
    // off-by-one boundary conflict that used to hide the sidebar entirely
    // at exactly 768px/992px.
    const MOBILE_BREAKPOINT = 768;
    const TABLET_BREAKPOINT = 992;

    const checkResponsive = () => {
      const width = window.innerWidth;

      if (width < MOBILE_BREAKPOINT) {
        // Crossing into mobile from the tablet rail: keep collapsed so
        // width stays 72px during the slide-out. If we're already mobile,
        // leave collapsed alone (cleared when the drawer opens) so closing
        // the drawer doesn't shrink 280→72 mid-exit.
        if (!wasMobileRef.current) {
          setIsCollapsed(true);
        }
        wasMobileRef.current = true;
        setIsMobile(true);
        setIsOpen(false);
      } else if (width < TABLET_BREAKPOINT) {
        wasMobileRef.current = false;
        setIsMobile(false);
        setIsCollapsed(true);
        setIsOpen(true);
      } else {
        wasMobileRef.current = false;
        setIsMobile(false);
        setIsCollapsed(false);
        setIsOpen(true);
      }
    };

    // No debounce: CSS media queries update on the same frame as the resize,
    // and a delayed JS class update was what produced the icon→full→hamburger
    // and hamburger→nothing→icon flashes at the 768 boundary.
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
          onClick={() => {
            setIsCollapsed(false);
            setIsOpen(true);
          }}
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