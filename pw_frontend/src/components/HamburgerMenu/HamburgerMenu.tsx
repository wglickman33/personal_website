import useTheme from '../../hooks/useTheme';
import './HamburgerMenu.scss';

const HamburgerMenu = () => {
  const { theme } = useTheme();
  
  return (
    <button 
      className={`hamburger ${theme}`} 
      aria-label="Toggle navigation menu"
      aria-expanded="false"
    >
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
      <span className="hamburger__line"></span>
    </button>
  );
};

export default HamburgerMenu;