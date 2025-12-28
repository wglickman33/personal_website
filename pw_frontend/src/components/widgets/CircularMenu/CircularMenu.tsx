import { useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import './CircularMenu.scss';

interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

const CircularMenu = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { icon: 'home', label: 'Home', href: '/' },
    { icon: 'folder_special', label: 'Projects', href: '/projects' },
    { icon: 'person', label: 'About', href: '/about' },
    { icon: 'mail', label: 'Contact', href: '/contact' },
    { icon: 'description', label: 'Resume', href: '/resume' },
    { icon: 'code', label: 'Skills' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <nav className={`circular-menu circular-menu--${theme}`}>
      <input
        type="checkbox"
        id="circular-menu-toggler"
        className="circular-menu__toggler"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <label htmlFor="circular-menu-toggler" className="circular-menu__label"></label>
      <ul className="circular-menu__list">
        {menuItems.map((item, index) => (
          <li key={index} className="circular-menu__item">
            {item.href ? (
              <a
                href={item.href}
                className="circular-menu__link"
                onClick={() => handleItemClick(item)}
                aria-label={item.label}
                data-tooltip={item.label}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </a>
            ) : (
              <button
                type="button"
                className="circular-menu__link"
                onClick={() => handleItemClick(item)}
                aria-label={item.label}
                data-tooltip={item.label}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CircularMenu;

