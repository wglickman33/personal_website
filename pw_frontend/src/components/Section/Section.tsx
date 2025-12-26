// Section.tsx
import { ReactNode } from 'react';
import useTheme from '../../hooks/useTheme';
import './Section.scss';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  noPadding?: boolean;
  centered?: boolean;
  fullHeight?: boolean;
}

const Section = ({
  id,
  title,
  subtitle,
  className = '',
  children,
  noPadding = false,
  centered = false,
  fullHeight = false,
}: SectionProps) => {
  const { theme } = useTheme();
  
  return (
    <section 
      id={id}
      className={`
        section 
        ${theme} 
        ${className} 
        ${noPadding ? 'no-padding' : ''} 
        ${centered ? 'centered' : ''}
        ${fullHeight ? 'full-height' : ''}
      `}
    >
      <div className="container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;