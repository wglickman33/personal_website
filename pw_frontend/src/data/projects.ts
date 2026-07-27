import { ComponentType } from 'react';
import CircularMenu from '../components/widgets/CircularMenu/CircularMenu';
import Game2048 from '../components/widgets/2048Game/2048Game';
import Wordle from '../components/widgets/Wordle/Wordle';
import WavelengthGame from '../components/widgets/WavelengthGame/WavelengthGame';
import AFKClock from '../components/widgets/AFKClock/AFKClock';
import IconsShowcase from '../components/widgets/IconsShowcase/IconsShowcase';
import PomodoroTimer from '../components/widgets/PomodoroTimer/PomodoroTimer';
import Calculator from '../components/widgets/Calculator/Calculator';
import DrawingCanvas from '../components/widgets/DrawingCanvas/DrawingCanvas';
import ColorSortPuzzle from '../components/widgets/ColorSortPuzzle/ColorSortPuzzle';
import CapitalVenture from '../components/widgets/CapitalVenture/CapitalVenture';

import circularMenuTsx from '../components/widgets/CircularMenu/CircularMenu.tsx?raw';
import circularMenuScss from '../components/widgets/CircularMenu/CircularMenu.scss?raw';
import afkClockTsx from '../components/widgets/AFKClock/AFKClock.tsx?raw';
import afkClockScss from '../components/widgets/AFKClock/AFKClock.scss?raw';

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
    description: 'Co-founded and lead all engineering for a full-stack, multi-vendor kosher food delivery platform serving the Five Towns, NYC, NJ, and the Hamptons. Customers can order from up to 11 restaurant partners in a single checkout, with a dedicated B2B vertical delivering to nursing home residents.',
    techStack: ['React', 'TypeScript', 'JavaScript', 'SCSS', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize ORM', 'JWT Auth', 'RBAC', 'Stripe API', 'Material UI', 'Recharts', 'Mailchimp API', 'Shipday API', 'Cloudinary', 'Server-Sent Events', 'Heroku', 'Netlify'],
    liveLink: 'https://mykosherdelivery.netlify.app',
    githubLink: 'https://github.com/wglickman33/mykosherdelivery',
    challenges: 'Architected the entire stack solo: a multi-vendor cart and checkout system with zone-based delivery validation, custom JWT authentication with role-based access control across four user types (customers, admins, restaurant owners, facility staff), and server-side Stripe validation to prevent price tampering. Built a full admin platform with revenue/profit analytics, promo and refund handling, and an audit-logged action history, plus a separate nursing-home ordering vertical with its own facility, resident, and billing management running on a different weekly cadence than the core consumer app.',
    results: '1,500+ hours of development, 120,000+ lines of code. A production platform serving real customers and 11 restaurant partners, with real-time order updates via Server-Sent Events and a full operational admin dashboard behind it.',
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
    id: 'further-behavioral-health',
    title: 'Behavioral Health AI Admissions Agents',
    description: 'Joined as the sole engineer on the Behavioral Health product team (since grown to four engineers with a dedicated manager), building production AI voice and chat admissions agents for treatment facilities across substance use, mental health, eating disorder, and outpatient care.',
    techStack: ['Python', 'Django', 'OpenAI API', 'Anthropic Claude API', 'Voice AI Agents', 'Conversational AI', 'Langfuse', 'PostgreSQL'],
    category: 'web',
    date: '2025',
    challenges: 'Redesigned a single static AI prompt into a dynamic, injectable prompt architecture that adapts intake flow, persona, and conversation logic in real time based on facility type and context. Built and owned four facility-typed phone AI agents with crisis escalation, live transfer, and scheduling tooling, plus a separate AI training product that simulates prospective callers so facility staff could practice live admissions conversations. Built an LLM evaluation framework from scratch in Langfuse, including multi-turn tool-use simulation and LLM-as-judge scoring, so agents could be tested against production-faithful conversations before shipping.',
    results: 'Deployed and maintain AI voice and chat agents across every facility type in a regulated healthcare environment, with an evaluation pipeline that catches regressions in crisis handling, insurance flow, and intake accuracy before they ever reach a real caller.',
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
    id: 'tori',
    title: 'Tori - Home Inventory Management',
    description: 'A home inventory management system designed like a handwritten notebook to give users a "write in their notebook" vibe. Features my own handwriting font and was hand-drawn before being recreated with code. Created as my BrainStation bootcamp capstone project.',
    techStack: ['React', 'JavaScript', 'SCSS', 'Custom Fonts', 'Firebase'],
    githubLink: 'https://github.com/wglickman33/Tori',
    challenges: 'Designed the entire interface by hand first, then recreated it digitally. Created a custom handwriting font to match the aesthetic. Built item and category management functionality with a unique notebook-style UI.',
    results: 'Finished top of the class at BrainStation bootcamp with this project. Got very far along with the ability to manage items and categories, creating a unique and personal user experience.',
    category: 'web',
    date: 'October 2024',
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
      tsx: circularMenuTsx,
      scss: circularMenuScss,
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
      tsx: afkClockTsx,
      scss: afkClockScss,
    }
  },
  {
    id: 'icons-showcase',
    title: 'Icons Showcase',
    description: 'A collection of custom-designed SVG icons featuring interactive morphing animations and static artistic, geometric, and organic designs. Demonstrates SVG path manipulation, morphing animations, and creative icon design.',
    techStack: ['React', 'TypeScript', 'SCSS', 'SVG', 'SVG Morphing', 'Animations'],
    challenges: 'Creating smooth SVG path morphing animations between different shapes, implementing interactive hover effects, and designing a diverse collection of icons across multiple categories (interactive, artistic, geometric, organic).',
    results: 'A showcase of 18+ custom SVG icons with smooth morphing animations, interactive hover effects, and a clean grid layout that demonstrates advanced SVG manipulation techniques.',
    category: 'widget',
    date: '2025',
    widgetComponent: IconsShowcase,
  },
  {
    id: 'pomodoro-timer',
    title: 'Pomodoro Timer',
    description: 'A productivity-focused Pomodoro timer with work sessions, short breaks, and long breaks. Features a circular progress indicator, session tracking, and automatic mode switching to help you maintain focus and productivity.',
    techStack: ['React', 'TypeScript', 'SCSS', 'SVG', 'Timer Logic'],
    challenges: 'Implementing accurate countdown timer logic with proper cleanup, creating a smooth circular progress animation using SVG, managing state transitions between work and break modes, and ensuring the timer persists correctly through mode changes.',
    results: 'A fully functional Pomodoro timer that automatically switches between 25-minute work sessions, 5-minute short breaks, and 15-minute long breaks after every 4 completed sessions. Perfect for maintaining focus and productivity.',
    category: 'widget',
    date: '2025',
    widgetComponent: PomodoroTimer,
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'A beautiful macOS-style calculator with a modern design that matches the app theme. Features basic arithmetic operations, percentage calculations, sign toggling, and a clean, intuitive interface.',
    techStack: ['React', 'TypeScript', 'SCSS', 'State Management'],
    challenges: 'Implementing accurate calculation logic with proper order of operations, handling edge cases like division by zero, managing state transitions between operations, and creating a responsive design that works in both full and preview modes.',
    results: 'A fully functional calculator with a sleek dark theme, smooth button interactions, and proper mathematical operations. The design closely matches the macOS calculator aesthetic while maintaining consistency with the app\'s overall styling.',
    category: 'widget',
    date: '2025',
    widgetComponent: Calculator,
  },
  {
    id: 'drawing-canvas',
    title: 'Drawing Canvas',
    description: 'An interactive drawing canvas with color picker, adjustable brush size, and smooth drawing experience. Perfect for quick sketches, doodles, or creative expression. Supports both mouse and touch input for desktop and mobile devices.',
    techStack: ['React', 'TypeScript', 'SCSS', 'HTML5 Canvas API'],
    challenges: 'Implementing smooth drawing with HTML5 Canvas, handling both mouse and touch events for cross-device compatibility, managing canvas state and redraws, and creating an intuitive color picker and brush size controls.',
    results: 'A fully functional drawing canvas with 10 vibrant colors, adjustable brush sizes (2-20px), smooth drawing strokes, and a clean interface. The canvas automatically adapts to light and dark themes, providing an enjoyable drawing experience on any device.',
    category: 'widget',
    date: '2025',
    widgetComponent: DrawingCanvas,
  },
  {
    id: 'color-sort-puzzle',
    title: 'Color Sort Puzzle',
    description: 'A satisfying puzzle game where you sort colored balls into test tubes. Tap a tube to select it, then tap another to pour. The goal is to have each tube contain only one color. Features smooth animations, move tracking, and a clean, modern game interface.',
    techStack: ['React', 'TypeScript', 'SCSS', 'Game Logic', 'State Management'],
    challenges: 'The primary challenge was ensuring that every generated puzzle is beatable. Since it is difficult to predict all possible game outcomes and validate every potential move sequence, the solution required generating puzzles by starting from a solved state and performing valid reverse moves. This guarantees solvability while still creating challenging, shuffled puzzles. Additional challenges included implementing the pouring logic that moves multiple balls of the same color at once, creating smooth animations, managing game state and win conditions, and building an intuitive game UI with move tracking and undo functionality.',
    results: 'A fully functional puzzle game with 8 distinct colors, 9 test tubes (8 colors + 1 empty), and satisfying pour animations. The game guarantees every puzzle is solvable by using reverse-move generation from solved states. Features include move tracking, undo functionality, win detection, reset capability, and a polished game interface with visual feedback for valid and invalid moves.',
    category: 'game',
    date: '2025',
    widgetComponent: ColorSortPuzzle,
  },
  {
    id: 'capital-venture',
    title: 'Capital Venture',
    description: 'An idle clicker game inspired by AdVenture Capitalist, themed around building a portfolio of creative and business ventures. Click to earn capital, invest in 10 different ventures, hire managers for automation, purchase upgrades, and prestige for permanent multipliers. Features a custom BigNumber system for handling extremely large values without precision loss.',
    techStack: ['React', 'TypeScript', 'SCSS', 'Game Loop', 'State Management', 'LocalStorage', 'BigNumber System'],
    challenges: 'Implementing a custom BigNumber system to handle very large numbers without floating-point precision issues. Creating an accurate economic model with geometric cost scaling, milestone multipliers, and prestige calculations. Optimizing performance with memoization and binary search algorithms. Ensuring all edge cases are handled including negative numbers, Infinity, NaN, and corrupted save data. Implementing a smooth game loop using requestAnimationFrame with proper delta time handling.',
    results: 'A fully functional idle clicker game with 10 brand-themed ventures, managers for automation, global and venture-specific upgrades, prestige system with permanent multipliers, and comprehensive buy modes (x1, x5, x10, x100, Next, Max). The game features accurate BigNumber calculations, optimized performance, auto-save functionality, and a polished UI that matches the site theme. All edge cases are handled, and the game is production-ready with zero known bugs.',
    category: 'game',
    date: '2025',
    widgetComponent: CapitalVenture,
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
];

export const homepageProjects = projects;

export const projectsPageProjects = projects.filter(
  (p) => p.id !== 'quant-ai-agents' && p.id !== 'further-behavioral-health'
);

export const featuredProjects = projects.slice(0, 3);