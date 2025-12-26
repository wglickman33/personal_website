export interface Skill {
  id: string;
    name: string;
  rating: number;
  category: 'frontend' | 'backend' | 'ai' | 'design' | 'product';
  }
  
export const skills: Skill[] = [
  { id: 'react', name: 'React', rating: 4.5, category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', rating: 4.2, category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', rating: 4.8, category: 'frontend' },
  { id: 'scss', name: 'SCSS/CSS', rating: 4.5, category: 'frontend' },
  { id: 'html', name: 'HTML', rating: 4.8, category: 'frontend' },
  { id: 'node', name: 'Node.js', rating: 4.0, category: 'backend' },
  { id: 'express', name: 'Express', rating: 4.0, category: 'backend' },
  { id: 'postgres', name: 'PostgreSQL', rating: 3.8, category: 'backend' },
  { id: 'python', name: 'Python', rating: 4.2, category: 'backend' },
  { id: 'flask', name: 'Flask', rating: 3.5, category: 'backend' },
  { id: 'openai', name: 'OpenAI API', rating: 4.5, category: 'ai' },
  { id: 'ai-agents', name: 'AI Agents', rating: 4.3, category: 'ai' },
  { id: 'voice-ai', name: 'Voice AI', rating: 4.0, category: 'ai' },
  { id: 'chat-ai', name: 'Chat AI', rating: 4.5, category: 'ai' },
  { id: 'ui-design', name: 'UI Design', rating: 4.2, category: 'design' },
  { id: 'ux-design', name: 'UX Design', rating: 4.0, category: 'design' },
  { id: 'figma', name: 'Figma', rating: 4.0, category: 'design' },
  { id: 'product-mgmt', name: 'Product Management', rating: 3.8, category: 'product' },
  { id: 'agile', name: 'Agile', rating: 4.0, category: 'product' },
];

export const skillCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'design', label: 'Design' },
  { id: 'product', label: 'Product Management' },
];
