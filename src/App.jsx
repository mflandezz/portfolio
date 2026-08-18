import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const cardHover = {
  rest: { y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  hover: { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toasts, setToasts] = useState([]);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'IT Technical Support & Network Consultation',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy for Active Nav Link
  useEffect(() => {
    const sections = ['hero', 'about', 'competencies', 'timeline', 'certifications', 'education', 'contact'];
    const handleSectionObserver = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleSectionObserver, { passive: true });
    handleSectionObserver();
    return () => window.removeEventListener('scroll', handleSectionObserver);
  }, []);

  // Toast Trigger Helper
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // Copy to Clipboard
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label || 'text'}: "${text}"`);
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(`Copied ${label || 'text'}: "${text}"`);
    });
  };

  // Handle Contact Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Please enter your message';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);

    const name = encodeURIComponent(formData.name.trim());
    const email = encodeURIComponent(formData.email.trim());
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Hello Mark,\n\n` +
      `My Name: ${formData.name.trim()}\n` +
      `My Email: ${formData.email.trim()}\n` +
      `Inquiry Topic: ${formData.subject}\n\n` +
      `Message:\n${formData.message.trim()}\n\n` +
      `Best regards,\n${formData.name.trim()}`
    );

    const mailtoUrl = `mailto:mark.flandez@gmail.com?subject=${subject}&body=${body}`;
    showToast('Inquiry drafted! Launching email composer...');
    window.location.href = mailtoUrl;
  };

  // Print CV
  const handlePrint = () => {
    window.print();
  };

  const competenciesData = [
    {
      id: 1,
      category: 'it',
      badge: 'Enterprise IT',
      title: 'IT & Technical Support',
      desc: 'End-to-end multi-tier technical support for corporate workstations, operating systems, peripheral equipment, user access management, and troubleshooting complex hardware/software issues.',
      skills: ['Level 1–3 Helpdesk', 'OS Deployment & Config', 'Hardware Diagnostics', 'User Access & Support'],
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      id: 2,
      category: 'it',
      badge: 'Infrastructure',
      title: 'Network & Server Administration',
      desc: 'Designing, maintaining, and securing local area networks (LAN/WAN), managed switches, routers, firewalls, and on-premises server environments for multi-company operations.',
      skills: ['LAN / WAN & VLAN Setup', 'Server Infrastructure', 'Router & Switch Config', 'Network Uptime & Security'],
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      )
    },
    {
      id: 3,
      category: 'it',
      badge: 'Data Integrity',
      title: 'Preventive Maintenance & Data Backup',
      desc: 'Establishing rigorous preventive maintenance schedules for IT and electronic hardware, paired with automated offsite and onsite backup routines and disaster recovery protocols.',
      skills: ['Scheduled Hardware Servicing', 'Automated Backup Cycles', 'Disaster Recovery (DR)', 'System Health Audits'],
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <polyline points="9 12 11 14 15 10"></polyline>
        </svg>
      )
    },
    {
      id: 4,
      category: 'uav',
      badge: 'Aeronautics',
      title: 'Drone Operation & Repair',
      desc: 'Commercial RPAS flight execution, payload management, precision spray calibration (DJI Agras T20/T30), avionics troubleshooting, motor/ESC replacements, and firmware calibrations.',
      skills: ['DJI Agras T20/T30 Systems', 'Avionics & Motor Repair', 'Gimbal & Spray Calibration', 'Flight Planning & Telemetry'],
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M3 3l6 6"></path>
          <path d="M21 3l-6 6"></path>
          <path d="M3 21l6-6"></path>
          <path d="M21 21l-6-6"></path>
          <circle cx="5" cy="5" r="2"></circle>
          <circle cx="19" cy="5" r="2"></circle>
          <circle cx="5" cy="19" r="2"></circle>
          <circle cx="19" cy="19" r="2"></circle>
        </svg>
      )
    },
    {
      id: 5,
      category: 'uav',
      badge: 'Instruction',
      title: 'Technical Training & Instruction',
      desc: 'Formulating training curricula and conducting hands-on flight clinics for commercial drone operators, field technicians, and agricultural pilots in compliance with aviation standards.',
      skills: ['UAV Flight Instructor', 'SOPs & Safety Protocols', 'Operator Certification Prep', 'Field Hands-on Clinics'],
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      )
    },
    {
      id: 6,
      category: 'all',
      badge: 'Leadership',
      title: 'Cross-Functional Collaboration',
      desc: 'Bridging technical teams, executives, agricultural operators, third-party vendors, and regulatory aviation authorities to execute multi-disciplinary engineering projects smoothly.',
      skills: ['Stakeholder Alignment', 'Vendor & Hardware Sourcing', 'Regulatory Compliance', 'Multi-Site Coordination'],
      icon: (
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    }
  ];

  const filteredCompetencies = competenciesData.filter(
    (item) => activeTab === 'all' || item.category === activeTab || item.category === 'all'
  );

  return (
    <>
      {/* Background Depth */}
      <div className="site-bg-overlay" aria-hidden="true" />

      {/* HEADER NAVIGATION */}
      <motion.header 
        id="navbar" 
        className={`site-header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="header-container">
          <a href="#hero" className="brand-logo" aria-label="Mark A. Flandez Home">
            <motion.div 
              className="brand-mark"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              MF
            </motion.div>
            <div className="brand-text">
              <span className="brand-name">Mark A. Flandez</span>
              <span className="brand-role">IT Specialist &amp; UAV Instructor</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-menu" aria-label="Primary Navigation">
            <ul className="nav-list">
              {['about', 'competencies', 'timeline', 'certifications', 'education', 'contact'].map((sec) => (
                <li key={sec}>
                  <a 
                    href={`#${sec}`} 
                    className={`nav-link ${activeSection === sec ? 'active' : ''}`}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            <motion.button 
              type="button" 
              className="btn btn-secondary btn-sm" 
              onClick={handlePrint}
              title="Print or Save Resume as PDF"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print CV</span>
            </motion.button>

            <motion.a 
              href="#contact" 
              className="btn btn-primary btn-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Get in Touch</span>
              <svg className="icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button 
              type="button" 
              className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu" 
              aria-expanded={mobileMenuOpen}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="nav-menu open"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <ul className="nav-list">
                {['about', 'competencies', 'timeline', 'certifications', 'education', 'contact'].map((sec) => (
                  <li key={sec}>
                    <a 
                      href={`#${sec}`} 
                      className={`nav-link ${activeSection === sec ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main id="main-content">
        
        {/* HERO SECTION */}
        <section className="hero-section" id="hero">
          <div className="container hero-container">
            
            <motion.div 
              className="hero-content"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="hero-badge" variants={fadeInUp}>
                <span className="status-indicator"></span>
                <span>Available for IT Infrastructure &amp; UAV Flight Operations</span>
              </motion.div>

              <motion.h1 className="hero-title" variants={fadeInUp}>
                Mark A. Flandez
              </motion.h1>

              <motion.p className="hero-subtitle" variants={fadeInUp}>
                IT Specialist <span className="divider">&amp;</span> UAV Instructor
              </motion.p>

              <motion.p className="hero-tagline" variants={fadeInUp}>
                "18+ years in Technical Support, 7+ years in UAV Operations"
              </motion.p>

              <motion.p className="hero-description" variants={fadeInUp}>
                Delivering high-reliability IT infrastructure for enterprise conglomerates while pioneering commercial drone flight training, agricultural precision operations (DJI T20/T30), and mission-critical hardware diagnostics.
              </motion.p>

              <motion.div className="hero-actions" variants={fadeInUp}>
                <motion.a 
                  href="#timeline" 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>View Career Track</span>
                  <svg className="icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </motion.a>

                <motion.a 
                  href="#contact" 
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Contact Information</span>
                  <svg className="icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </motion.a>

                <motion.button 
                  type="button" 
                  className="btn btn-ghost copy-btn" 
                  onClick={() => handleCopy('mark.flandez@gmail.com', 'Email')}
                  title="Copy Email"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg className="icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy Email</span>
                </motion.button>
              </motion.div>

              {/* Fast Stats Bar */}
              <motion.div className="hero-stats-strip" variants={fadeInUp}>
                <div className="stat-pill">
                  <span className="stat-num">18+</span>
                  <span className="stat-label">Years IT Support</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-num">7+</span>
                  <span className="stat-label">Years UAV Flight</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-num">2026–31</span>
                  <span className="stat-label">CAAP RPAS Certified</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-num">BS ECE</span>
                  <span className="stat-label">Engineering Degree</span>
                </div>
              </motion.div>

            </motion.div>

            {/* Hero Visual Card with Real Photo */}
            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <motion.div 
                className="profile-card"
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
              >
                <div className="profile-image-wrapper">
                  <img 
                    src={`${import.meta.env.BASE_URL}assets/portrait.jpg`} 
                    alt="Mark A. Flandez - IT Specialist and UAV Instructor" 
                    className="profile-img" 
                    width="500" 
                    height="500" 
                    loading="eager"
                  />
                  <motion.div 
                    className="profile-badge-floating"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <div className="badge-icon-wrap">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <div className="badge-content">
                      <strong>RPAS Controller</strong>
                      <span>CAAP License #152333</span>
                    </div>
                  </motion.div>
                </div>
                
                <div className="profile-details-strip">
                  <div className="detail-item">
                    <span className="detail-k">Location</span>
                    <span className="detail-v">Davao City, Philippines</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-k">Focus</span>
                    <span className="detail-v">Enterprise IT &amp; Precision UAV</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="section about-section" id="about">
          <div className="container">
            
            <motion.div 
              className="section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <span className="section-tag">Background &amp; Profile</span>
              <h2 className="section-title">Dual-Domain Technical Mastery</h2>
              <p className="section-subtitle">
                An uncommon convergence of long-standing enterprise IT infrastructure stewardship and cutting-edge commercial unmanned aerial systems.
              </p>
            </motion.div>

            <div className="about-grid">
              
              <motion.div 
                className="about-card about-narrative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="card-icon-header">
                  <div className="icon-bubble">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3>Professional Journey</h3>
                </div>

                <div className="narrative-body">
                  <p>
                    <strong>Started Technical Support career in 2007</strong>, continuously supporting and scaling the IT infrastructure for a prominent group of companies. Over nearly two decades, I have safeguarded operational uptime, directed multi-site network administration, instituted proactive preventive maintenance routines, and executed robust data backup and recovery strategies.
                  </p>
                  <p>
                    <strong>Expanded into UAV operations in 2019</strong>, spearheading commercial drone training, technical flight operations, hardware repair, and system integration. I have specialized in heavy-lift agricultural drone platforms (including the DJI Agras T20 and T30 series), delivering hands-on flight instruction, field diagnostics, and standard operating procedures for agricultural enterprises and industrial applications.
                  </p>
                  <p>
                    This <strong>unique blend of IT infrastructure mastery and UAV expertise</strong> allows me to bridge the physical, network, and aeronautical layers—ensuring mission-critical data integrity, hardware reliability, and regulatory flight compliance.
                  </p>
                </div>

                <div className="about-quote-box">
                  <p>"From enterprise server cabinets to commercial flight lines: precision, preventive engineering, and safety drive every operation."</p>
                </div>
              </motion.div>

              <motion.div 
                className="about-card about-pillars"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="card-icon-header">
                  <div className="icon-bubble">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <h3>Core Operating Principles</h3>
                </div>

                <div className="pillars-list">
                  <div className="pillar-item">
                    <div className="pillar-num">01</div>
                    <div className="pillar-text">
                      <h4>High Availability &amp; Infrastructure Uptime</h4>
                      <p>Minimizing enterprise disruption through proactive network monitoring, server maintenance, and automated data redundancy.</p>
                    </div>
                  </div>

                  <div className="pillar-item">
                    <div className="pillar-num">02</div>
                    <div className="pillar-text">
                      <h4>Precision UAV Flight &amp; Safety Compliance</h4>
                      <p>Certified CAAP RPAS controller operations upholding strict airspace safety regulations, payload calibration, and flight protocols.</p>
                    </div>
                  </div>

                  <div className="pillar-item">
                    <div className="pillar-num">03</div>
                    <div className="pillar-text">
                      <h4>Hands-on Training &amp; Knowledge Transfer</h4>
                      <p>Empowering technicians, operators, and cross-functional teams through structured classroom theory and practical flight instruction.</p>
                    </div>
                  </div>

                  <div className="pillar-item">
                    <div className="pillar-num">04</div>
                    <div className="pillar-text">
                      <h4>Hardware Diagnostics &amp; Electronics Repair</h4>
                      <p>Backed by an Electronics &amp; Communications Engineering foundation, diagnosing down to component, sensor, and circuit board level.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Visual Synergy Banner */}
            <motion.div 
              className="synergy-banner"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}assets/hero-banner.jpg`} 
                alt="IT Server Infrastructure and Agricultural Drone Engineering Workbench" 
                className="synergy-img" 
                loading="lazy" 
              />
              <div className="synergy-overlay">
                <div className="synergy-content">
                  <span className="synergy-tag">Engineering Synergy</span>
                  <h3>Physical IT Systems Meet Aerial Robotics</h3>
                  <p>Combining 18+ years of data center/network administration with 7+ years of industrial drone telemetry, remote pilot training, and fleet maintenance.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* CORE COMPETENCIES */}
        <section className="section competencies-section" id="competencies">
          <div className="container">
            
            <motion.div 
              className="section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <span className="section-tag">Skillset Matrix</span>
              <h2 className="section-title">Core Competencies</h2>
              <p className="section-subtitle">
                Demonstrated technical proficiencies across enterprise network administration, hardware maintenance, drone flight instruction, and engineering collaboration.
              </p>

              {/* Framer Motion Filter Tabs */}
              <div className="filter-tabs" role="tablist" aria-label="Competency Category Filters">
                {[
                  { id: 'all', label: 'All Domains' },
                  { id: 'it', label: 'IT & Infrastructure' },
                  { id: 'uav', label: 'UAV & Drone Systems' }
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    type="button" 
                    className={`filter-tab ${activeTab === tab.id ? 'active' : ''}`} 
                    onClick={() => setActiveTab(tab.id)}
                    role="tab" 
                    aria-selected={activeTab === tab.id}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Animated Competencies Grid */}
            <motion.div 
              className="competencies-grid"
              layout
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <AnimatePresence>
                {filteredCompetencies.map((comp) => (
                  <motion.div 
                    key={comp.id}
                    className="competency-card"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  >
                    <div className="comp-icon-box">
                      {comp.icon}
                    </div>
                    <div className="comp-badge">{comp.badge}</div>
                    <h3 className="comp-title">{comp.title}</h3>
                    <p className="comp-desc">{comp.desc}</p>
                    <ul className="comp-skills">
                      {comp.skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* CAREER TIMELINE */}
        <section className="section timeline-section" id="timeline">
          <div className="container">
            
            <motion.div 
              className="section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <span className="section-tag">Career Track</span>
              <h2 className="section-title">Professional Experience</h2>
              <p className="section-subtitle">
                18+ continuous years of IT infrastructure management and technical leadership combined with 7+ years of commercial UAV operations.
              </p>
            </motion.div>

            <div className="timeline-wrapper">
              
              {/* Timeline Track 1: 2019 - Present */}
              <motion.div 
                className="timeline-card-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="timeline-marker">
                  <div className="marker-dot active-dot"></div>
                  <div className="marker-line"></div>
                </div>
                <motion.div 
                  className="timeline-card"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="timeline-header">
                    <div className="timeline-badge badge-active">2019 – Present · 7+ Years</div>
                    <span className="timeline-loc">Davao City &amp; Regional Deployments</span>
                  </div>
                  
                  <h3 className="timeline-role">UAV Operations, Drone Training &amp; Technical Support</h3>
                  <p className="timeline-org">Commercial Drone Operations &amp; Enterprise Agriculture Systems</p>
                  
                  <div className="timeline-content">
                    <p>
                      Directing end-to-end commercial unmanned aerial vehicle (UAV) flight operations, pilot training programs, and precision agricultural drone deployments across Mindanao and regional client sites.
                    </p>
                    <ul className="timeline-bullets">
                      <li>
                        <strong>Flight Operations &amp; Pilot Instruction:</strong> Conducted comprehensive theoretical and field flight training for new commercial drone pilots, emphasizing CAAP RPAS flight safety standards, weather assessment, emergency procedures, and airspace regulations.
                      </li>
                      <li>
                        <strong>Precision Agriculture Systems (DJI T20 / T30):</strong> Configured, deployed, and calibrated heavy-lift DJI Agras T20 and T30 spray systems, optimizing droplet distribution, RTK centimeter-level positioning, and autonomous route mapping.
                      </li>
                      <li>
                        <strong>Hardware Repair &amp; Diagnostics:</strong> Performed bench-level and field maintenance on UAV propulsion systems, flight controllers, ESC modules, radar obstacle avoidance sensors, and spray pumps.
                      </li>
                      <li>
                        <strong>Integrated Technical Support:</strong> Combined IT network capabilities with drone telemetry, providing field data offloading, cloud synchronization, and mapping software support.
                      </li>
                    </ul>
                  </div>

                  <div className="timeline-tech-tags">
                    {['CAAP RPAS Certified', 'DJI Agras T20 / T30', 'Flight Instruction', 'Avionics Diagnostics', 'Telemetry & RTK', 'Field Operations'].map((tag, i) => (
                      <span key={i} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Timeline Track 2: 2007 - Present */}
              <motion.div 
                className="timeline-card-item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="timeline-marker">
                  <div className="marker-dot"></div>
                  <div className="marker-line end-line"></div>
                </div>
                <motion.div 
                  className="timeline-card"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="timeline-header">
                    <div className="timeline-badge">2007 – Present · 18+ Years</div>
                    <span className="timeline-loc">Davao City, Philippines</span>
                  </div>
                  
                  <h3 className="timeline-role">Technical Support &amp; Network Administration</h3>
                  <p className="timeline-org">Group of Companies (Enterprise Corporate IT)</p>
                  
                  <div className="timeline-content">
                    <p>
                      Continuous 18-year tenure delivering end-to-end IT infrastructure support, network architecture, workstation maintenance, and server administration for a conglomerate group of companies.
                    </p>
                    <ul className="timeline-bullets">
                      <li>
                        <strong>Infrastructure Management:</strong> Designed, deployed, and maintained multi-site LAN/WAN network topographies, structured cabling, routing switches, wireless access points, and VPN connectivity.
                      </li>
                      <li>
                        <strong>Preventive Maintenance &amp; Uptime:</strong> Engineered preventive maintenance checklists and routines across hundreds of client workstations, enterprise printers, server racks, and network appliances, maintaining exceptional uptime.
                      </li>
                      <li>
                        <strong>Data Backup &amp; Disaster Recovery:</strong> Implemented and monitored daily, weekly, and monthly automated backup procedures, verifying archive integrity and executing prompt recovery drills.
                      </li>
                      <li>
                        <strong>Multi-tier Helpdesk Support:</strong> Resolved advanced hardware, operating system, and software application tickets for cross-departmental staff, management, and executive leadership.
                      </li>
                    </ul>
                  </div>

                  <div className="timeline-tech-tags">
                    {['Network Administration', 'Server Maintenance', 'Data Backup & DR', 'Preventive Maintenance', 'LAN / WAN / VLAN', 'Hardware Troubleshooting'].map((tag, i) => (
                      <span key={i} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section className="section certs-section" id="certifications">
          <div className="container">
            
            <motion.div 
              className="section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <span className="section-tag">Credentials &amp; Licensure</span>
              <h2 className="section-title">Certifications &amp; Accreditations</h2>
              <p className="section-subtitle">
                Formal flight controller licensure and technical platform certifications verifying specialized competency.
              </p>
            </motion.div>

            <motion.div 
              className="certs-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              
              {/* Cert 1: CAAP RPAS */}
              <motion.div 
                className="cert-card cert-featured"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="cert-status-badge status-active">
                  <span className="pulse-dot"></span> Active (2026–2031)
                </div>
                
                <div className="cert-icon-wrap">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>

                <div className="cert-issuer">Civil Aviation Authority of the Philippines (CAAP)</div>
                <h3 className="cert-name">RPAS Controller Certificate</h3>
                
                <div className="cert-meta-box">
                  <div className="meta-row">
                    <span className="meta-label">License / Cert No:</span>
                    <span className="meta-val font-mono">152333</span>
                    <button 
                      type="button" 
                      className="copy-tiny-btn" 
                      onClick={() => handleCopy('152333', 'RPAS License No')}
                      title="Copy License Number"
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Validity Period:</span>
                    <span className="meta-val font-mono">2026 – 2031</span>
                  </div>
                </div>

                <p className="cert-desc">
                  Officially licensed by CAAP to operate Remotely Piloted Aircraft Systems (RPAS) for commercial, industrial, and agricultural aerial missions.
                </p>
              </motion.div>

              {/* Cert 2: DJI Technical Training */}
              <motion.div 
                className="cert-card cert-featured"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="cert-status-badge status-specialist">
                  <span>Enterprise Specialized</span>
                </div>

                <div className="cert-icon-wrap">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>

                <div className="cert-issuer">DJI Academy / Authorized Technical Training</div>
                <h3 className="cert-name">DJI Technical Training – T20 / T30</h3>

                <div className="cert-meta-box">
                  <div className="meta-row">
                    <span className="meta-label">Platforms:</span>
                    <span className="meta-val font-mono">DJI Agras T20 &amp; T30</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Completion:</span>
                    <span className="meta-val font-mono">2021 / 2022</span>
                  </div>
                </div>

                <p className="cert-desc">
                  Comprehensive technical qualification in DJI enterprise agricultural drone flight mechanics, maintenance, radar diagnostics, and spray system calibration.
                </p>
              </motion.div>

              {/* Cert 3: MCTS Windows 7 */}
              <motion.div 
                className="cert-card"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="cert-status-badge status-legacy">
                  <span>Foundational (Expired)</span>
                </div>

                <div className="cert-icon-wrap">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>

                <div className="cert-issuer">Microsoft Corporation</div>
                <h3 className="cert-name">Microsoft Certified Technology Specialist (MCTS)</h3>

                <div className="cert-meta-box">
                  <div className="meta-row">
                    <span className="meta-label">Specialization:</span>
                    <span className="meta-val">Windows 7, Configuration</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Track:</span>
                    <span className="meta-val font-mono">Enterprise Desktop</span>
                  </div>
                </div>

                <p className="cert-desc">
                  Foundational certification demonstrating enterprise operating system installation, image deployment, network security, and desktop administration.
                </p>
              </motion.div>

              {/* Cert 4: HP Certified Professional */}
              <motion.div 
                className="cert-card"
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="cert-status-badge status-legacy">
                  <span>Foundational (Expired)</span>
                </div>

                <div className="cert-icon-wrap">
                  <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>

                <div className="cert-issuer">Hewlett-Packard (HP)</div>
                <h3 className="cert-name">HP Certified Professional</h3>

                <div className="cert-meta-box">
                  <div className="meta-row">
                    <span className="meta-label">Track:</span>
                    <span className="meta-val">Platform Specialist</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-label">Focus:</span>
                    <span className="meta-val font-mono">Hardware &amp; Systems</span>
                  </div>
                </div>

                <p className="cert-desc">
                  Industry-standard credential for HP platform hardware architectures, server component maintenance, and workstation system deployment.
                </p>
              </motion.div>

            </motion.div>

          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="section education-section" id="education">
          <div className="container">
            
            <motion.div 
              className="section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <span className="section-tag">Academic Background</span>
              <h2 className="section-title">Engineering Education</h2>
              <p className="section-subtitle">
                Solid university grounding in electronics, communication systems, and signal processing.
              </p>
            </motion.div>

            <div className="edu-card-container">
              <motion.div 
                className="edu-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="edu-icon-circle">
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                  </svg>
                </div>

                <div className="edu-body">
                  <div className="edu-header-meta">
                    <span className="edu-degree-badge">Bachelor of Science</span>
                    <span className="edu-location">Davao City, Philippines</span>
                  </div>

                  <h3 className="edu-degree">BS Electronics &amp; Communications Engineering</h3>
                  <p className="edu-institution">University of the Immaculate Conception (UIC)</p>

                  <p className="edu-summary">
                    The rigorous ECE curriculum provided deep technical knowledge in radio frequency (RF) propagation, microcontroller circuits, signal transmission, network topologies, and digital electronics—providing the direct theoretical and practical foundation for both enterprise network routing and UAV telemetry/avionics systems.
                  </p>

                  <div className="edu-focus-pills">
                    {['Telecommunications', 'Circuit Analysis', 'Digital Signal Processing', 'RF & Microwave Systems', 'Microcontroller & Hardware Diagnostics'].map((pill, i) => (
                      <span key={i} className="pill">{pill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="section contact-section" id="contact">
          <div className="container">
            
            <motion.div 
              className="section-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <span className="section-tag">Let's Connect</span>
              <h2 className="section-title">Contact &amp; Inquiries</h2>
              <p className="section-subtitle">
                Reach out directly for IT technical support consultation, enterprise network solutions, or commercial UAV flight instruction and repair.
              </p>
            </motion.div>

            <div className="contact-grid">
              
              {/* Contact Info Cards */}
              <div className="contact-info-column">
                
                {/* Email Card */}
                <motion.div 
                  className="contact-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="contact-card-body">
                    <span className="contact-label">Email Address</span>
                    <a href="mailto:mark.flandez@gmail.com" className="contact-val">mark.flandez@gmail.com</a>
                  </div>
                  <motion.button 
                    type="button" 
                    className="btn btn-ghost copy-btn" 
                    onClick={() => handleCopy('mark.flandez@gmail.com', 'Email')}
                    title="Copy Email"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy</span>
                  </motion.button>
                </motion.div>

                {/* Phone Card */}
                <motion.div 
                  className="contact-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="contact-card-body">
                    <span className="contact-label">Mobile / Phone</span>
                    <a href="tel:+639302183846" className="contact-val font-mono">+63 930 218 3846</a>
                  </div>
                  <motion.button 
                    type="button" 
                    className="btn btn-ghost copy-btn" 
                    onClick={() => handleCopy('+639302183846', 'Phone')}
                    title="Copy Phone Number"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy</span>
                  </motion.button>
                </motion.div>

                {/* Location Card */}
                <motion.div 
                  className="contact-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="contact-card-body">
                    <span className="contact-label">Primary Location</span>
                    <span className="contact-val">Davao City, Philippines</span>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Davao+City+Philippines" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-ghost" 
                    title="View on Google Maps"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span>Map</span>
                  </a>
                </motion.div>

                {/* Fast Action Buttons */}
                <div className="quick-actions-box">
                  <h4>Quick Connect</h4>
                  <p>Direct communication channels for urgent IT assistance or drone flight scheduling:</p>
                  <div className="btn-group-row">
                    <motion.a 
                      href="mailto:mark.flandez@gmail.com?subject=Inquiry%20for%20Mark%20A.%20Flandez" 
                      className="btn btn-primary btn-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Send Direct Email</span>
                    </motion.a>
                    <motion.a 
                      href="tel:+639302183846" 
                      className="btn btn-secondary btn-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>Call +63 930 218 3846</span>
                    </motion.a>
                  </div>
                </div>

              </div>

              {/* Interactive Message Form */}
              <div className="contact-form-column">
                <div className="form-container-card">
                  <h3>Send a Message</h3>
                  <p className="form-subtext">Fill in the details below to generate a pre-formatted inquiry directly to Mark.</p>
                  
                  <form onSubmit={handleFormSubmit} className="contact-form" noValidate>
                    <div className="form-group">
                      <label htmlFor="form-name">Your Full Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="form-name" 
                        name="name" 
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                        }}
                        className={`form-input ${formErrors.name ? 'error' : ''}`} 
                        placeholder="e.g. Juan dela Cruz" 
                        required 
                      />
                      {formErrors.name && <span className="field-error visible">{formErrors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="form-email">Your Email Address <span className="required">*</span></label>
                      <input 
                        type="email" 
                        id="form-email" 
                        name="email" 
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                        }}
                        className={`form-input ${formErrors.email ? 'error' : ''}`} 
                        placeholder="e.g. juan@company.com" 
                        required 
                      />
                      {formErrors.email && <span className="field-error visible">{formErrors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="form-subject">Inquiry Type / Subject <span className="required">*</span></label>
                      <select 
                        id="form-subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="form-select" 
                        required
                      >
                        <option value="IT Technical Support & Network Consultation">IT Technical Support &amp; Network Consultation</option>
                        <option value="UAV Drone Flight Training & Pilot Instruction">UAV Drone Flight Training &amp; Pilot Instruction</option>
                        <option value="DJI Agras T20/T30 Agriculture Operations">DJI Agras T20/T30 Agriculture Operations</option>
                        <option value="Drone Maintenance, Diagnostics & Repair">Drone Maintenance, Diagnostics &amp; Repair</option>
                        <option value="General Professional Inquiry">General Professional Inquiry</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="form-message">Message Details <span className="required">*</span></label>
                      <textarea 
                        id="form-message" 
                        name="message" 
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) setFormErrors({ ...formErrors, message: null });
                        }}
                        className={`form-textarea ${formErrors.message ? 'error' : ''}`} 
                        rows="4" 
                        placeholder="Briefly describe your project requirements, technical challenges, or training needs..." 
                        required
                      />
                      {formErrors.message && <span className="field-error visible">{formErrors.message}</span>}
                    </div>

                    <motion.button 
                      type="submit" 
                      className="btn btn-primary btn-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      <span>Compose Email via Client</span>
                    </motion.button>

                    <AnimatePresence>
                      {formSubmitted && (
                        <motion.div 
                          className="form-success-alert"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          <span>Ready! Opening your email composer with the prepared message.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-container">
          
          <div className="footer-brand">
            <div className="brand-mark">MF</div>
            <div>
              <span className="footer-name">Mark A. Flandez</span>
              <p className="footer-tag">IT Specialist &amp; UAV Instructor · Davao City, Philippines</p>
            </div>
          </div>

          <div className="footer-nav">
            <a href="#hero">Back to Top</a>
            <a href="#about">About</a>
            <a href="#competencies">Competencies</a>
            <a href="#timeline">Experience</a>
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-copy">
            <p>&copy; {new Date().getFullYear()} Mark A. Flandez. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* Toast Notifications with Framer Motion */}
      <div className="toast-container" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className="toast"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="#34d399" stroke-width="2" fill="none">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
