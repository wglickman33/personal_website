import { ComponentType } from 'react';
import CircularMenu from '../components/widgets/CircularMenu/CircularMenu';
import Game2048 from '../components/widgets/2048Game/2048Game';
import Wordle from '../components/widgets/Wordle/Wordle';
import WavelengthGame from '../components/widgets/WavelengthGame/WavelengthGame';
import AFKClock from '../components/widgets/AFKClock/AFKClock';

import mkdImage0 from '../assets/styles/images/mkdImage0.png';
import mkdImage1 from '../assets/styles/images/mkdImage1.png';
import mkdImage2 from '../assets/styles/images/mkdImage2.png';
import mkdImage3 from '../assets/styles/images/mkdImage3.png';
import mkdImage4 from '../assets/styles/images/mkdImage4.png';
import mkdImage5 from '../assets/styles/images/mkdImage5.png';
import mkdImage6 from '../assets/styles/images/mkdImage6.png';
import mkdImage7 from '../assets/styles/images/mkdImage7.png';
import mkdImage8 from '../assets/styles/images/mkdImage8.png';
import mkdImage9 from '../assets/styles/images/mkdImage9.png';
import mkdImage10 from '../assets/styles/images/mkdImage10.png';
import mkdImage11 from '../assets/styles/images/mkdImage11.png';
import mkdImage12 from '../assets/styles/images/mkdImage12.png';
import mkdImage13 from '../assets/styles/images/mkdImage13.png';
import mkdImage14 from '../assets/styles/images/mkdImage14.png';
import mkdImage15 from '../assets/styles/images/mkdImage15.png';

import bgworkspaceImage1 from '../assets/styles/images/bgworkspaceImage1.png';
import bgworkspaceImage2 from '../assets/styles/images/bgworkspaceImage2.png';
import bgworkspaceImage3 from '../assets/styles/images/bgworkspaceImage3.png';

export interface Project {
    id: string;
    title: string;
    description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  challenges: string;
  results: string;
  images?: string[];
  category: 'web' | 'widget' | 'game';
  date: string;
  widgetCode?: {
    html?: string;
    css?: string;
    js?: string;
    react?: string;
    tsx?: string;
    scss?: string;
  };
  widgetComponent?: ComponentType;
}

