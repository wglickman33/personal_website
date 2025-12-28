import useTheme from '../../hooks/useTheme';
import './SocialLinks.scss';

interface SocialLinksProps {
  vertical?: boolean;
  className?: string;
}

const SocialLinks = ({ 
  vertical = false, 
  className = '' 
}: SocialLinksProps) => {
  const { theme } = useTheme();
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/williamglickman',
      icon: '🌐',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/williamglickman',
      icon: '💼',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/williamglickman',
      icon: '🐦',
    },
    {
      name: 'Email',
      url: 'mailto:william@example.com',
      icon: '✉️',
    },
  ];
  
  return (
    <div className={`social-links ${vertical ? 'vertical' : ''} ${theme} ${className}`}>
      {socialLinks.map((link, index) => (
        <a 
          key={index}
          href={link.url}
          className="social-link"
          aria-label={link.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-icon">{link.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;