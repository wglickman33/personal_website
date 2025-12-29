export interface Skill {
  id: string;
    name: string;
  rating: number;
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'product';
  }
  
export const skills: Skill[] = [
  { id: 'react', name: 'React', rating: 4.9, category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', rating: 4.1, category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', rating: 4.9, category: 'frontend' },
  { id: 'scss', name: 'SCSS/CSS', rating: 5.0, category: 'frontend' },
  { id: 'html', name: 'HTML', rating: 5.0, category: 'frontend' },
  { id: 'node', name: 'Node.js', rating: 4.4, category: 'backend' },
  { id: 'express', name: 'Express', rating: 4.4, category: 'backend' },
  { id: 'postgres', name: 'PostgreSQL', rating: 4.1, category: 'backend' },
  { id: 'python', name: 'Python', rating: 4.8, category: 'backend' },
  { id: 'flask', name: 'Flask', rating: 4.1, category: 'backend' },
  { id: 'openai', name: 'OpenAI API', rating: 4.9, category: 'ai' },
  { id: 'ai-agents', name: 'AI Agents', rating: 4.6, category: 'ai' },
  { id: 'voice-ai', name: 'Voice AI', rating: 4.6, category: 'ai' },
  { id: 'chat-ai', name: 'Chat AI', rating: 4.8, category: 'ai' },
  { id: 'ui-design', name: 'UI Design', rating: 4.3, category: 'design' },
  { id: 'ux-design', name: 'UX Design', rating: 4.7, category: 'design' },
  { id: 'figma', name: 'Figma', rating: 4.0, category: 'design' },
  { id: 'product-mgmt', name: 'Product Management', rating: 4.5, category: 'product' },
  { id: 'agile', name: 'Agile', rating: 4.8, category: 'product' },
];

export const skillCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'design', label: 'Design' },
  { id: 'product', label: 'Product Management' },
];
