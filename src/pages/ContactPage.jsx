import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { CONTACT_EMAIL, createContactMailto } from '@/lib/contact';
import { Mail, MapPin, Clock } from 'lucide-react';

import './ContactPage.css';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kingston, Jamaica',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24-48 hours',
  },
];

const inquiryTypes = [
  'New Project',
  'General Inquiry',
  'Career Opportunity',
  'Collaboration',
  'Other',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'New Project',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = createContactMailto(
      `Contact: ${formData.inquiryType} - ${formData.name}`,
      {
        Name: formData.name,
        Email: formData.email,
        'Inquiry Type': formData.inquiryType,
        Message: formData.message,
      }
    );
    window.location.href = mailtoLink;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* HERO */}
      <header className="contact-hero">
        <div className="contact-container">
          <motion.div
            className="contact-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            <p className="contact-eyebrow">
              Get in touch
            </p>

            <h1 className="contact-hero__title">CONTACT</h1>

            <div className="contact-hero__bottom">
              <p className="contact-hero__statement">
                Start a
                <br />
                conversation.
              </p>

              <div className="contact-hero__meta">
                <p>Projects / Inquiries / Collaborations</p>
              </div>
            </div>
          </motion.div>

          <div className="contact-hero__line" />
        </div>
      </header>

      {/* INTRO */}
      <section className="contact-section contact-intro">
        <div className="contact-container">
          <div className="contact-intro__grid">
            <div>
              <h2>
                Let's build
                <br />
                something
                <br />
                meaningful.
              </h2>
            </div>

            <div className="contact-intro__copy">
              <p className="contact-lead">
                We are interested in projects that matter.
              </p>

              <p>
                Whether you have a clear vision or just an idea, we are happy to
                explore what is possible. Tell us about your project, your goals,
                and what success looks like to you.
              </p>

              <p>
                We respond to all inquiries within 24-48 hours. For urgent
                matters, please indicate this in your message.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="contact-section contact-methods">
        <div className="contact-container">
          <div className="contact-methods__list">
            {contactMethods.map((method, index) => (
              <div
                className="contact-method"
                key={method.label}
              >
                <div className="contact-method__icon">
                  <method.icon />
                </div>

                <div className="contact-method__details">
                  <span className="contact-method__label">
                    {method.label}
                  </span>

                  {method.href ? (
                    <a
                      href={method.href}
                      className="contact-method__value"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <span className="contact-method__value">
                      {method.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="contact-section contact-form-section">
        <div className="contact-container">
          <div className="contact-form__intro">
            <h2>
              Send a
              <br />
              message.
            </h2>

            <div>
              <p className="contact-lead">
                Fill out the form below.
              </p>

              <p>
                We will get back to you as soon as possible. All fields are
                required unless noted otherwise.
              </p>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="inquiryType">Inquiry Type</label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
              >
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="contact-form__submit"
            >
              Send Message
              <span>↗</span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
