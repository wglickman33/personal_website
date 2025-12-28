import { useEffect, useRef } from 'react';
import useTheme from '../../hooks/useTheme';
import Section from '../Section/Section';
import experiences from '../../data/experiences';
import { onElementInView } from '../../utils/animation';
import './Experience.scss';

const Experience = () => {
  const { theme } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (timelineRef.current) {
      const cleanup = onElementInView(
        timelineRef.current,
        () => {
          const items = timelineRef.current?.querySelectorAll('.timeline-item');
          if (items) {
            Array.from(items).forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('visible');
              }, 300 * index);
            });
          }
        },
        0.1
      );
      
      return cleanup;
    }
  }, []);
  
  return (
    <Section
      id="experience"
      title="Work Experience"
      subtitle="My professional journey from neuroscience to software engineering"
      className={`experience ${theme}`}
    >
      <div className="timeline" ref={timelineRef}>
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-content">
              {exp.logo && (
                <div className="company-logo">
                  <img src={exp.logo} alt={exp.company} />
                </div>
              )}
              <div className="timeline-period">{exp.period}</div>
              <h3 className="timeline-title">{exp.title}</h3>
              <div className="timeline-company">
                {exp.company} | {exp.location}
              </div>
              <p className="timeline-description">{exp.description}</p>
              <div className="timeline-skills">
                {exp.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="timeline-line"></div>
      </div>
    </Section>
  );
};

export default Experience;