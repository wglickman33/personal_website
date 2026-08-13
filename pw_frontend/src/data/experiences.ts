export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  logo?: string;
  liveLink?: string;
  githubLink?: string;
}

export const experiences: Experience[] = [
{
  title: 'Creator & Full-Stack Engineer',
  company: 'Tori',
  location: 'Remote',
  period: 'August 2026 - Present',
  description: 'Rebuilt my first-ever app (BrainStation capstone) into a full-stack household inventory product in about a week: shared households with invite codes, searchable inventory with tags/locations/folders and photo uploads, expiration and value tracking, and live sync via Server-Sent Events. ~25,000 lines of code, ~40 hours, deployed on Netlify and Heroku.',
  skills: ['React', 'TypeScript', 'SCSS', 'Vite', 'Zustand', 'Node.js', 'Express.js', 'PostgreSQL', 'Sequelize ORM', 'JWT Authentication', 'Server-Sent Events', 'Cloudinary', 'MiniSearch', 'Zod', 'Heroku', 'Netlify'],
  liveLink: 'https://torihome.netlify.app',
  githubLink: 'https://github.com/wglickman33/Tori',
},
{
  title: 'Creator & Full-Stack Engineer',
  company: 'Scout Sports',
  location: 'Remote',
  period: 'August 2026 - Present',
  description: 'Built Scout Sports so I could follow Knicks/Mets/Giants/Rangers games on Shabbat without using devices, after Amazon Alexa (Echo) and Google Home (Nest) proved useless at timely scores (updates days late), and after refusing to buy a $200 Tidbyt that looked ugly and overpriced for what it is. Jumbotron scoreboard with fullscreen wake-lock that stays on all day, team and league favorites for the sports I care about, and auto-cycling so late finishes still show up before the Saturday morning newspaper. Multi-league live scores (ESPN + TheSportsDB), box scores, JWT auth API. First TypeScript + Tailwind project. ~7,500 lines of code (~20% tests), ~20-25 hours, live on Netlify and Heroku.',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'TanStack Query', 'Radix UI', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT Authentication', 'ESPN API', 'TheSportsDB', 'Heroku', 'Netlify'],
  liveLink: 'https://scoutsports.netlify.app',
  githubLink: 'https://github.com/wglickman33/Scout',
},
{
  title: 'Personal Website - Work in Progress',
  company: 'wglickman.com',
  location: 'Remote',
  period: 'December 2025 - Present',
  description: 'This site is continuously evolving. Started December 2025 and counting. More features, content, and improvements coming soon.',
  skills: ['React', 'TypeScript', 'SCSS', 'Web Development', 'UI/UX Design'],
  liveLink: 'https://wglickman.com',
  githubLink: 'https://github.com/wglickman33/personal_website',
},
{
  title: 'Creator & Full-Stack Engineer',
  company: 'Whisk',
  location: 'Remote',
  period: 'July 2026 - Present',
  description: 'Built and shipped a full-stack recipe app and kitchen toolkit solo: cloud-synced recipes with folders and import, collaborative shopping lists with Server-Sent Events, 31 privacy-first browser tools, and light/dark/auto theming. ~35,000 lines of code, 285 automated tests, deployed on Netlify and Heroku.',
  skills: ['React', 'TypeScript', 'Vite', 'Zustand', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'JWT Authentication', 'Server-Sent Events', 'Spoonacular API', 'EmailJS', 'Heroku', 'Netlify'],
  liveLink: 'https://trywhisk.netlify.app',
  githubLink: 'https://github.com/wglickman33/Whisk',
},
{
  title: 'Agentic AI Software Engineer',
  company: 'Further (Talk Further)',
  location: 'Remote',
  period: 'June 2025 - Present',
  description: 'Joined as the sole engineer on the Behavioral Health team (since grown to four engineers with a dedicated manager), building production AI voice and chat admissions agents across substance use, mental health, eating disorder, and outpatient facility types. Redesigned a static prompt into a dynamic, injectable architecture, built the crisis escalation and live transfer tools these agents rely on, and built an evaluation framework from scratch so agents are tested against production-faithful conversations before they ship.',
  skills: ['Python', 'Django', 'OpenAI API', 'Anthropic API', 'Voice AI', 'Chat AI', 'SMS Integration', 'Twilio', 'Langfuse', 'Product Management'],
},
{
  title: 'Co-Founder & CTO',
  company: 'My Kosher Delivery',
  location: 'Remote',
  period: 'February 2025 - Present',
  description: 'Co-founded and lead all engineering for a full-stack, multi-vendor kosher food delivery platform serving the Five Towns, NYC, NJ, and the Hamptons, partnering with 11 restaurants and a dedicated B2B nursing-home vertical. Architected the complete stack solo, from JWT authentication and role-based access control to Stripe payments with server-side order validation and a full admin analytics platform.',
  skills: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize ORM', 'Stripe API', 'JWT Authentication', 'RBAC'],
  liveLink: 'https://mykosherdelivery.netlify.app',
  githubLink: 'https://github.com/wglickman33/mykosherdelivery',
},
{
  title: 'Junior AI Engineer',
  company: 'Quant Inc.',
  location: 'Remote',
  period: 'November 2024 - May 2025',
  description: 'Built AI agents for various industries including utility companies, pizza shops, restaurants, retail, malls, banks, policy, and government sectors. Shipped working agents across 8+ different industries in under 6 months. Clients actually used them, which was the real win. Learned a ton about adapting AI to wildly different business contexts.',
  skills: ['Python', 'JavaScript', 'TypeScript', 'OpenAI API', 'AI Agents', 'Flask', 'ServiceNow', 'CrewAI', 'DifyAI', 'Voice AI', 'Chat AI', 'Ansible', 'Docker'],
},
{
  title: 'Full-Stack Developer',
  company: 'BG Workspace Solutions',
  location: 'Remote',
  period: 'August 2023 - Present',
  description: 'Build and maintain a ReactJS web application for a B2B office furniture company, connecting businesses with premium furniture manufacturers to streamline commercial workspace procurement. Own ongoing feature development, UI updates, and client-facing functionality as the company\'s sole engineer.',
  skills: ['React', 'JavaScript', 'SCSS', 'Web Development'],
  liveLink: 'https://www.bgworkspace.com',
  githubLink: 'https://github.com/wglickman33/bgworkspace',
},
{
  title: 'Chief of Staff, Flight Training, and Curriculum Management',
  company: 'Aviato Drone & Code (Aviato DC)',
  location: 'New York',
  period: 'July 2023 - June 2025',
  description: 'Served as Chief of Staff, Flight Training, and Curriculum Management. Taught Part 107 drone license courses for students 16+ and JavaScript-based block coding to kids aged 8-13. Created 7 different curricula from scratch using DroneBlocks and Part 107 curricula. Led hiring, training, and performance management for a 15-person team, expanding the customer base by 300%. Sometimes had 20 eight-year-olds with only 1 paying attention, but teaching that 1 was worth every second.',
  skills: ['Leadership', 'Teaching', 'Curriculum Development', 'JavaScript', 'Block Coding', 'DroneBlocks', 'Part 107 Certification', 'Staff Management'],
},
{
  title: 'Orthodontics Assistant',
  company: 'Oppenheimer Orthodontics',
  location: 'Cedarhurst, New York',
  period: 'May 2022 - August 2023',
  description: 'Worked as an orthodontics assistant. Learned the importance of understanding patients and their stories, which directly applies to building AI agents for behavioral health facilities. Everyone\'s background and experience matters.',
  skills: ['Patient Care', 'Healthcare', 'Communication', 'Attention to Detail'],
},
{
  title: 'General Chemistry Teaching Assistant',
  company: 'Binghamton University',
  location: 'Vestal, NY',
  period: 'August 2021 - August 2023',
  description: 'Served as Teaching Assistant for General Chemistry courses. Was the only consistent undergrad TA with 15+ students showing up to weekly office hours. Fellow TAs told me no one showed up to theirs. Helped students understand complex chemistry concepts, break down problems, and simplify difficult material. Created questions for exams and quizzes to help students prepare for exams.',
  skills: ['Teaching', 'Chemistry', 'Student Support', 'Problem Solving', 'Communication'],
},
{
  title: 'Phlebotomy & EKG Intern',
  company: 'MZF Medical Services PC',
  location: 'Hicksville, New York',
  period: 'June - August 2021',
  description: 'Worked as a phlebotomy and EKG intern, drawing blood, taking EKGs, and packaging blood samples. Gained hands-on healthcare experience that helps me understand patients, callers, and families when building healthcare AI agents.',
  skills: ['Phlebotomy', 'EKG', 'Healthcare', 'Patient Care', 'NHA Certification', 'ICD-10 Codes'],
},
];

export default experiences;