import { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import Footer from '../../components/Footer/Footer';
import './ContactPage.scss';

const ContactPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const projectTypes = [
    'Web Development',
    'Design Work',
    'Product Management',
    'Consulting',
    'Other',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsAnimating(true);

    const lineBreak = '%0D%0A';
    const doubleLineBreak = '%0D%0A%0D%0A';
    
    let emailBody = `Hi William,%0D%0A%0D%0A`;
    
    emailBody += `I'd like to get in touch regarding:${lineBreak}`;
    if (formData.subject) {
      emailBody += `${formData.subject}${doubleLineBreak}`;
    } else {
      emailBody += doubleLineBreak;
    }
    
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${doubleLineBreak}`;
    emailBody += `CONTACT INFORMATION${doubleLineBreak}`;
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${doubleLineBreak}`;
    emailBody += `Name: ${formData.name}${lineBreak}`;
    emailBody += `Email: ${formData.email}${lineBreak}`;
    
    if (formData.company) {
      emailBody += `Company: ${formData.company}${lineBreak}`;
    }
    
    if (formData.projectType) {
      emailBody += `Project Type: ${formData.projectType}${lineBreak}`;
    }
    
    emailBody += doubleLineBreak;
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${doubleLineBreak}`;
    emailBody += `MESSAGE${doubleLineBreak}`;
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${doubleLineBreak}`;
    emailBody += formData.message.replace(/\n/g, lineBreak);
    emailBody += doubleLineBreak;
    emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${doubleLineBreak}`;
    emailBody += `Best regards,${lineBreak}`;
    emailBody += formData.name;
    
    const subject = formData.subject || 'Contact from Personal Website';
    const mailtoLink = `mailto:willglickman@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsAnimating(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        company: '',
        projectType: '',
        message: '',
      });
    }, 2000);
  };

  return (
    <div className={`contact-page contact-page--${theme}`}>
      <section className="contact-hero">
        <div className="contact-hero__container">
          <div className="contact-hero__content">
            <div className="contact-hero__icon-wrapper">
              <span className="material-symbols-outlined contact-hero__icon">mail</span>
            </div>

            <h1 className="contact-hero__title">Get in Touch</h1>

            <p className="contact-hero__subtitle">
              Have a project in mind? Want to collaborate? Or just want to chat? 
              I'm always open to new opportunities and conversations.
            </p>

            <div className="contact-hero__decorative">
              <div className="contact-hero__circle contact-hero__circle--1"></div>
              <div className="contact-hero__circle contact-hero__circle--2"></div>
              <div className="contact-hero__circle contact-hero__circle--3"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="contact-form-section__container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name" className="contact-form__label">
                  Name <span className="contact-form__required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-form__input"
                  placeholder="Your name"
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="email" className="contact-form__label">
                  Email <span className="contact-form__required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-form__input"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="subject" className="contact-form__label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-form__input"
                  placeholder="What's this about?"
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="company" className="contact-form__label">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="contact-form__input"
                  placeholder="Your company (optional)"
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="projectType" className="contact-form__label">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="contact-form__select"
              >
                <option value="">Select a project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-form__field">
              <label htmlFor="message" className="contact-form__label">
                Message <span className="contact-form__required">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="contact-form__textarea"
                placeholder="Tell me about your project, idea, or just say hi!"
              />
            </div>

            <button
              type="submit"
              className={`contact-form__submit ${isAnimating ? 'contact-form__submit--animating' : ''}`}
            >
              <span className="contact-form__submit-text">Send Message</span>
              <div className="contact-form__email-animation">
                <span className="material-symbols-outlined contact-form__email-icon">mail</span>
                <span className="contact-form__email-trail"></span>
              </div>
            </button>
          </form>
        </div>
      </section>

      <section className="contact-social">
        <div className="contact-social__container">
          <h2 className="contact-social__title">Or reach out directly</h2>
          <div className="contact-social__links">
            <a
              href="https://linkedin.com/in/william-glickman"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social__link"
            >
              <span className="material-symbols-outlined">work</span>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/wglickman33"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social__link"
            >
              <span className="material-symbols-outlined">code</span>
              <span>GitHub</span>
            </a>
            <a
              href="mailto:willglickman@gmail.com"
              className="contact-social__link"
            >
              <span className="material-symbols-outlined">email</span>
              <span>Email</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
