"use client";

import { useState, useEffect } from "react";
import "./About.css";
import myImg from "../../assets/profile.jpeg";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    {
      category: "Frontend",
      technologies: [
        { name: "React.js", level: 95, icon: "⚛️" },
        { name: "JavaScript", level: 90, icon: "🟨" },
        { name: "HTML5/CSS3", level: 92, icon: "🌐" },
        { name: "TypeScript", level: 85, icon: "🔷" },
        { name: "Tailwind CSS", level: 88, icon: "🎨" },
      ],
    },
    {
      category: "Backend",
      technologies: [
        { name: "Node.js", level: 90, icon: "🟢" },
        { name: "Express.js", level: 88, icon: "🚀" },
        { name: "Laravel", level: 85, icon: "🔴" },
        { name: "PHP", level: 82, icon: "🐘" },
        { name: "RESTful APIs", level: 90, icon: "🔗" },
      ],
    },
    {
      category: "Database",
      technologies: [
        { name: "MongoDB", level: 88, icon: "🍃" },
        { name: "MySQL", level: 85, icon: "🐬" },
        { name: "PostgreSQL", level: 80, icon: "🐘" },
        { name: "Redis", level: 75, icon: "🔴" },
      ],
    },
    {
      category: "Tools & Others",
      technologies: [
        { name: "Git/GitHub", level: 90, icon: "🐙" },
        { name: "Docker", level: 78, icon: "🐳" },
        { name: "AWS", level: 75, icon: "☁️" },
        { name: "Vercel", level: 85, icon: "▲" },
        { name: "Postman", level: 88, icon: "📮" },
      ],
    },
  ];

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      description:
        "Developing modern web applications using MERN stack, creating responsive user interfaces and robust backend APIs.",
      achievements: [
        "Built 15+ full-stack applications",
        "Improved application performance by 40%",
        "Implemented secure authentication systems",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Tech Solutions",
      period: "2021 - 2022",
      description:
        "Specialized in React.js development, creating dynamic and interactive user interfaces for various client projects.",
      achievements: [
        "Developed 10+ React applications",
        "Collaborated with design teams",
        "Optimized web performance",
      ],
    },
  ];

  return (
    <div className={`about-container ${isVisible ? "fade-in" : ""}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="profile-image">
            <img src={myImg} alt="Abdallahi Nah" className="profile-img" />
            <div className="status-indicator">
              <span className="status-dot"></span>
              Available for work
            </div>
          </div>
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Abdallahi Nah</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Engineer</h2>
            <p className="hero-description">
              Passionate full stack developer specializing in the{" "}
              <strong>MERN stack</strong>
              (MongoDB, Express.js, React.js, Node.js). I create modern,
              scalable web applications with clean code and exceptional user
              experiences.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>

        <div className="skills-grid">
          {skills.map((skillGroup, groupIndex) => (
            <div key={groupIndex} className="skill-group">
              <h3 className="skill-category">{skillGroup.category}</h3>
              <div className="skills-list">
                {skillGroup.technologies.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`skill-item ${
                      activeSkill === `${groupIndex}-${skillIndex}`
                        ? "active"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      setActiveSkill(`${groupIndex}-${skillIndex}`)
                    }
                    onMouseLeave={() => setActiveSkill(null)}
                  >
                    <div className="skill-header">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="section-header">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">My journey as a developer</p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <span className="experience-period">{exp.period}</span>
                </div>
                <h4 className="experience-company">{exp.company}</h4>
                <p className="experience-description">{exp.description}</p>
                <ul className="experience-achievements">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">Services I provide</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎨</div>
            <h3 className="service-title">Frontend Development</h3>
            <p className="service-description">
              Creating responsive, interactive user interfaces using React.js,
              HTML5, CSS3, and modern JavaScript frameworks.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">⚙️</div>
            <h3 className="service-title">Backend Development</h3>
            <p className="service-description">
              Building robust server-side applications with Node.js, Express.js,
              and Laravel, including RESTful APIs and database integration.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🗄️</div>
            <h3 className="service-title">Database Design</h3>
            <p className="service-description">
              Designing and optimizing databases using MongoDB, MySQL, and
              PostgreSQL for efficient data storage and retrieval.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🚀</div>
            <h3 className="service-title">Full Stack Solutions</h3>
            <p className="service-description">
              End-to-end web application development from concept to deployment,
              ensuring seamless integration between frontend and backend.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2 className="contact-title">Let's Work Together</h2>
          <p className="contact-description">
            Ready to bring your ideas to life? I'm available for freelance
            projects and full-time opportunities.
          </p>
          <div className="contact-buttons">
            <a
              href="mailto:abdallahi.nah@example.com"
              className="contact-btn primary"
            >
              📧 Get In Touch
            </a>
            <a href="/portfolio" className="contact-btn secondary">
              🎯 View My Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
