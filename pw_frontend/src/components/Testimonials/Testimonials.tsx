// Testimonials.tsx
import { useEffect, useRef, useState } from 'react';
import useTheme from '../../hooks/useTheme';
import Section from '../Section/Section';
import testimonials from '../../data/testimonials';
import './Testimonials.scss';

const Testimonials = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <Section
      id="testimonials"
      title="What People Say"
      subtitle="Feedback from clients and colleagues I've worked with"
      centered
      className={`testimonials ${theme}`}
    >
      <div className="testimonials-container" ref={testimonialsRef}>
        <div 
          className="testimonials-track" 
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-slide">
              <div className="testimonial-card">
                <div className="testimonial-quote">❝</div>
                <p className="testimonial-content">{testimonial.content}</p>
                <div className="testimonial-author">
                  {testimonial.image && (
                    <div className="author-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                  )}
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-title">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonials-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        <button 
          className="testimonial-arrow prev"
          onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <button 
          className="testimonial-arrow next"
          onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </Section>
  );
};

export default Testimonials;