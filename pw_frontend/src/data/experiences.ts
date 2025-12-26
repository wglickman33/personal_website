// experiences.ts
export interface Experience {
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    skills: string[];
    logo?: string;
  }
  
  const experiences: Experience[] = [
    {
      title: "Senior Software Engineer",
      company: "TechInnovate",
      location: "San Francisco, CA",
      period: "2021 - Present",
      description: "Leading the development of web applications using React, TypeScript, and Node.js. Designed and implemented scalable architectures for enterprise clients. Collaborated with cross-functional teams to deliver high-quality solutions on time and within budget.",
      skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "CI/CD"],
      logo: "/assets/images/experiences/techinnovate.svg"
    },
    {
      title: "UI/UX Developer",
      company: "DesignWorks Studio",
      location: "Boston, MA",
      period: "2019 - 2021",
      description: "Created intuitive user interfaces and experiences for web and mobile applications. Utilized Figma for design and prototyping, then implemented designs using modern frontend technologies. Conducted user testing and incorporated feedback into iterative design improvements.",
      skills: ["UI Design", "Figma", "React", "SCSS", "User Testing", "Design Systems"],
      logo: "/assets/images/experiences/designworks.svg"
    },
    {
      title: "AI Research Assistant",
      company: "NeuroCognitive Lab",
      location: "Cambridge, MA",
      period: "2017 - 2019",
      description: "Applied machine learning techniques to analyze brain imaging data. Developed Python scripts for data processing and visualization. Collaborated on research papers exploring the intersection of neuroscience and artificial intelligence.",
      skills: ["Python", "TensorFlow", "Data Analysis", "Research", "Jupyter", "Scientific Writing"],
      logo: "/assets/images/experiences/neurolab.svg"
    },
    {
      title: "Graduate Research Assistant",
      company: "University Research Center",
      location: "Boston, MA",
      period: "2015 - 2017",
      description: "Conducted research in computational neuroscience, focusing on neural network models of cognition. Designed and executed experiments to validate theoretical models. Presented findings at international conferences and published in peer-reviewed journals.",
      skills: ["Neuroscience", "MATLAB", "Statistical Analysis", "Academic Research", "Public Speaking"],
      logo: "/assets/images/experiences/university.svg"
    }
  ];
  
  export default experiences;