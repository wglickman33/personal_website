export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'education' | 'work' | 'achievement' | 'milestone';
  link?: string;
  linkText?: string;
  image?: string;
  downloads?: Array<{
    url: string;
    text: string;
  }>;
}

export const timelineItems: TimelineItem[] = [
  {
    id: 'high-school',
    date: 'May 2020',
    title: 'High School Graduation',
    description: 'Graduated high school, ready to dive into college. I considered becoming a doctor, maybe even a neurosurgeon, but wasn\'t sure whether to study neuroscience, biology, or chemistry.',
    category: 'education',
  },
  {
    id: 'college-start',
    date: 'August 2020',
    title: 'Started College',
    description: 'Began studying Integrative Neuroscience at Binghamton University on the pre-med track.',
    category: 'education',
  },
  {
    id: 'phlebotomy-intern',
    date: 'June - August 2021',
    title: 'Phlebotomy & EKG Intern',
    description: 'Worked as a phlebotomy and EKG intern at MZF Medical Services PC, drawing blood, taking EKGs, and packaging blood samples with ICD-10 codes. Also collected urine, fecal, and saliva samples.',
    category: 'work',
  },
  {
    id: 'ta-start',
    date: 'August 2021 - August 2023',
    title: 'General Chemistry TA',
    description: 'Started as a Teaching Assistant for General Chemistry 1 and 2 at Binghamton University. Was the only consistent undergrad TA with 15+ students showing up to weekly office hours. Fellow TAs told me no one showed up to theirs. Created questions for exams and quizzes to help students prepare.',
    category: 'work',
  },
  {
    id: 'phlebotomy-license',
    date: 'June 2022',
    title: 'NHA Certified Phlebotomy Technician (CPT)',
    description: 'Earned NHA Certified Phlebotomy Technician (CPT) certification, a nationally recognized credential that validates competency in drawing blood for medical tests, transfusions, research, and donations. Demonstrates proficiency in safety protocols, patient preparation, blood collection techniques, and specimen processing.',
    category: 'achievement',
  },
  {
    id: 'orthodontics',
    date: 'May 2022 - August 2023',
    title: 'Orthodontics Assistant at Oppenheimer Orthodontics',
    description: 'Worked as an orthodontics assistant in Cedarhurst, New York. Assisted on standard procedures and got to watch some pretty cool upper-level ones, while also handling sterilization, equipment upkeep, scheduling, and general office support. Learned the importance of understanding patients and their stories.',
    category: 'work',
  },
  {
    id: 'aviato-start',
    date: 'July 2023',
    title: 'Chief of Staff, Flight Training, and Curriculum Management at Aviato Drone & Code',
    description: 'Started as Chief of Staff, Flight Training, and Curriculum Management. Taught Part 107 drone license courses and JavaScript-based block coding to kids. Created 7 different curricula in Canva using information from the DroneBlocks and Part 107 curricula.',
    category: 'work',
  },
  {
    id: 'college-graduation',
    date: 'August 2023',
    title: 'BS in Integrative Neuroscience, Magna Cum Laude',
    description: 'Graduated 2 semesters early with honors from Binghamton University. Completed degree in 3 years instead of 4.',
    category: 'achievement',
  },
  {
    id: 'bg-workspace-start',
    date: 'August 2023',
    title: 'BG Workspace Solutions',
    description: 'Started working with BG Workspace Solutions, assisting with furniture sales and building equipment for showrooms and clients.',
    category: 'work',
  },
  {
    id: 'heroin-paper',
    date: 'August 2023',
    title: 'Heroin Addiction Treatment Paper',
    description: 'Wrote a paper on treating heroin addiction (non-pharmacological anti-addiction treatment) that was intended for publication in my Masters of Molecular and Cellular Pharmacology program, en route to a PhD in Neuropharmacology that was supposed to start in August 2024.',
    category: 'achievement',
    downloads: [
      {
        url: '/papers/treating-heroin-addiction-paper.docx',
        text: 'Download Paper (DOCX)',
      },
      {
        url: '/papers/treating-heroin-addiction-presentation.pdf',
        text: 'Download Presentation (PDF)',
      },
    ],
  },
  {
    id: 'drone-license',
    date: 'October 2023 - October 2025',
    title: 'Part 107 Remote Drone Pilot License',
    description: 'Earned Part 107 remote drone pilot license after teaching myself the material in a few weeks. License expired in October 2025. Chose not to renew as it\'s no longer needed at this moment.',
    category: 'achievement',
  },
  {
    id: 'coding-decision',
    date: 'May 2024',
    title: 'Decision to Switch to Coding',
    description: 'Unenrolled from the PhD program. Decided not to spend 7-8 more years in school. Researched masters bridge programs vs bootcamps, ultimately choosing bootcamp for hands-on learning and a full scholarship.',
    category: 'milestone',
  },
  {
    id: 'self-teaching',
    date: 'June 9, 2024 - Present',
    title: 'Started Teaching Myself to Code',
    description: 'Began self-teaching coding, combining my love for creativity and problem-solving. Spent countless hours learning from Codecademy, Web Dev Simplified, Harvard CS50, Coding2Go, and Bro Code. This self-directed learning journey continues to this day.',
    category: 'milestone',
  },
  {
    id: 'bootcamp-start',
    date: 'July 2024',
    title: 'BrainStation Bootcamp',
    description: 'Started full-scholarship bootcamp at BrainStation in a class of 7 cohort members, diving deep into full-stack development.',
    category: 'education',
  },
  {
    id: 'bootcamp-hackathon',
    date: 'September 2024',
    title: 'Won BrainStation x Etsy Hackathon',
    description: 'Won the BrainStation Hackathon with Etsy for our product creation. Prize included a free certificate course, which I used to take a UI Design course.',
    category: 'achievement',
    image: '/images/industry-certificate.JPG',
  },
  {
    id: 'bg-workspace-site',
    date: 'September 2024',
    title: 'Launched BG Workspace Solutions Website',
    description: 'Started developing and launched the BG Workspace Solutions website, a sales efficiency platform for office furniture manufacturers.',
    category: 'work',
    link: 'https://www.bgworkspace.com',
    linkText: 'Visit Website',
  },
  {
    id: 'bootcamp-end',
    date: 'October 2024',
    title: 'Completed Bootcamp - Top of Class',
    description: 'Finished BrainStation bootcamp top of the class. Created a home inventory management system capstone project designed like a handwritten notebook with my own handwriting font. Hand drew the entire site before recreating it with code.',
    category: 'achievement',
    link: 'https://github.com/wglickman33/Tori',
    linkText: 'View on GitHub',
  },
  {
    id: 'quant-start',
    date: 'November 5, 2024',
    title: 'Junior AI Engineer at Quant Inc.',
    description: 'Landed first job less than a month out of bootcamp. Built AI agents for utility companies, pizza shops, restaurants, retail, malls, banks, policy, and government sectors.',
    category: 'work',
  },
  {
    id: 'ui-design-course',
    date: 'December 2024 - February 2025',
    title: 'UI Design Certificate Course',
    description: 'Completed a UI Design certificate course at BrainStation, using the free course prize from winning the BrainStation x Etsy Hackathon. Enhanced my design skills and understanding of user-centered design principles.',
    category: 'education',
  },
  {
    id: 'my-kosher-delivery',
    date: 'February 2025 - Present',
    title: 'Co-Founded My Kosher Delivery',
    description: 'Co-founded and lead all engineering for a full-stack, multi-vendor kosher food delivery platform serving the Five Towns, NYC, NJ, and the Hamptons. Customers can order from up to 11 restaurant partners in a single order, with a dedicated B2B vertical delivering to nursing home residents. 1,500+ hours of development, 120,000+ lines of code, with a full admin dashboard, secure authentication and payments, and real-time order tracking.',
    category: 'work',
    downloads: [
      {
        url: 'https://mykosherdelivery.netlify.app',
        text: 'Visit Live Site',
      },
      {
        url: 'https://github.com/wglickman33/mykosherdelivery',
        text: 'View on GitHub',
      },
    ],
  },
  {
    id: 'quant-end',
    date: 'May 2025',
    title: 'Finished at Quant Inc.',
    description: 'Wrapped up my time as Junior AI Engineer at Quant Inc. Shipped working agents across 8+ industries in under 6 months, and learned a ton about adapting AI to wildly different business contexts.',
    category: 'milestone',
  },
  {
    id: 'further-start',
    date: 'June 9, 2025',
    title: 'Agentic AI Engineer at Further',
    description: 'Started at Further (Talk Further) as the sole engineer on the Behavioral Health team, building production AI voice and chat admissions agents for treatment facilities across substance use, mental health, eating disorder, and outpatient care. Redesigned a static AI prompt into a dynamic, injectable architecture and built an evaluation framework from scratch to test agents before they ever talk to a real caller.',
    category: 'work',
  },
  {
    id: 'aviato-end',
    date: 'June 2025',
    title: 'Finished at Aviato Drone & Code',
    description: 'Completed role as Chief of Staff, Flight Training, and Curriculum Management, having led hiring, training, and performance management for a 15-person team and helped expand the customer base by 300%. Sometimes had 20 eight-year-olds with only 1 paying attention, but teaching that 1 was worth every second. Saw how young minds process new information and utilize it to succeed.',
    category: 'milestone',
  },
  {
    id: 'whisk',
    date: 'July 2026',
    title: 'Launched Whisk',
    description: 'Built and shipped a full-stack recipe app and kitchen toolkit solo: cloud-synced recipes, collaborative shopping lists with real-time updates, 31 privacy-first browser tools, and light/dark/auto theming. ~35,000 lines of code, 285 tests, live on Netlify and Heroku.',
    category: 'achievement',
    downloads: [
      {
        url: 'https://trywhisk.netlify.app',
        text: 'Visit Live Site',
      },
      {
        url: 'https://github.com/wglickman33/Whisk',
        text: 'View on GitHub',
      },
    ],
  },
  {
    id: 'site-wip',
    date: 'December 2025 - Present',
    title: 'Personal Website: Work in Progress',
    description: 'This site is continuously evolving. Started December 2025 and counting. More features, content, and improvements coming soon.',
    category: 'milestone',
  },
];