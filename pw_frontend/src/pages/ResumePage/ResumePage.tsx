import { useState, useRef, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import useTheme from '../../hooks/useTheme';
import useModalA11y from '../../hooks/useModalA11y';
import experiences from '../../data/experiences';
import { skills, skillCategories, Skill } from '../../data/skills';
import resumePDF from '../../assets/styles/resume/William_Glickman_Resume.pdf';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import './ResumePage.scss';

const ResumePage = () => {
  const { theme } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState(0);

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

  const skillCategoryData = useMemo(
    () =>
      skillCategories.map((category) => ({
        ...category,
        items: skills.filter((skill) => skill.category === category.id),
      })),
    []
  );

  const activeCategory = skillCategoryData[activeSkillTab];

  const goToSkillTab = (index: number) => {
    const total = skillCategoryData.length;
    setActiveSkillTab(((index % total) + total) % total);
  };

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
                download="William_Glickman_Resume.pdf" 
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
                  <div className="resume-page__experience-card-body">
                    <h3 className="resume-page__experience-title">{exp.title}</h3>
                    <div className="resume-page__experience-meta">
                      <span className="resume-page__experience-location">
                        <span className="material-symbols-outlined">location_on</span>
                        {exp.location}
                      </span>
                      <span className="resume-page__experience-period">
                        <span className="material-symbols-outlined">calendar_today</span>
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <div className="resume-page__experience-card-footer">
                    <div className="resume-page__experience-company">{exp.company}</div>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<span className="material-symbols-outlined">open_in_new</span>}
                    >
                      View
                    </Button>
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

            <div className="resume-page__skills-carousel">
              <div className="resume-page__skills-tabs">
                {skillCategoryData.map((category, index) => (
                  <button
                    key={category.id}
                    className={`resume-page__skills-tab${index === activeSkillTab ? ' resume-page__skills-tab--active' : ''}`}
                    onClick={() => goToSkillTab(index)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="resume-page__skills-panel">
                <button
                  className="resume-page__skills-nav resume-page__skills-nav--prev"
                  onClick={() => goToSkillTab(activeSkillTab - 1)}
                  aria-label="Previous category"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>

                <SkillsChart key={activeCategory.id} skills={activeCategory.items} theme={theme} />

                <button
                  className="resume-page__skills-nav resume-page__skills-nav--next"
                  onClick={() => goToSkillTab(activeSkillTab + 1)}
                  aria-label="Next category"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>

              <div className="resume-page__skills-dots">
                {skillCategoryData.map((category, index) => (
                  <button
                    key={category.id}
                    className={`resume-page__skills-dot${index === activeSkillTab ? ' resume-page__skills-dot--active' : ''}`}
                    onClick={() => goToSkillTab(index)}
                    aria-label={`Show ${category.label} skills`}
                  />
                ))}
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
                <h3 className="resume-page__education-title">Binghamton University</h3>
                <div className="resume-page__education-details">BS Integrative Neuroscience</div>
                <div className="resume-page__education-period">August 2020 - August 2023</div>
                <div className="resume-page__education-note">Research: Non-pharmacological heroin addiction treatment</div>
              </div>
              <div className="resume-page__education-card">
                <h3 className="resume-page__education-title">Self-Taught Journey</h3>
                <div className="resume-page__education-details">Started Coding June 9, 2024</div>
                <div className="resume-page__education-period">June 2024 - Present</div>
                <div className="resume-page__education-note">From neuroscience to software engineering</div>
              </div>
              <div className="resume-page__education-card">
                <h3 className="resume-page__education-title">BrainStation Bootcamp</h3>
                <div className="resume-page__education-details">Full-Stack Web Development</div>
                <div className="resume-page__education-period">July 2024 - October 2024</div>
                <div className="resume-page__education-note">Full Scholarship • Top of Class</div>
              </div>
              <div className="resume-page__education-card">
                <h3 className="resume-page__education-title">BrainStation Certificate</h3>
                <div className="resume-page__education-details">UI Design</div>
                <div className="resume-page__education-period">December 2024 - February 2025</div>
                <div className="resume-page__education-note">Rewarded free certificate course for first place in Hackathon</div>
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
                  <strong>Biggest App: 1500+ Hours of Development</strong>
                  <p>Built My Kosher Delivery with 120,000+ lines of code</p>
                </div>
              </div>
              <div className="resume-page__achievement-item">
                <span className="material-symbols-outlined">groups</span>
                <div>
                  <strong>8+ Industries Served</strong>
                  <p>Built AI agents for utility, retail, banking, behavioral health, and more</p>
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

interface SkillsChartProps {
  skills: Skill[];
  theme: string;
}

const SKILL_CHART_ROW_HEIGHT = 42;

const SkillsChart = ({ skills: categorySkills, theme }: SkillsChartProps) => {
  if (categorySkills.length === 0) {
    return <p className="resume-page__skills-empty">No skills in this category yet.</p>;
  }

  const isDark = theme === 'dark';
  const trackColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)';
  const textColor = isDark ? 'rgba(255, 255, 255, 0.9)' : '#1e293b';
  const valueColor = isDark ? '#93c5fd' : '#1e40af';

  const sorted = [...categorySkills].sort((a, b) => b.rating - a.rating);
  const longestName = sorted.reduce((max, s) => Math.max(max, s.name.length), 0);
  const yAxisWidth = Math.min(220, Math.max(110, longestName * 7.4 + 20));
  const chartHeight = sorted.length * SKILL_CHART_ROW_HEIGHT + 24;

  return (
    <div className="resume-page__skills-chart" style={{ height: chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 8, right: 44, left: 8, bottom: 8 }}
          barCategoryGap="28%"
        >
          <defs>
            <linearGradient id="resumeSkillBarGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <XAxis type="number" domain={[0, 5]} hide />
          <YAxis
            type="category"
            dataKey="name"
            width={yAxisWidth}
            tick={{ fill: textColor, fontSize: 13, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Bar
            dataKey="rating"
            fill="url(#resumeSkillBarGradient)"
            background={{ fill: trackColor, radius: 8 }}
            radius={8}
            maxBarSize={22}
            isAnimationActive
            animationDuration={600}
          >
            <LabelList
              dataKey="rating"
              position="right"
              formatter={(value) => Number(value).toFixed(1)}
              fill={valueColor}
              fontSize={13}
              fontWeight={700}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useModalA11y({
    isOpen,
    onClose,
    containerRef: dialogRef,
    initialFocusRef: closeBtnRef,
  });

  if (!isOpen) return null;

  const hasLinks = Boolean(experience.liveLink || experience.githubLink);

  return (
    <div
      ref={dialogRef}
      className={`resume-modal resume-modal--${theme}`}
      role="dialog"
      aria-modal="true"
      aria-label={experience.title}
    >
      <button className="resume-modal__backdrop" onClick={onClose} aria-label="Close dialog" />

      <div className="resume-modal__panel" role="document" ref={panelRef} tabIndex={-1}>
        <div className="resume-modal__close-anchor">
          <button
            ref={closeBtnRef}
            className="resume-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="resume-modal__header">
          <h2 className="resume-modal__title">{experience.title}</h2>
          <div className="resume-modal__company">{experience.company}</div>
          <div className="resume-modal__meta">
            <span className="resume-modal__location">
              <span className="material-symbols-outlined">location_on</span>
              {experience.location}
            </span>
            <span className="resume-modal__period">
              <span className="material-symbols-outlined">calendar_today</span>
              {experience.period}
            </span>
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

          {hasLinks && (
            <div className="resume-modal__links">
              {experience.liveLink && (
                <a
                  href={experience.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-modal__link"
                  data-tooltip="Website"
                >
                  <span className="material-symbols-outlined">open_in_new</span>
                  Website
                </a>
              )}
              {experience.githubLink && (
                <a
                  href={experience.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-modal__link"
                  data-tooltip="GitHub"
                >
                  <span className="material-symbols-outlined">code</span>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
