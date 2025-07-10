"use client";

import { useState, useEffect } from "react";
import "./Contact.css";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus("");
      }, 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "abdallahi.nah.un.fst@gmail.com",
      link: "mailto:abdallahi.nah.un.fst@gmail.com",
      description: "Send me an email anytime",
      color: "#ea4335",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+222 33296173",
      link: "tel:+22233296173",
      description: "Call me directly",
      color: "#34a853",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      value: "+222 33296173",
      link: "https://wa.me/22233296173",
      description: "Message me on WhatsApp",
      color: "#25d366",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://linkedin.com/in/abdallahi-nah",
      description: "Professional networking",
      color: "#0077b5",
    },
  ];

  const quickMessages = [
    "I'd like to discuss a project",
    "I need a quote for my website",
    "I want to hire you for development",
    "I have a question about your services",
  ];

  return (
    <div className={`contact-container ${isVisible ? "fade-in" : ""}`}>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Let's <span className="highlight">Connect</span>
          </h1>
          <p className="hero-subtitle">
            Ready to bring your ideas to life? I'm here to help you build
            amazing web applications.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-icon">⚡</span>
              <span className="stat-text">Quick Response</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🎯</span>
              <span className="stat-text">Focused Solutions</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🤝</span>
              <span className="stat-text">Collaborative Approach</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Choose your preferred way to reach out
          </p>
        </div>

        <div className="methods-grid">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className="method-card"
              target={method.link.startsWith("http") ? "_blank" : "_self"}
              rel={method.link.startsWith("http") ? "noopener noreferrer" : ""}
              style={{ "--accent-color": method.color }}
            >
              <div className="method-icon">{method.icon}</div>
              <h3 className="method-title">{method.title}</h3>
              <p className="method-value">{method.value}</p>
              <p className="method-description">{method.description}</p>
              <div className="method-arrow">→</div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="form-container">
          <div className="form-header">
            <h2 className="form-title">Send Me a Message</h2>
            <p className="form-subtitle">
              Fill out the form below and I'll get back to you within 24 hours
            </p>
          </div>

          {/* Quick Message Buttons */}
          <div className="quick-messages">
            <p className="quick-title">Quick message:</p>
            <div className="quick-buttons">
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  className="quick-btn"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, subject: message }))
                  }
                >
                  {message}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="form-input"
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Tell me about your project, requirements, timeline, budget, etc."
                rows="6"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  <span className="btn-icon">📤</span>
                  Send Message
                </>
              )}
            </button>

            {formStatus === "success" && (
              <div className="form-success">
                <span className="success-icon">✅</span>
                <p>
                  Thank you! Your message has been sent successfully. I'll get
                  back to you soon!
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Contact Info Sidebar */}
        <div className="contact-info">
          <div className="info-card">
            <h3 className="info-title">Contact Information</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="info-icon">📧</span>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <a
                    href="mailto:abdallahi.nah.un.fst@gmail.com"
                    className="info-value"
                  >
                    abdallahi.nah.un.fst@gmail.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">📱</span>
                <div className="info-content">
                  <span className="info-label">Phone</span>
                  <a href="tel:+22233296173" className="info-value">
                    +222 33296173
                  </a>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">💬</span>
                <div className="info-content">
                  <span className="info-label">WhatsApp</span>
                  <a
                    href="https://wa.me/22233296173"
                    className="info-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +222 33296173
                  </a>
                </div>
              </div>

              <div className="info-item">
                <span className="info-icon">🌍</span>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">Mauritania</span>
                </div>
              </div>
            </div>
          </div>

          <div className="availability-card">
            <h3 className="availability-title">Availability</h3>
            <div className="availability-status">
              <span className="status-dot available"></span>
              <span className="status-text">Available for new projects</span>
            </div>
            <div className="availability-info">
              <p>🕒 Response time: Within 24 hours</p>
              <p>💼 Currently accepting freelance work</p>
              <p>🚀 Ready to start immediately</p>
            </div>
          </div>

          <div className="social-card">
            <h3 className="social-title">Follow Me</h3>
            <div className="social-links">
              <a
                href="https://github.com/abdallahi-nah"
                className="social-link github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">🐙</span>
                <span className="social-name">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/abdallahi-nah"
                className="social-link linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">💼</span>
                <span className="social-name">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/abdallahi_nah"
                className="social-link twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">🐦</span>
                <span className="social-name">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Quick answers to common questions</p>
        </div>

        <div className="faq-grid">
          <div className="faq-item">
            <h3 className="faq-question">What's your response time?</h3>
            <p className="faq-answer">
              I typically respond to all inquiries within 24 hours, often much
              sooner during business hours.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">
              Do you work with international clients?
            </h3>
            <p className="faq-answer">
              I work with clients worldwide and am comfortable with different
              time zones and communication preferences.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">
              What information should I include in my message?
            </h3>
            <p className="faq-answer">
              Please include your project requirements, timeline, budget range,
              and any specific technologies you prefer.
            </p>
          </div>

          <div className="faq-item">
            <h3 className="faq-question">Do you offer free consultations?</h3>
            <p className="faq-answer">
              Yes! I offer a free initial consultation to discuss your project
              and provide recommendations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
