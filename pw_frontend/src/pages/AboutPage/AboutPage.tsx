import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import { timelineItems } from '../../data/timeline';
import Footer from '../../components/Footer/Footer';
import './AboutPage.scss';

const AboutPage = () => {
  const { theme } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [showGraduationStory, setShowGraduationStory] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const timelineTop = scrollTop + rect.top;
      const timelineHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;

      const scrollableStart = timelineTop - viewportCenter;
      const scrollableEnd = timelineTop + timelineHeight - viewportCenter;
      const scrollableDistance = scrollableEnd - scrollableStart;
      
      const scrolled = scrollTop - scrollableStart;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-timeline-id');
            if (itemId) {
              setVisibleItems((prev) => new Set(prev).add(itemId));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = timelineRef.current?.querySelectorAll('[data-timeline-id]');
    items?.forEach((el) => observer.observe(el));

    return () => {
      items?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className={`about-page about-page--${theme}`}>
      <section className="about-hero">
        <div className="about-hero__background">
          <div className="about-hero__grid"></div>
          <div className="about-hero__gradient about-hero__gradient--1"></div>
          <div className="about-hero__gradient about-hero__gradient--2"></div>
        </div>

        <div className="about-hero__container">
          <div className="about-hero__content">
            <div className="about-hero__badge">
              <span className="material-symbols-outlined">person</span>
              The Story
            </div>

            <h1 className="about-hero__title">
              <span className="about-hero__title-line">From Neuroscience</span>
              <span className="about-hero__title-line">to Code</span>
            </h1>

            <p className="about-hero__subtitle">
              I didn't want to spend the next 7-8 years in school. Plus I always loved coding 
              and my creative art side, and knew I'd love the field. So in May 2024, I made 
              the decision to switch paths.
            </p>

            <div className="about-hero__fun-facts">
              <div className="about-hero__fun-fact">
                <span className="material-symbols-outlined about-hero__fun-fact-icon">psychology</span>
                <span className="about-hero__fun-fact-text">Neuroscience Background</span>
              </div>
              <div className="about-hero__fun-fact">
                <span className="material-symbols-outlined about-hero__fun-fact-icon">code</span>
                <span className="about-hero__fun-fact-text">Self-Taught Coder</span>
              </div>
              <div className="about-hero__fun-fact">
                <span className="material-symbols-outlined about-hero__fun-fact-icon">school</span>
                <span className="about-hero__fun-fact-text">Top of Bootcamp Class</span>
              </div>
              <div className="about-hero__fun-fact">
                <span className="material-symbols-outlined about-hero__fun-fact-icon">smart_toy</span>
                <span className="about-hero__fun-fact-text">AI Agent Builder</span>
              </div>
              <div className="about-hero__fun-fact">
                <span className="material-symbols-outlined about-hero__fun-fact-icon">palette</span>
                <span className="about-hero__fun-fact-text">Creative Designer</span>
              </div>
              <div className="about-hero__fun-fact">
                <span className="material-symbols-outlined about-hero__fun-fact-icon">sports_hockey</span>
                <span className="about-hero__fun-fact-text">Hockey Goalie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-timeline">
        <div className="about-timeline__container">
          <h2 className="about-timeline__title">The Journey</h2>
          <p className="about-timeline__subtitle">
            A timeline of how I got here
          </p>

          <div className="about-timeline__wrapper" ref={timelineRef}>
            <div className="about-timeline__line">
              <div 
                className="about-timeline__line-progress"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            <div className="about-timeline__items">
              {timelineItems.map((item, index) => (
                <div
                  key={item.id}
                  data-timeline-id={item.id}
                  className={`about-timeline__item about-timeline__item--${item.category} ${visibleItems.has(item.id) ? 'about-timeline__item--visible' : ''} ${index % 2 === 0 ? 'about-timeline__item--left' : 'about-timeline__item--right'}`}
                >
                  <div className="about-timeline__item-content">
                  <span className="about-timeline__item-date">{item.date}</span>
                  <h3 className="about-timeline__item-title">
                    {item.title}
                    {item.id === 'college-graduation' && (
                      <button
                        className="about-timeline__story-trigger"
                        onClick={() => setShowGraduationStory(true)}
                        aria-label="Read the story"
                      >
                        <span className="material-symbols-outlined">info</span>
                      </button>
                    )}
                  </h3>
                  {item.image && (
                    <div className="about-timeline__item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                  )}
                  <p className="about-timeline__item-description">{item.description}</p>
                  {item.downloads && item.downloads.length > 0 && (
                    <div className="about-timeline__item-downloads">
                      {item.downloads.map((download, idx) => (
                        <a
                          key={idx}
                          href={download.url}
                          className="about-timeline__item-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <span className="material-symbols-outlined">download</span>
                          {download.text}
                        </a>
                      ))}
                    </div>
                  )}
                  {item.link && !item.downloads && (
                    <a
                      href={item.link}
                      className="about-timeline__item-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <span className="material-symbols-outlined">download</span>
                      {item.linkText || 'Download'}
                    </a>
                  )}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-values__container">
          <h2 className="about-values__title">What Drives Me</h2>
          <div className="about-values__grid">
            <div className="about-values__card">
              <span className="material-symbols-outlined about-values__icon">groups</span>
              <h3 className="about-values__card-title">Teamwork</h3>
              <p className="about-values__card-text">
                I strive for others to strive around me. I want everyone to do great, 
                and I work best when I have my support with me.
              </p>
            </div>
            <div className="about-values__card">
              <span className="material-symbols-outlined about-values__icon">help</span>
              <h3 className="about-values__card-title">Always Learning</h3>
              <p className="about-values__card-text">
                I'm never afraid to ask for help or clarification. I appreciate insight 
                from people who know more than I do.
              </p>
            </div>
            <div className="about-values__card">
              <span className="material-symbols-outlined about-values__icon">person</span>
              <h3 className="about-values__card-title">Everyone's Story Matters</h3>
              <p className="about-values__card-text">
                Working in behavioral health, I see where everyone comes from. 
                Everyone's background and experience plays an important role.
              </p>
            </div>
            <div className="about-values__card">
              <span className="material-symbols-outlined about-values__icon">palette</span>
              <h3 className="about-values__card-title">Creative Problem-Solving</h3>
              <p className="about-values__card-text">
                Breaking down problems into smaller portions, thinking outside the box, 
                never afraid to mess up or restart fresh. Simplifying complex ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-skills">
        <div className="about-skills__container">
          <h2 className="about-skills__title">How My Background Helps</h2>
          <div className="about-skills__content">
            <div className="about-skills__item">
              <h3 className="about-skills__item-title">Neuroscience</h3>
              <p className="about-skills__item-text">
                I use my neuroscience knowledge all the time, especially when building 
                AI agents that need to understand human behavior and decision-making.
              </p>
            </div>
            <div className="about-skills__item">
              <h3 className="about-skills__item-title">Healthcare Experience</h3>
              <p className="about-skills__item-text">
                Understanding patients, callers, families - everything helps when 
                building agents for behavioral health facilities.
              </p>
            </div>
            <div className="about-skills__item">
              <h3 className="about-skills__item-title">Teaching</h3>
              <p className="about-skills__item-text">
                I use teaching skills when explaining concept ideas to non-technical 
                people, coworkers, or clients. If someone needed to explain to grandma 
                how an API works, I'm your guy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-interests">
        <div className="about-interests__container">
          <h2 className="about-interests__title">When I'm Not Coding</h2>
          <div className="about-interests__content">
            <div className="about-interests__category">
              <h3 className="about-interests__category-title">Sports</h3>
              <p className="about-interests__category-text">
                I'm a die-hard New York sports fan - Giants, Rangers, Mets, and Knicks. 
                I play hockey as a goalie (floor and roller), and love watching games 
                with friends and going to live games.
              </p>
            </div>
            <div className="about-interests__category">
              <h3 className="about-interests__category-title">Art & Design</h3>
              <p className="about-interests__category-text">
                I paint banners and signs, design shoes, paint logos and cartoons. 
                I love picking up my iPad and designing video game characters or items. 
                It's all about breaking down complex ideas into brush strokes.
              </p>
            </div>
            <div className="about-interests__category">
              <h3 className="about-interests__category-title">Gaming</h3>
              <p className="about-interests__category-text">
                Paper Mario: The Thousand Year Door and Super Strikers on GameCube 
                hold a special place in my heart. I also love Sunshine, Galaxy 1/2, 
                Sluggers, Baseball, Power Pros, Madden 94, Sonic on SEGA, and NHL 14 
                (which has the best soundtrack ever).
              </p>
            </div>
            <div className="about-interests__category">
              <h3 className="about-interests__category-title">Comics & Media</h3>
              <p className="about-interests__category-text">
                I'm into Marvel and DC - not really about favorites, just love the 
                storylines and how they explore complex characters and narratives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta__container">
          <h2 className="about-cta__title">Want to Know More?</h2>
          <p className="about-cta__text">
            Have a conversation with me and find out. I'm chill and casual, but professional.
          </p>
          <div className="about-cta__buttons">
            <Link to="/projects" className="about-cta__button about-cta__button--primary">
              View My Work
            </Link>
            <Link to="/contact" className="about-cta__button about-cta__button--secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {showGraduationStory && (
            <div className="about-timeline__story-modal" onClick={() => setShowGraduationStory(false)}>
              <div className="about-timeline__story-content" onClick={(e) => e.stopPropagation()}>
                <button
                  className="about-timeline__story-close"
                  onClick={() => setShowGraduationStory(false)}
                  aria-label="Close story"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <h3 className="about-timeline__story-title">The "Accidental" Early Graduation</h3>
                <p className="about-timeline__story-text">
                  {/* Add your funny story here */}
                  I actually graduated 2 semesters early completely by accident! The story goes...
                </p>
              </div>
      </div>
          )}

      <Footer />
    </div>
  );
};

export default AboutPage;
