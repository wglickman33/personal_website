export type SkillCategoryId = 'frontend' | 'backend' | 'ai' | 'design' | 'product';

export interface Skill {
  id: string;
  name: string;
  rating: number;
  category: SkillCategoryId;
  favorite?: boolean;
  description?: string;
}

type RawSkill = Omit<Skill, 'category'>;

const SKILLS_BY_CATEGORY: Record<SkillCategoryId, RawSkill[]> = {
  frontend: [
    { id: 'react', name: 'React', rating: 4.9, favorite: true, description: 'Building interactive UIs with hooks, context, and modern patterns' },
    { id: 'javascript', name: 'JavaScript', rating: 4.9, favorite: true, description: 'Core language expertise with ES6+ features' },
    { id: 'scss', name: 'SCSS/CSS', rating: 5.0, favorite: true, description: 'Advanced styling with variables, mixins, and responsive design' },
    { id: 'html', name: 'HTML', rating: 5.0, description: 'Semantic markup and accessibility best practices' },
    { id: 'typescript', name: 'TypeScript', rating: 4.2, favorite: true, description: 'Type-safe JavaScript for scalable applications' },
    { id: 'vite', name: 'Vite', rating: 4.8, description: 'Fast build tool and dev server' },
    { id: 'material-ui', name: 'Material UI', rating: 4.3, description: 'React component library for rapid UI development' },
    { id: 'nextjs', name: 'Next.js', rating: 4.3, description: 'React framework with SSR and routing' },
    { id: 'recharts', name: 'Recharts', rating: 4.3, description: 'Charting library for React analytics dashboards' },
    { id: 'svg', name: 'SVG Morphing', rating: 4.6, description: 'Animated vector graphics and morphing' },
    { id: 'framer-motion', name: 'Framer Motion', rating: 4.4, description: 'Animation library for React' },
    { id: 'threejs', name: 'Three.js', rating: 4.0, description: '3D graphics and WebGL experiences' },
  ],

  backend: [
    { id: 'python', name: 'Python', rating: 4.9, favorite: true, description: 'Backend development and AI/ML applications' },
    { id: 'node', name: 'Node.js', rating: 4.7, favorite: true, description: 'Server-side JavaScript runtime' },
    { id: 'express', name: 'Express.js', rating: 4.7, description: 'Web application framework for Node.js' },
    { id: 'jwt-auth', name: 'JWT Authentication', rating: 4.6, description: 'Token-based authentication and session management' },
    { id: 'supabase', name: 'Supabase', rating: 4.7, description: 'An open-source backend as a service that provides a real-time database, authentication, and storage for web applications.' },
    { id: 'rbac', name: 'Role-Based Access Control', rating: 4.6, description: 'Permission systems across multiple user roles' },
    { id: 'django', name: 'Django', rating: 4.4, description: 'Python web framework for production applications' },
    { id: 'sequelize', name: 'Sequelize ORM', rating: 4.2, description: 'SQL ORM for Node.js applications' },
    { id: 'sql', name: 'SQL', rating: 4.7, description: 'Database query language' },
    { id: 'stripe', name: 'Stripe API', rating: 4.3, description: 'Payment processing with server-side order validation' },
    { id: 'postgres', name: 'PostgreSQL', rating: 4.5, description: 'Relational database management' },
    { id: 'firebase', name: 'Firebase', rating: 4.6, description: 'A backend as a service that provides a real-time database, authentication, and storage for web applications.' },
    { id: 'flask', name: 'Flask', rating: 4.4, description: 'Lightweight Python web framework' },
    { id: 'fastapi', name: 'FastAPI', rating: 4.5, description: 'Modern, high-performance Python API framework' },
    { id: 'mysql', name: 'MySQL', rating: 4.7, description: 'Relational database management' },
    { id: 'redis', name: 'Redis', rating: 4.0, description: 'In-memory data store for caching and queues' },
    { id: 'docker', name: 'Docker', rating: 4.0, description: 'Containerization and deployment' },
    { id: 'mongodb', name: 'MongoDB', rating: 4.7, description: 'NoSQL document database' },
    { id: 'celery', name: 'Celery', rating: 4.2, description: 'Distributed task queue for Python applications' },
    { id: 'google-maps-api', name: 'Google Maps API', rating: 4.3, description: 'Location services, geocoding, and delivery zone mapping' },
  ],

  ai: [
    { id: 'openai', name: 'OpenAI API', rating: 4.9, favorite: true, description: 'GPT models, embeddings, and AI integrations' },
    { id: 'chat-ai', name: 'Chat AI', rating: 4.8, description: 'Conversational AI and chat interfaces' },
    { id: 'anthropic', name: 'Anthropic API', rating: 4.9, description: 'Claude models and AI capabilities' },
    { id: 'ai-agents', name: 'AI Agents', rating: 4.7, favorite: true, description: 'Building autonomous AI systems with tools and memory' },
    { id: 'voice-ai', name: 'Voice AI', rating: 4.6, description: 'Voice interfaces and speech processing' },
    { id: 'langfuse', name: 'Langfuse', rating: 4.8, favorite: true, description: 'LLM evaluation, tracing, and observability infrastructure' },
    { id: 'langchain', name: 'LangChain', rating: 4.3, description: 'Framework for LLM applications' },
    { id: 'twilio', name: 'Twilio', rating: 4.2, description: 'SMS and communication APIs' },
    { id: 'elevenlabs', name: 'ElevenLabs API', rating: 4.6, description: 'Text-to-speech and voice synthesis' },
  ],

  design: [
    { id: 'ux-design', name: 'UX Design', rating: 4.8, favorite: true, description: 'User experience research and design thinking' },
    { id: 'ui-design', name: 'UI Design', rating: 4.5, description: 'User interface design and visual systems' },
    { id: 'figma', name: 'Figma', rating: 4.0, description: 'Design and prototyping tool' },
  ],

  product: [
    { id: 'agile', name: 'Agile', rating: 4.8, description: 'Agile methodologies and sprint planning' },
    { id: 'product-mgmt', name: 'Product Management', rating: 4.5, description: 'Product strategy and roadmap planning' },
  ],
};

export const skillCategories: { id: SkillCategoryId; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'design', label: 'Design' },
  { id: 'product', label: 'Product' },
];

export const skills: Skill[] = skillCategories.flatMap(({ id: category }) =>
  SKILLS_BY_CATEGORY[category].map((skill) => ({ ...skill, category }))
);
