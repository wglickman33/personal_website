import { useState, useEffect, useRef } from 'react';
import useTheme from '../../hooks/useTheme';
import experiences from '../../data/experiences';
import { skills } from '../../data/skills';
import resumePDF from '../../assets/styles/resume/william_glickman_resume.pdf';
import Footer from '../../components/Footer/Footer';
import './ResumePage.scss';

const ResumePage = () => {
  const { theme } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

  const parseDateFromPeriod = (period: string): Date => {
    const startDateStr = period.split(' - ')[0].trim();
    const monthMap: { [key: string]: number } = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    const parts = startDateStr.split(' ');
    if (parts.length === 2) {
      const month = monthMap[parts[0]];
      const year = parseInt(parts[1]);
      if (month !== undefined && !isNaN(year)) {
        return new Date(year, month);
      }
    }
    return new Date(0);
  };

  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = parseDateFromPeriod(a.period);
    const dateB = parseDateFromPeriod(b.period);
    return dateA.getTime() - dateB.getTime();
  });

  const getSkillsByCategory = (categoryId: string) => {
    return skills.filter((skill) => skill.category === categoryId);
  };

  const frontendSkills = getSkillsByCategory('frontend');
  const backendSkills = getSkillsByCategory('backend');
  const aiSkills = getSkillsByCategory('ai');
  const designSkills = getSkillsByCategory('design');
  const productSkills = getSkillsByCategory('product');

  return (
    <div className={`resume-page resume-page--${theme}`}>
      <div className="resume-page__container">
        <div className="resume-page__header">
          <div className="resume-page__header-content">
            <div className="resume-page__header-main">
              <h1 className="resume-page__name">William Glickman</h1>
              <p className="resume-page__tagline">Agentic AI Engineer • Full-Stack Developer • Product Builder</p>
            </div>
            
            <div className="resume-page__header-actions">
              <div className="resume-page__social-links">
                <a 
                  href="mailto:willglickman@gmail.com" 
                  className="resume-page__social-link"
                  aria-label="Email"
                >
                  <span className="material-symbols-outlined">mail</span>
                  <span className="resume-page__social-link-text">Email</span>
                </a>
                <a 
                  href="https://github.com/wglickman33" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="resume-page__social-link"
                  aria-label="GitHub"
                >
                  <span className="material-symbols-outlined">code</span>
                  <span className="resume-page__social-link-text">GitHub</span>
                </a>
                <a 
                  href="https://linkedin.com/in/william-glickman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="resume-page__social-link"
                  aria-label="LinkedIn"
                >
                  <span className="material-symbols-outlined">work</span>
                  <span className="resume-page__social-link-text">LinkedIn</span>
                </a>
              </div>
              
              <a 
                href={resumePDF} 
                download 
                className="resume-page__download-btn"
              >
                <span className="material-symbols-outlined">download</span>
                Download PDF Resume
              </a>
            </div>
          </div>
        </div>

        <div className="resume-page__content">
          <section className="resume-page__section">
            <h2 className="resume-page__section-title">
              <span className="material-symbols-outlined">work</span>
              Experience
            </h2>
            <div className="resume-page__experience-grid">
              {sortedExperiences.map((exp) => {
                const originalIndex = experiences.indexOf(exp);
                return (
                <div
                  key={originalIndex}
                  className="resume-page__experience-card"
                  onClick={() => setSelectedExperience(originalIndex)}
                >
                  <div className="resume-page__experience-card-header">
                    <div className="resume-page__experience-card-main">
                      <h3 className="resume-page__experience-title">{exp.title}</h3>
                      <div className="resume-page__experience-company">{exp.company}</div>
                      <div className="resume-page__experience-meta">
                        <span className="resume-page__experience-location">{exp.location}</span>
                        <span className="resume-page__experience-period">{exp.period}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined resume-page__expand-icon">
                      open_in_new
                    </span>
                  </div>
                </div>
              );
              })}
            </div>
          </section>

          <section className="resume-page__section">
            <h2 className="resume-page__section-title">
              <span className="material-symbols-outlined">psychology</span>
              Skills
            </h2>
            <div className="resume-page__skills-grid">
              <div className="resume-page__skills-category">
                <h3 className="resume-page__skills-category-title">Frontend</h3>
                <div className="resume-page__skills-list">
                  {frontendSkills.map((skill) => (
                    <div key={skill.id} className="resume-page__skill-item">
                      <span className="resume-page__skill-name">{skill.name}</span>
                      <div className="resume-page__skill-bar">
                        <div 
                          className="resume-page__skill-bar-fill"
                          style={{ width: `${(skill.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="resume-page__skills-category">
                <h3 className="resume-page__skills-category-title">Backend</h3>
                <div className="resume-page__skills-list">
                  {backendSkills.map((skill) => (
                    <div key={skill.id} className="resume-page__skill-item">
                      <span className="resume-page__skill-name">{skill.name}</span>
                      <div className="resume-page__skill-bar">
                        <div 
                          className="resume-page__skill-bar-fill"
                          style={{ width: `${(skill.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="resume-page__skills-category">
                <h3 className="resume-page__skills-category-title">AI/ML</h3>
                <div className="resume-page__skills-list">
                  {aiSkills.map((skill) => (
                    <div key={skill.id} className="resume-page__skill-item">
                      <span className="resume-page__skill-name">{skill.name}</span>
                      <div className="resume-page__skill-bar">
                        <div 
                          className="resume-page__skill-bar-fill"
                          style={{ width: `${(skill.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="resume-page__skills-category">
                <h3 className="resume-page__skills-category-title">Design</h3>
                <div className="resume-page__skills-list">
                  {designSkills.map((skill) => (
                    <div key={skill.id} className="resume-page__skill-item">
                      <span className="resume-page__skill-name">{skill.name}</span>
                      <div className="resume-page__skill-bar">
                        <div 
                          className="resume-page__skill-bar-fill"
                          style={{ width: `${(skill.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="resume-page__skills-category">
                <h3 className="resume-page__skills-category-title">Product</h3>
                <div className="resume-page__skills-list">
                  {productSkills.map((skill) => (
                    <div key={skill.id} className="resume-page__skill-item">
                      <span className="resume-page__skill-name">{skill.name}</span>
                      <div className="resume-page__skill-bar">
                        <div 
                          className="resume-page__skill-bar-fill"
                          style={{ width: `${(skill.rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="resume-page__section">
            <h2 className="resume-page__section-title">
              <span className="material-symbols-outlined">school</span>
              Education & Background
            </h2>
            <div className="resume-page__education-grid">
              <div className="resume-page__education-card">
                <h3 className="resume-page__education-title">BrainStation Bootcamp</h3>
                <div className="resume-page__education-details">Full-Stack Web Development</div>
                <div className="resume-page__education-period">July 2024 - October 2024</div>
                <div className="resume-page__education-note">Full Scholarship • Top of Class</div>
              </div>
              <div className="resume-page__education-card">
                <h3 className="resume-page__education-title">Binghamton University</h3>
                <div className="resume-page__education-details">Neuroscience Major</div>
                <div className="resume-page__education-period">August 2020 - August 2023</div>
                <div className="resume-page__education-note">Research: Non-pharmacological heroin addiction treatment</div>
              </div>
              <div className="resume-page__education-card">
                <h3 className="resume-page__education-title">Self-Taught Journey</h3>
                <div className="resume-page__education-details">Started Coding June 9, 2024</div>
                <div className="resume-page__education-period">Present</div>
                <div className="resume-page__education-note">From neuroscience to software engineering</div>
              </div>
            </div>
          </section>

          <section className="resume-page__section">
            <h2 className="resume-page__section-title">
              <span className="material-symbols-outlined">emoji_events</span>
              Achievements
            </h2>
            <div className="resume-page__achievements">
              <div className="resume-page__achievement-item">
                <span className="material-symbols-outlined">trophy</span>
                <div>
                  <strong>BrainStation x Etsy Hackathon Winner</strong>
                  <p>Won hackathon with innovative product creation</p>
                </div>
              </div>
              <div className="resume-page__achievement-item">
                <span className="material-symbols-outlined">rocket_launch</span>
                <div>
                  <strong>First Job in Under 1 Month</strong>
                  <p>Landed Junior AI Engineer role less than a month after bootcamp</p>
                </div>
              </div>
              <div className="resume-page__achievement-item">
                <span className="material-symbols-outlined">code</span>
                <div>
                  <strong>850+ Hours of Development</strong>
                  <p>Built My Kosher Delivery with 74,000+ lines of code</p>
                </div>
              </div>
              <div className="resume-page__achievement-item">
                <span className="material-symbols-outlined">groups</span>
                <div>
                  <strong>8+ Industries Served</strong>
                  <p>Built AI agents for utility, retail, banking, government, and more</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <div className="resume-page__footer-wrapper">
        <Footer />
      </div>

      {selectedExperience !== null && (
        <ExperienceModal
          experience={experiences[selectedExperience]}
          isOpen={selectedExperience !== null}
          onClose={() => setSelectedExperience(null)}
          theme={theme}
        />
      )}
    </div>
  );
};

interface ExperienceModalProps {
  experience: typeof experiences[0];
  isOpen: boolean;
  onClose: () => void;
  theme: string;
}

const ExperienceModal = ({ experience, isOpen, onClose, theme }: ExperienceModalProps) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`resume-modal resume-modal--${theme}`} role="dialog" aria-modal="true">
      <button className="resume-modal__backdrop" onClick={onClose} aria-label="Close dialog" />

      <div className="resume-modal__panel" role="document">
        <button
          ref={closeBtnRef}
          className="resume-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="resume-modal__header">
          <h2 className="resume-modal__title">{experience.title}</h2>
          <div className="resume-modal__company">{experience.company}</div>
          <div className="resume-modal__meta">
            <span className="resume-modal__location">{experience.location}</span>
            <span className="resume-modal__period">{experience.period}</span>
          </div>
        </div>

        <div className="resume-modal__body">
          <div className="resume-modal__section">
            <h3 className="resume-modal__section-title">Description</h3>
            <p className="resume-modal__description">{experience.description}</p>
          </div>

          <div className="resume-modal__section">
            <h3 className="resume-modal__section-title">Skills & Technologies</h3>
            <div className="resume-modal__skills">
              {experience.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="resume-modal__skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
