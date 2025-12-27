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
  category: 'web' | 'ai' | 'design';
  date: string;
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
    date: '2024',
  },
  {
    id: 'quant-ai-agents',
    title: 'Quant AI Agents for Multiple Industries',
    description: 'Built AI agents for various industries including utility companies, pizza shops, restaurants, retail, malls, banks, policy, and government sectors.',
    techStack: ['Python', 'JavaScript', 'TypeScript', 'YAML', 'OpenAI API', 'AI Agents', 'Flask', 'ServiceNow', 'CrewAI', 'DifyAI', 'Voice AI', 'Chat AI', 'Ansible', 'Docker', 'PyAutoGUI', 'Celery', 'Redis'],
    category: 'ai',
    date: '2024-2025',
    challenges: 'Built agents that could handle everything from taking pizza orders to helping banks with policy questions. Each industry had completely different needs - a utility company agent needed to troubleshoot service issues, while a restaurant agent had to manage reservations and answer menu questions. The challenge was making each one feel natural and actually useful, not just a chatbot reading scripts.',
    results: 'Shipped working agents across 8+ different industries in under 6 months. Clients actually used them, which was the real win. Learned a ton about adapting AI to wildly different business contexts.',
  },
  {
    id: 'further-behavioral-health',
    title: 'Further Behavioral Health AI Agents',
    description: 'Built and maintained voice AI agents for various behavioral health programs including substance abuse, mental health disorders, eating disorders, sex addiction, gambling addiction, in both inpatient and outpatient facilities. Also created chat agents for instant facility answers, voice agents for human admission agent training scenarios, and a two-way SMS alumni support coordinator AI agent.',
    techStack: ['Python', 'Django', 'OpenAI API', 'Anthropic API', 'Voice AI', 'Chat AI', 'SMS Integration', 'RetellAI', 'Langfuse', 'Twilio', 'CekuraAI'],
    category: 'ai',
    date: '2025',
    challenges: 'Developed specialized AI agents with advanced capabilities including scheduling appointments and tours, collecting survey data, extracting insurance information for verification of benefits, sending information via SMS during calls, performing admissions intake, gathering and providing facility information, and arranging callbacks. Ensured appropriate responses for sensitive behavioral health contexts while maintaining HIPAA compliance and integrating with existing facility systems.',
    results: 'Successfully deployed and maintain 5+ AI agents serving behavioral health facilities, improving intake efficiency, providing 24/7 support for admissions and inquiries, and enhancing training programs for human agents.',
  },
];

export const featuredProjects = projects.slice(0, 3);
