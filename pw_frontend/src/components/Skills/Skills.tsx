import { useRef, useEffect, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { skills, skillCategories } from '../../data/skills';
import StarRating from '../StarRating/StarRating';
import './Skills.scss';

const Skills = () => {
  const { theme } = useTheme();
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillId = entry.target.getAttribute('data-skill-id');
            if (skillId) {
              setVisibleSkills((prev) => new Set(prev).add(skillId));
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const skillElements = skillsRef.current?.querySelectorAll('[data-skill-id]');
    skillElements?.forEach((el) => observer.observe(el));

    return () => {
      skillElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const getSkillsByCategory = (categoryId: string) => {
    return skills.filter((skill) => skill.category === categoryId);
  };
  
  return (
    <section className={`skills skills--${theme}`}>
      <div className="skills__container">
        <h2 className="skills__title">Skills</h2>
        <p className="skills__subtitle">Technologies and tools I work with</p>
        
        <div className="skills__grid" ref={skillsRef}>
          {skillCategories.map((category) => {
            const categorySkills = getSkillsByCategory(category.id);
            if (categorySkills.length === 0) return null;

            return (
              <div key={category.id} className="skills__category">
                <h3 className="skills__category-title">{category.label}</h3>
                <div className="skills__list">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      data-skill-id={skill.id}
                      className={`skills__item ${visibleSkills.has(skill.id) ? 'skills__item--visible' : ''}`}
                    >
                      <div className="skills__item-header">
                        <span className="skills__name">{skill.name}</span>
                        <StarRating rating={skill.rating} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
