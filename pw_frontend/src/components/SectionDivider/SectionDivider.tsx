// SectionDivider.tsx
import './SectionDivider.scss';

interface SectionDividerProps {
  position: 'top' | 'bottom';
  variant?: 'wave' | 'curve' | 'angle' | 'triangle';
  color?: string;
  flip?: boolean;
}

const SectionDivider = ({ 
  position, 
  variant = 'wave',
  color = 'currentColor',
  flip = false
}: SectionDividerProps) => {
  // This will ensure consistent dimensions and viewBox for all variants
  const getViewBox = () => {
    switch(variant) {
      case 'wave': return "0 0 1440 120";
      case 'curve': return "0 0 1440 100";
      case 'angle': return "0 0 1440 100";
      case 'triangle': return "0 0 1440 100";
      default: return "0 0 1440 120";
    }
  };
  
  // Define exact path for each variant
  const getPath = () => {
    switch(variant) {
      case 'wave': 
        return "M0 54.8676C239.5 -18.2892 479 -18.2892 718.5 54.8676C958 128.024 1199 128.024 1440 54.8676V120H0V54.8676Z";
      case 'curve': 
        return "M0,100 C320,30 480,30 720,100 C960,30 1120,30 1440,100 L1440,100 L0,100 Z";
      case 'angle': 
        return "M0,100 L1440,0 L1440,100 L0,100 Z";
      case 'triangle': 
        return "M720,0 L1440,100 L0,100 Z";
      default: 
        return "M0 54.8676C239.5 -18.2892 479 -18.2892 718.5 54.8676C958 128.024 1199 128.024 1440 54.8676V120H0V54.8676Z";
    }
  };

  return (
    <div className={`section-divider ${position} ${variant} ${flip ? 'flip' : ''}`}>
      <svg viewBox={getViewBox()} preserveAspectRatio="none">
        <path 
          d={getPath()}
          fill={color}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;