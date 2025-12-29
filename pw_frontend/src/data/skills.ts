export interface Skill {
  id: string;
    name: string;
  rating: number;
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'product';
  favorite?: boolean;
  description?: string;
  }
  
export const skills: Skill[] = [
  { id: 'react', name: 'React', rating: 4.9, category: 'frontend', favorite: true, description: 'Building interactive UIs with hooks, context, and modern patterns' },
  { id: 'typescript', name: 'TypeScript', rating: 4.1, category: 'frontend', favorite: true, description: 'Type-safe JavaScript for scalable applications' },
  { id: 'javascript', name: 'JavaScript', rating: 4.9, category: 'frontend', favorite: true, description: 'Core language expertise with ES6+ features' },
  { id: 'scss', name: 'SCSS/CSS', rating: 5.0, category: 'frontend', favorite: true, description: 'Advanced styling with variables, mixins, and responsive design' },
  { id: 'html', name: 'HTML', rating: 5.0, category: 'frontend', description: 'Semantic markup and accessibility best practices' },
  { id: 'nextjs', name: 'Next.js', rating: 4.2, category: 'frontend', description: 'React framework with SSR and routing' },
  { id: 'vite', name: 'Vite', rating: 4.5, category: 'frontend', description: 'Fast build tool and dev server' },
  { id: 'material-ui', name: 'Material UI', rating: 4.3, category: 'frontend', description: 'React component library for rapid UI development' },
  { id: 'threejs', name: 'Three.js', rating: 3.8, category: 'frontend', description: '3D graphics and WebGL experiences' },
  { id: 'svg', name: 'SVG Morphing', rating: 4.0, category: 'frontend', description: 'Animated vector graphics and morphing' },
  { id: 'framer-motion', name: 'Framer Motion', rating: 4.0, category: 'frontend', description: 'Animation library for React' },
  { id: 'node', name: 'Node.js', rating: 4.4, category: 'backend', favorite: true, description: 'Server-side JavaScript runtime' },
  { id: 'express', name: 'Express.js', rating: 4.4, category: 'backend', description: 'Web application framework for Node.js' },
  { id: 'postgres', name: 'PostgreSQL', rating: 4.1, category: 'backend', description: 'Relational database management' },
  { id: 'sql', name: 'SQL', rating: 4.2, category: 'backend', description: 'Database query language' },
  { id: 'python', name: 'Python', rating: 4.8, category: 'backend', favorite: true, description: 'Backend development and AI/ML applications' },
  { id: 'firebase', name: 'Firebase', rating: 4.1, category: 'backend', favorite: false, description: 'A backend as a service that provides a real-time database, authentication, and storage for web applications.' },
  { id: 'supabase', name: 'Supabase', rating: 4.3, category: 'backend', favorite: false, description: 'An open-source backend as a service that provides a real-time database, authentication, and storage for web applications.' },
  { id: 'flask', name: 'Flask', rating: 4.1, category: 'backend', description: 'Lightweight Python web framework' },
  { id: 'docker', name: 'Docker', rating: 4.0, category: 'backend', description: 'Containerization and deployment' },
  { id: 'openai', name: 'OpenAI API', rating: 4.9, category: 'ai', favorite: true, description: 'GPT models, embeddings, and AI integrations' },
  { id: 'anthropic', name: 'Anthropic API', rating: 4.7, category: 'ai', description: 'Claude models and AI capabilities' },
  { id: 'ai-agents', name: 'AI Agents', rating: 4.6, category: 'ai', favorite: true, description: 'Building autonomous AI systems with tools and memory' },
  { id: 'voice-ai', name: 'Voice AI', rating: 4.6, category: 'ai', description: 'Voice interfaces and speech processing' },
  { id: 'chat-ai', name: 'Chat AI', rating: 4.8, category: 'ai', description: 'Conversational AI and chat interfaces' },
  { id: 'langchain', name: 'LangChain', rating: 4.3, category: 'ai', description: 'Framework for LLM applications' },
  { id: 'retellai', name: 'RetellAI', rating: 4.5, category: 'ai', description: 'Voice AI platform integration' },
  { id: 'twilio', name: 'Twilio', rating: 4.2, category: 'ai', description: 'SMS and communication APIs' },
  { id: 'ui-design', name: 'UI Design', rating: 4.3, category: 'design', description: 'User interface design and visual systems' },
  { id: 'ux-design', name: 'UX Design', rating: 4.7, category: 'design', favorite: true, description: 'User experience research and design thinking' },
  { id: 'figma', name: 'Figma', rating: 4.0, category: 'design', description: 'Design and prototyping tool' },
  { id: 'product-mgmt', name: 'Product Management', rating: 4.5, category: 'product', description: 'Product strategy and roadmap planning' },
  { id: 'agile', name: 'Agile', rating: 4.8, category: 'product', description: 'Agile methodologies and sprint planning' },
];

export const skillCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'design', label: 'Design' },
  { id: 'product', label: 'Product Management' },
];