export const projects: Project[] = [
  {
    id: 'my-kosher-delivery',
    title: 'My Kosher Delivery',
    description: 'A comprehensive kosher food delivery platform serving New York area (5 Boroughs and Long Island). Unlike traditional delivery services, customers can order from multiple restaurants in a single order, with delivery capabilities extending 2+ hours away.',
    techStack: ['React', 'JavaScript', 'SCSS', 'Node.js', 'Express', 'PostgreSQL', 'Material UI', 'EmailJS API', 'MailChimp API', 'ShipDay API', 'Stripe API', 'Google Location Services API', 'Heroku', 'Netlify'],
    liveLink: 'https://mykosherdelivery.netlify.app',
    githubLink: 'https://github.com/wglickman33/mykosherdelivery',
    challenges: 'Built a complex multi-restaurant ordering system, integrated ShipDay for order tracking and management, Google Location Services for delivery area mapping, MailChimp for marketing, and EmailJS for order confirmations. Managed full admin analytics and logs, user tracking and authentication, promo codes, gift cards, and a ticket system.',
    results: '850 hours of development, 74,000+ lines of code. Full-stack application with comprehensive admin dashboard, order tracking, and multi-restaurant ordering capability.',
    category: 'web',
    date: '2025',
    images: [
      mkdImage0,
      mkdImage1,
      mkdImage2,
      mkdImage3,
      mkdImage4,
      mkdImage5,
      mkdImage6,
      mkdImage7,
      mkdImage8,
      mkdImage9,
      mkdImage10,
      mkdImage11,
      mkdImage12,
      mkdImage13,
      mkdImage14,
      mkdImage15,
    ],
  },
  {
    id: 'tori',
    title: 'Tori - Home Inventory Management',
    description: 'A home inventory management system designed like a handwritten notebook to give users a "write in their notebook" vibe. Features my own handwriting font and was hand-drawn before being recreated with code. Created as my BrainStation bootcamp capstone project.',
    techStack: ['React', 'JavaScript', 'SCSS', 'Custom Fonts'],
    githubLink: 'https://github.com/wglickman33/Tori',
    challenges: 'Designed the entire interface by hand first, then recreated it digitally. Created a custom handwriting font to match the aesthetic. Built item and category management functionality with a unique notebook-style UI.',
    results: 'Finished top of the class at BrainStation bootcamp with this project. Got very far along with the ability to manage items and categories, creating a unique and personal user experience.',
    category: 'web',
    date: 'October 2024',
  },
  {
    id: 'bg-workspace',
    title: 'BG Workspace Solutions',
    description: 'Sales efficiency platform representing office furniture manufacturers. Routes clients to boost sales efficiency.',
    techStack: ['React', 'JavaScript', 'SCSS', 'Netlify'],
    liveLink: 'https://www.bgworkspace.com',
    githubLink: 'https://github.com/wglickman33/bgworkspace',
    challenges: 'Created a streamlined platform for routing clients and improving sales efficiency for office furniture manufacturers. Features a comprehensive directory of manufacturers and their product offerings, as well as a link to their websites.',
    results: '25 hours of development, 2,500+ lines of code. Improved client routing and sales efficiency for the company.',
    category: 'web',
    date: 'September 2024',
    images: [
      bgworkspaceImage1,
      bgworkspaceImage2,
      bgworkspaceImage3,
    ],
  },
  {
    id: 'brainstation-hackathon',
    title: 'BrainStation x Etsy Hackathon Winner',
    description: 'Won the BrainStation Hackathon with Etsy for our product creation. This was a team effort where we built a product that impressed the judges and won us a free certificate course prize.',
    techStack: ['React', 'JavaScript', 'Team Collaboration', 'Rapid Prototyping'],
    challenges: 'Had to build a complete product concept and prototype within the hackathon timeframe. Worked with a team to create something innovative that would stand out to Etsy judges.',
    results: 'Won the hackathon! Prize included a free certificate course, which I used to take a UI Design course from December 2024 to February 2025. Great experience in rapid development and team collaboration.',
    category: 'web',
    date: 'September 2024',
    githubLink: 'https://github.com/wglickman33/t4-industry-project-client'
  },
  {
    id: 'circular-menu',
    title: 'Circular Menu Widget',
    description: 'An animated circular menu widget that expands from a hamburger icon into a radial navigation menu. Features smooth transitions and theme-aware styling.',
    techStack: ['React', 'TypeScript', 'SCSS', 'Material Icons'],
    challenges: 'Creating a smooth circular expansion animation with proper positioning and icon counter-rotation to keep icons upright. Implementing theme-aware styling that works in both light and dark modes.',
    results: 'A reusable, interactive widget component with smooth animations, proper accessibility, and theme support. Can be easily integrated into any project.',
    category: 'widget',
    date: '2025',
    widgetComponent: CircularMenu,
    widgetCode: {
      tsx: `import { useState } from 'react';
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
    <nav className={\`circular-menu circular-menu--\${theme}\`}>
      <input
        type="checkbox"
        id="circular-menu-toggler"
        className="circular-menu__toggler"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <label htmlFor="circular-menu-toggler" className="circular-menu__label">
        <span className="circular-menu__line"></span>
        <span className="circular-menu__line"></span>
        <span className="circular-menu__line"></span>
      </label>
      <ul className="circular-menu__list">
        {menuItems.map((item, index) => (
          <li key={index} className="circular-menu__item">
            {item.href ? (
              <a
                href={item.href}
                className="circular-menu__link"
                onClick={() => handleItemClick(item)}
                aria-label={item.label}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </a>
            ) : (
              <button
                type="button"
                className="circular-menu__link"
                onClick={() => handleItemClick(item)}
                aria-label={item.label}
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

export default CircularMenu;`,
      scss: `@use "../../../assets/styles/partials/variables" as *;
@use "../../../assets/styles/partials/fonts" as *;
@use "../../../assets/styles/partials/mixins" as *;
@use "../../../assets/styles/partials/breakpoints" as *;

$toggler-size: 40px;
$item-count: 6;
$item-size: $toggler-size * 2;
$item-transition: 0.5s;

@mixin absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.circular-menu {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.circular-menu__toggler {
  @include absolute-center;
  width: $toggler-size;
  height: $toggler-size;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
}

.circular-menu__label {
  @include absolute-center;
  width: $toggler-size;
  height: $toggler-size / 8;
  display: block;
  z-index: 1;
  border-radius: $toggler-size / 16;
  background: rgba($primary-color, 0.7);
  transition: transform $item-transition, top $item-transition, background $transition-speed;

  .circular-menu--dark & {
    background: rgba($light-color, 0.7);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: $toggler-size;
    height: $toggler-size / 8;
    display: block;
    z-index: 1;
    border-radius: $toggler-size / 16;
    background: rgba($primary-color, 0.7);
    transition: transform $item-transition, top $item-transition, background $transition-speed;

    .circular-menu--dark & {
      background: rgba($light-color, 0.7);
    }
  }

  &::before {
    top: $toggler-size / 4;
  }

  &::after {
    top: -$toggler-size / 4;
  }
}

.circular-menu__toggler:hover + .circular-menu__label,
.circular-menu__toggler:hover + .circular-menu__label::before,
.circular-menu__toggler:hover + .circular-menu__label::after {
  background: $accent-color-1;

  .circular-menu--dark & {
    background: $accent-color-1;
  }
}

.circular-menu__toggler:checked + .circular-menu__label {
  background: transparent;
}

.circular-menu__toggler:checked + .circular-menu__label::before,
.circular-menu__toggler:checked + .circular-menu__label::after {
  top: 0;
  width: $toggler-size;
  transform-origin: 50% 50%;
}

.circular-menu__toggler:checked + .circular-menu__label::before {
  transform: rotate(45deg);
}

.circular-menu__toggler:checked + .circular-menu__label::after {
  transform: rotate(-45deg);
}

.circular-menu__list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  list-style: none;
}

.circular-menu__item {
  @include absolute-center;
  width: $item-size;
  height: $item-size;
  display: block;
  opacity: 0;
  transition: opacity $item-transition, transform $item-transition;
  transform: translate(-50%, -50%);
}

.circular-menu__toggler:checked ~ .circular-menu__list .circular-menu__item {
  opacity: 1;
}

.circular-menu__toggler:checked ~ .circular-menu__list .circular-menu__item:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateX(-$item-size - 30px) rotate(0deg);
}

.circular-menu__toggler:checked ~ .circular-menu__list .circular-menu__item:nth-child(2) {
  transform: translate(-50%, -50%) rotate(60deg) translateX(-$item-size - 30px) rotate(-60deg);
}

.circular-menu__toggler:checked ~ .circular-menu__list .circular-menu__item:nth-child(3) {
  transform: translate(-50%, -50%) rotate(120deg) translateX(-$item-size - 30px) rotate(-120deg);
}

.circular-menu__toggler:checked ~ .circular-menu__list .circular-menu__item:nth-child(4) {
  transform: translate(-50%, -50%) rotate(180deg) translateX(-$item-size - 30px) rotate(-180deg);
}

.circular-menu__toggler:checked ~ .circular-menu__list .circular-menu__item:nth-child(5) {
  transform: translate(-50%, -50%) rotate(240deg) translateX(-$item-size - 30px) rotate(-240deg);
}

.circular-menu__toggler:checked ~ .circular-menu__list .circular-menu__item:nth-child(6) {
  transform: translate(-50%, -50%) rotate(300deg) translateX(-$item-size - 30px) rotate(-300deg);
}

.circular-menu__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $item-size;
  height: $item-size;
  border-radius: 50%;
  color: rgba($primary-color, 0.7);
  background: rgba($light-color, 0.2);
  border: 1px solid rgba($primary-color, 0.1);
  text-align: center;
  text-decoration: none;
  font-size: $item-size / 2;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  .material-symbols-outlined {
    font-size: $item-size / 2;
    line-height: 1;
  }

  &:hover {
    box-shadow: 0 0 0 ($item-size / 40) rgba($accent-color-1, 0.3);
    color: $accent-color-1;
    background: rgba($accent-color-1, 0.15);
    border-color: rgba($accent-color-1, 0.3);
  }

  .circular-menu--dark & {
    color: rgba($light-color, 0.7);
    background: rgba($light-color, 0.1);
    border-color: rgba($light-color, 0.2);

    &:hover {
      color: $accent-color-1;
      background: rgba($accent-color-1, 0.2);
      border-color: rgba($accent-color-1, 0.4);
    }
  }
}

.circular-menu__item:nth-child(1) .circular-menu__link {
  transform: rotate(0deg);
  
  &:hover {
    transform: rotate(0deg) scale(1.1);
  }
}

.circular-menu__item:nth-child(2) .circular-menu__link {
  transform: rotate(-60deg);
  
  &:hover {
    transform: rotate(-60deg) scale(1.1);
  }
}

.circular-menu__item:nth-child(3) .circular-menu__link {
  transform: rotate(-120deg);
  
  &:hover {
    transform: rotate(-120deg) scale(1.1);
  }
}

.circular-menu__item:nth-child(4) .circular-menu__link {
  transform: rotate(-180deg);
  
  &:hover {
    transform: rotate(-180deg) scale(1.1);
  }
}

.circular-menu__item:nth-child(5) .circular-menu__link {
  transform: rotate(-240deg);
  
  &:hover {
    transform: rotate(-240deg) scale(1.1);
  }
}

.circular-menu__item:nth-child(6) .circular-menu__link {
  transform: rotate(-300deg);
  
  &:hover {
    transform: rotate(-300deg) scale(1.1);
  }
}`
    }
  },
  {
    id: 'afk-clock-screen',
    title: 'AFK Clock Screen',
    description: 'A custom clock screen application designed to display when away from keyboard. Clean, minimal interface with time display.',
    techStack: ['React', 'TypeScript', 'SCSS'],
    challenges: 'Creating a clean, minimal interface that serves its purpose without being distracting. Focused on readability and simplicity.',
    results: 'A functional and visually appealing AFK screen that displays time clearly and elegantly.',
    category: 'widget',
    date: '2024',
    githubLink: 'https://github.com/wglickman33/clock_afk_screen',
    widgetComponent: AFKClock,
    widgetCode: {
      tsx: `import { useState, useEffect } from 'react';
import useTheme from '../../../hooks/useTheme';
import './AFKClock.scss';

const TIMEZONES = [
  { label: 'Eastern (EST/EDT)', value: 'America/New_York' },
  { label: 'Central (CST/CDT)', value: 'America/Chicago' },
  { label: 'Mountain (MST/MDT)', value: 'America/Denver' },
  { label: 'Pacific (PST/PDT)', value: 'America/Los_Angeles' },
  { label: 'Alaska (AKST/AKDT)', value: 'America/Anchorage' },
  { label: 'Hawaii (HST)', value: 'Pacific/Honolulu' },
];

interface AFKClockProps {
  isPreview?: boolean;
}

const AFKClock = ({ isPreview = false }: AFKClockProps) => {
  const { theme } = useTheme();
  const [time, setTime] = useState({
    hours: '12',
    minutes: '00',
    seconds: '00',
    meridiem: 'AM',
  });

  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [primaryColor, setPrimaryColor] = useState('#80f6ff');
  const [secondaryColor, setSecondaryColor] = useState('#fffb2c');

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: selectedTimezone };
      const currentDate = new Date().toLocaleString('en-US', options);
      const date = new Date(currentDate);

      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let meridiem = hours < 12 ? 'AM' : 'PM';

      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;
      hours = hours < 10 ? '0' + hours : String(hours);
      minutes = minutes < 10 ? '0' + minutes : String(minutes);
      seconds = seconds < 10 ? '0' + seconds : String(seconds);

      setTime({ hours, minutes, seconds, meridiem });
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [selectedTimezone]);

  return (
    <div className={\`afk-clock afk-clock--\${theme} \${isPreview ? 'afk-clock--preview' : ''}\`}>
      <div
        className="afk-clock__wrapper"
        style={{
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
        } as React.CSSProperties}
      >
        <div className="afk-clock__display">
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--hours">{time.hours}</span>
          </div>
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--minutes">{time.minutes}</span>
          </div>
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--seconds">{time.seconds}</span>
          </div>
          <div className="afk-clock__container">
            <span className="afk-clock__time afk-clock__time--meridiem">{time.meridiem}</span>
          </div>
        </div>

        {!isPreview && (
          <div className="afk-clock__controls">
            <div className="afk-clock__timezone-selector">
              <label htmlFor="afk-clock-timezone">Timezone:</label>
              <select
                id="afk-clock-timezone"
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="afk-clock__color-pickers">
              <div className="afk-clock__color-picker">
                <label htmlFor="afk-clock-primary-color">Primary Color:</label>
                <input
                  type="color"
                  id="afk-clock-primary-color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
              </div>
              <div className="afk-clock__color-picker">
                <label htmlFor="afk-clock-secondary-color">Secondary Color:</label>
                <input
                  type="color"
                  id="afk-clock-secondary-color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AFKClock;`,
      scss: `@use "../../../assets/styles/partials/variables" as *;
@use "../../../assets/styles/partials/fonts" as *;
@use "../../../assets/styles/partials/mixins" as *;
@use "../../../assets/styles/partials/breakpoints" as *;

.afk-clock {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: transparent;

  &.afk-clock--preview {
    padding: 10px;
    min-height: 180px;
  }
}

.afk-clock__wrapper {
  width: 100%;
  max-width: 900px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  --primary-color: #80f6ff;
  --primary-color-rgb: 128, 246, 255;
  --secondary-color: #fffb2c;
  --secondary-color-rgb: 255, 251, 44;
}

.afk-clock__display {
  width: 100%;
  max-width: 800px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .afk-clock--preview & {
    min-height: 150px;
    margin-bottom: 0;
  }
}

@keyframes afk-clock-anim {
  0% {
    --i: 0deg;
  }
  100% {
    --i: 360deg;
  }
}

.afk-clock__container {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 20px;
  border-radius: 16px;
  color: $light-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: repeating-conic-gradient(
    from var(--i, 0deg),
    var(--primary-color) 0%,
    var(--primary-color) 5%,
    transparent 5%,
    transparent 40%,
    var(--primary-color) 50%
  );
  animation: afk-clock-anim 4s linear infinite;

  .afk-clock--dark & {
    color: $light-color;
  }

  .afk-clock--light & {
    color: $primary-color;
  }

  .afk-clock--preview & {
    width: 80px;
    height: 80px;
    margin: 0 8px;
  }

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: repeating-conic-gradient(
      from var(--i, 0deg),
      var(--secondary-color) 0%,
      var(--secondary-color) 5%,
      transparent 5%,
      transparent 40%,
      var(--secondary-color) 50%
    );
    border-radius: 16px;
    animation: afk-clock-anim 4s linear infinite;
    animation-delay: -1s;
  }

  &::after {
    position: absolute;
    content: '';
    inset: 4px;
    background: $dark-color;
    border: 4px solid rgba($light-color, 0.2);
    border-radius: 14px;
    transition: background $transition-speed ease, border $transition-speed ease;

    .afk-clock--light & {
      background: $light-color;
      border-color: rgba($primary-color, 0.2);
    }

    .afk-clock--preview & {
      inset: 2px;
      border-width: 2px;
    }
  }
}

.afk-clock__time {
  font-size: 70px;
  font-weight: $font-weight-black;
  line-height: 85px;
  z-index: 1;
  font-family: $font-family-display;

  .afk-clock--preview & {
    font-size: 32px;
    line-height: 40px;
  }
}

.afk-clock__unit {
  font-size: 16px;
  font-weight: $font-weight-semibold;
  letter-spacing: 2px;
  z-index: 1;
  text-transform: uppercase;

  .afk-clock--preview & {
    font-size: 8px;
    letter-spacing: 1px;
  }
}

.afk-clock__controls {
  position: relative;
  background: rgba($dark-color, 0.8);
  border-radius: $border-radius;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid rgba($light-color, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  color: $light-color;
  backdrop-filter: blur(5px);
  transition: background $transition-speed ease, color $transition-speed ease, border $transition-speed ease;
  width: 100%;
  max-width: 400px;

  .afk-clock--light & {
    background: rgba($light-color, 0.9);
    border-color: rgba($primary-color, 0.2);
    color: $primary-color;
  }
}

.afk-clock__timezone-selector,
.afk-clock__color-pickers {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.afk-clock__color-pickers {
  gap: 10px;
}

.afk-clock__color-picker {
  display: flex;
  align-items: center;
  gap: 10px;
}

.afk-clock__controls label {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  transition: color $transition-speed ease;
}

.afk-clock__controls select {
  background-color: rgba($light-color, 0.1);
  color: $light-color;
  border: 1px solid rgba($light-color, 0.2);
  padding: 8px 12px;
  border-radius: $border-radius;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: background $transition-speed ease, color $transition-speed ease, border $transition-speed ease;

  .afk-clock--light & {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
    border-color: rgba($primary-color, 0.2);
  }

  &:hover {
    background-color: rgba($light-color, 0.15);
    .afk-clock--light & {
      background-color: rgba($primary-color, 0.15);
    }
  }
}

.afk-clock__controls input[type='color'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  background: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
}

@include sm {
  .afk-clock__display {
    flex-wrap: wrap;
    min-height: auto;
    padding: 20px 0;
  }

  .afk-clock__container {
    margin: 10px;
  }

  .afk-clock__controls {
    width: 100%;
    max-width: 800px;
  }
}`
    }
  },
  {
    id: '2048-game',
    title: '2048',
    description: 'A polished 4x4 2048 game with keyboard + swipe controls, score tracking, win/lose overlays, and best-score persistence.',
    techStack: ['React', 'TypeScript', 'SCSS', 'Game Development'],
    challenges: 'Implementing deterministic tile merging rules, handling input across keyboard and touch, and designing a clean UI that fits the site theme for both dark and light modes.',
    results: 'A smooth, responsive 2048 clone. My high score is 16548. Let me know if you beat it!',
    category: 'game',
    date: '2025',
    widgetComponent: Game2048,
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'A NY Times Wordle remake where you have 6 attempts to guess a 5-letter word. Each guess provides color-coded feedback: green for correct letters in the right position, yellow for correct letters in the wrong position, and gray for letters not in the word.',
    techStack: ['React', 'TypeScript', 'SCSS', 'Game Development'],
    challenges: 'Implementing accurate letter state checking (correct position, present but wrong position, absent), keyboard color feedback, daily word selection, and creating a clean UI that matches the NYT Wordle design.',
    results: 'A faithful Wordle clone with daily word puzzles, color-coded feedback, and an intuitive keyboard interface.',
    category: 'game',
    date: '2025',
    widgetComponent: Wordle,
  },
  {
    id: 'wavelength',
    title: 'Wavelength',
    description: 'A party game where teams try to guess where a secret target lies on a spectrum between two opposite concepts. One player gives a clue, and their team tries to guess the exact position on the wavelength.',
    techStack: ['React', 'TypeScript', 'SCSS', 'SVG', 'Game Development'],
    challenges: 'Implementing a semicircle board with draggable needles, accurate angle calculations for touch and mouse input, press-and-hold secret reveal mechanism, and a scoring system based on wedge distances from the target.',
    results: 'A polished party game with smooth drag interactions, responsive design, and an intuitive UI that works great for pass-and-play gameplay.',
    category: 'game',
    date: '2025',
    widgetComponent: WavelengthGame,
  },
  {
    id: 'quant-ai-agents',
    title: 'Quant AI Agents for Multiple Industries',
    description: 'Built AI agents for various industries including utility companies, pizza shops, restaurants, retail, malls, banks, policy, and government sectors.',
    techStack: ['Python', 'JavaScript', 'TypeScript', 'YAML', 'OpenAI API', 'AI Agents', 'Flask', 'ServiceNow', 'CrewAI', 'DifyAI', 'Voice AI', 'Chat AI', 'Ansible', 'Docker', 'PyAutoGUI', 'Celery', 'Redis'],
    category: 'web',
    date: '2024-2025',
    challenges: 'Built agents that could handle everything from taking pizza orders to helping banks with policy questions. Each industry had completely different needs - a utility company agent needed to troubleshoot service issues, while a restaurant agent had to manage reservations and answer menu questions. The challenge was making each one feel natural and actually useful, not just a chatbot reading scripts.',
    results: 'Shipped working agents across 8+ different industries in under 6 months. Clients actually used them, which was the real win. Learned a ton about adapting AI to wildly different business contexts.',
  },
  {
    id: 'further-behavioral-health',
    title: 'Further Behavioral Health AI Agents',
    description: 'Built and maintained voice AI agents for various behavioral health programs including substance abuse, mental health disorders, eating disorders, sex addiction, gambling addiction, in both inpatient and outpatient facilities. Also created chat agents for instant facility answers, voice agents for human admission agent training scenarios, and a two-way SMS alumni support coordinator AI agent.',
    techStack: ['Python', 'Django', 'OpenAI API', 'Anthropic API', 'Voice AI', 'Chat AI', 'SMS Integration', 'RetellAI', 'Langfuse', 'Twilio', 'CekuraAI'],
    category: 'web',
    date: '2025',
    challenges: 'Developed specialized AI agents with advanced capabilities including scheduling appointments and tours, collecting survey data, extracting insurance information for verification of benefits, sending information via SMS during calls, performing admissions intake, gathering and providing facility information, and arranging callbacks. Ensured appropriate responses for sensitive behavioral health contexts while maintaining HIPAA compliance and integrating with existing facility systems.',
    results: 'Successfully deployed and maintain 5+ AI agents serving behavioral health facilities, improving intake efficiency, providing 24/7 support for admissions and inquiries, and enhancing training programs for human agents.',
  },
];

export const homepageProjects = projects;

export const projectsPageProjects = projects.filter(
  (p) => p.id !== 'quant-ai-agents' && p.id !== 'further-behavioral-health'
);

export const featuredProjects = projects.slice(0, 3);
