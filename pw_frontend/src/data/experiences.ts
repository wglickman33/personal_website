export interface Experience {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    skills: string[];
    logo?: string;
  }
  
export const experiences: Experience[] = [
  {
    title: 'Junior AI Engineer',
    company: 'Quant Inc.',
    location: 'Remote',
    period: 'November 2024 - June 2025',
    description: 'Built AI agents for various industries including utility companies, pizza shops, restaurants, retail, malls, banks, policy, and government sectors. Shipped working agents across 8+ different industries in under 6 months. Clients actually used them, which was the real win. Learned a ton about adapting AI to wildly different business contexts.',
    skills: ['Python', 'JavaScript', 'TypeScript', 'OpenAI API', 'AI Agents', 'Flask', 'ServiceNow', 'CrewAI', 'DifyAI', 'Voice AI', 'Chat AI', 'Ansible', 'Docker'],
  },
  {
    title: 'Agentic AI Software Engineer',
    company: 'Further (Talk Further)',
    location: 'Remote',
    period: 'June 2025 - Present',
    description: 'Building and maintaining voice AI agents for behavioral health facilities including substance abuse, mental health, eating disorders, and outpatient programs. Working with customer success managers, directors, VPs of sales, and clients. Created chat agents for instant facility answers, voice agents for human admission agent training scenarios, and a two-way SMS alumni support coordinator AI agent. Maintain 5+ agents with capabilities including scheduling appointments, collecting survey data, extracting insurance information, sending SMS during calls, performing admissions intake, and arranging callbacks.',
    skills: ['Python', 'OpenAI API', 'Anthropic API', 'Voice AI', 'Chat AI', 'SMS Integration', 'RetellAI', 'Langfuse', 'Twilio', 'CekuraAI', 'Product Management'],
  },
  {
    title: 'Chief of Staff, Flight Training, and Curriculum Management',
    company: 'Aviato Drone & Code (Aviato DC)',
    location: 'New York',
    period: 'July 2023 - November 2024',
    description: 'Served as Chief of Staff, Flight Training, and Curriculum Management. Taught Part 107 drone license courses for students 16+ and JavaScript-based block coding to kids aged 8-13. Created 6 different curricula from scratch using DroneBlocks and Part 107 curricula. Taught in schools and camps, helping students learn to code, fly drones, and understand fundamentals of code logic and syntax. Sometimes had 20 eight-year-olds with only 1 paying attention, but teaching that 1 was worth every second.',
    skills: ['Leadership', 'Teaching', 'Curriculum Development', 'JavaScript', 'Block Coding', 'DroneBlocks', 'Part 107 Certification', 'Staff Management'],
  },
  {
    title: 'Sales Assistant & Web Developer',
    company: 'BG Workspace Solutions',
    location: 'New York',
    period: 'August 2023 - Present',
    description: 'Started in August 2023 assisting with furniture sales and building equipment for showrooms and clients. Began developing their website in September 2024 and launched it the same month. Created a sales efficiency platform representing office furniture manufacturers that routes clients to boost sales efficiency.',
    skills: ['React', 'JavaScript', 'SCSS', 'Sales', 'Client Relations'],
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
    title: 'Orthodontics Assistant',
    company: 'Oppenheimer Orthodontics',
    location: 'Cedarhurst, New York',
    period: 'May 2022 - August 2023',
    description: 'Worked as an orthodontics assistant. Learned the importance of understanding patients and their stories, which directly applies to building AI agents for behavioral health facilities. Everyone\'s background and experience matters.',
    skills: ['Patient Care', 'Healthcare', 'Communication', 'Attention to Detail'],
  },
  {
    title: 'Phlebotomy & EKG Intern',
    company: 'MZF Medical Services PC',
    location: 'Hicksville, New York',
    period: 'June - August 2021',
    description: 'Worked as a phlebotomy and EKG intern, drawing blood, taking EKGs, and packaging blood samples. Gained hands-on healthcare experience that helps me understand patients, callers, and families when building healthcare AI agents.',
    skills: ['Phlebotomy', 'EKG', 'Healthcare', 'Patient Care', 'NHA Certification', 'ICD-10 Codes'],
  },
  {
    title: 'Personal Website - Work in Progress',
    company: 'williamglickman.com',
    location: 'Remote',
    period: 'December 2025 - Present',
    description: 'This site is continuously evolving. Started December 2025 and counting. More features, content, and improvements coming soon.',
    skills: ['React', 'TypeScript', 'SCSS', 'Web Development', 'UI/UX Design'],
  },
  ];
  
  export default experiences;
