import { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import Footer from '../../components/Footer/Footer';
import './ContactPage.scss';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

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
  // Honeypot field: real users never see or fill this in. If it has a value
  // on submit, the request is silently dropped (bot filled every field).
  const [honeypot, setHoneypot] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

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

  const encodeFormData = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      company: '',
      projectType: '',
      message: '',
    });
    setHoneypot('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bots that auto-fill every field trip the honeypot. Pretend it worked
    // so we don't tip them off, but never actually deliver the message.
    if (honeypot) {
      setIsAnimating(true);
      setSubmitStatus('success');
      setTimeout(() => {
        setIsAnimating(false);
        resetForm();
      }, 2000);
      return;
    }

    setSubmitStatus('sending');
    setIsAnimating(true);

    try {
      // Submits to Netlify's built-in form handling: no third-party API
      // keys, no client-exposed secrets, and no reliance on the visitor
      // having a configured email client. Netlify stores the submission
      // and emails a notification, so nothing gets missed.
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ 'form-name': 'contact', ...formData }),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      setSubmitStatus('success');
      setTimeout(() => {
        setIsAnimating(false);
        resetForm();
      }, 2000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setIsAnimating(false);
      setSubmitStatus('error');
    }
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

            <div className="contact-hero__social-links">
              <a
                href="https://linkedin.com/in/william-glickman"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-hero__social-link"
              >
                <span className="material-symbols-outlined">work</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/wglickman33"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-hero__social-link"
              >
                <span className="material-symbols-outlined">code</span>
                <span>GitHub</span>
              </a>
              <a
                href="mailto:willglickman@gmail.com"
                className="contact-hero__social-link"
              >
                <span className="material-symbols-outlined">email</span>
                <span>Email</span>
              </a>
            </div>

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
          <h2 className="contact-form-section__title">Or send a message</h2>
          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="contact-form__honeypot" aria-hidden="true">
              <label htmlFor="bot-field">Leave this field empty</label>
              <input
                type="text"
                id="bot-field"
                name="bot-field"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

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
              disabled={submitStatus === 'sending'}
            >
              <span className="contact-form__submit-text">
                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </span>
              <div className="contact-form__email-animation">
                <span className="material-symbols-outlined contact-form__email-icon">mail</span>
                <span className="contact-form__email-trail"></span>
              </div>
            </button>

            {submitStatus === 'success' && (
              <p className="contact-form__status contact-form__status--success" role="status">
                <span className="material-symbols-outlined">check_circle</span>
                Message sent! I'll get back to you soon.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="contact-form__status contact-form__status--error" role="alert">
                <span className="material-symbols-outlined">error</span>
                Something went wrong sending your message. Please try again, or email me directly at{' '}
                <a href="mailto:willglickman@gmail.com">willglickman@gmail.com</a>.
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
