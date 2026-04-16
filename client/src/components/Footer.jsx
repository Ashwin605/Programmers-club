import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer style={{ 
            background: 'rgba(255, 255, 255, 0.02)', 
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '4rem 0 2rem',
            marginTop: 'auto'
        }}>
            <div className="container">
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '3rem',
                    marginBottom: '3rem'
                }}>
                    {/* Brand Section */}
                    <div>
                        <h3 style={{ 
                            fontSize: '1.5rem', 
                            fontWeight: 700, 
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ color: '#6366f1' }}>&gt;_</span> VEMU PROGCLUB
                        </h3>
                        <p style={{ color: '#9ca3af', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            Vemu Institute of Technology Programming Club. <br/>
                            Empowering students to code, innovate, and build the future together.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { icon: <FiGithub />, href: "#" },
            { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/programmers-club-1929b3403" },
            { icon: <FiInstagram />, href: "https://www.instagram.com/pc_vemu_2k26/" }
          ].map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SocialIcon icon={social.icon} href={social.href} />
            </motion.div>
          ))}
        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <FooterLink to="/" label="Home" />
                            <FooterLink to="/events" label="Events" />
                            <FooterLink to="/about" label="About Us" />
                            <FooterLink to="/contact" label="Contact" />
                            <FooterLink to="/register" label="Join Club" />
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Contact Us</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '0.8rem', color: '#9ca3af', alignItems: 'flex-start' }}>
                                <FiMapPin style={{ marginTop: '4px', color: '#6366f1' }} />
                                <span>
                                    Vemu Institute of Technology,<br />
                                    P.Kothakota, Chittoor,<br />
                                    Andhra Pradesh - 517112
                                </span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.8rem', color: '#9ca3af', alignItems: 'center' }}>
                                <FiMail style={{ color: '#6366f1' }} />
                                <span>programmersclub2026@gmail.com</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.8rem', color: '#9ca3af', alignItems: 'center' }}>
                                <FiPhone style={{ color: '#6366f1' }} />
                                <span>+91 9573414287 | 9989723713</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ 
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
                    paddingTop: '2rem', 
                    textAlign: 'center', 
                    color: '#6b7280', 
                    fontSize: '0.9rem' 
                }}>
                    <p>&copy; {new Date().getFullYear()} Vemu Institute of Technology Programming Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, href }) => (
    <motion.a
        href={href}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            cursor: 'pointer'
        }}
        onMouseOver={(e) => {
            e.currentTarget.style.background = '#6366f1';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
        }}
        onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = '#9ca3af';
            e.currentTarget.style.boxShadow = 'none';
        }}
    >
        {icon}
    </motion.a>
);

const FooterLink = ({ to, label }) => (
    <li>
        <Link 
            to={to} 
            style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseOver={(e) => e.target.style.color = '#6366f1'}
            onMouseOut={(e) => e.target.style.color = '#9ca3af'}
        >
            {label}
        </Link>
    </li>
);

export default Footer;
