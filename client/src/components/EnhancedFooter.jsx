import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FiGithub, FiTwitter, FiLinkedin, FiInstagram,
  FiMail, FiMapPin, FiPhone, FiHeart, FiCode,
  FiUsers, FiCalendar, FiBookOpen
} from 'react-icons/fi';
import { gsap } from 'gsap';

const EnhancedFooter = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && footerRef.current) {
      // Create floating particles in footer
      const particles = [];
      const container = footerRef.current;

      // Only create particles if GSAP is available
      if (typeof gsap !== 'undefined') {
        for (let i = 0; i < 12; i++) {
          const particle = document.createElement('div');
          const size = Math.random() * 6 + 2;
          const colors = ['#6366f1', '#a855f7', '#ec4899', '#10b981'];

          particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            opacity: ${Math.random() * 0.3 + 0.1};
            border-radius: 50%;
            filter: blur(${Math.random() * 4 + 1}px);
            pointer-events: none;
            z-index: 0;
          `;

          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;

          container.appendChild(particle);
          particles.push(particle);

          gsap.to(particle, {
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            duration: Math.random() * 8 + 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }

      return () => {
        particles.forEach(particle => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
      };
    }
  }, [isInView]);

  return (
    <footer
      ref={footerRef}
      className="perspective-1000"
      style={{
        background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(15, 15, 25, 0.98) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '5rem 0 2rem',
        marginTop: 'auto',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, #ec4899, transparent)',
        filter: 'blur(2px)',
        opacity: 0.3
      }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
            marginBottom: '4rem',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Brand Section with 3D Effect */}
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="card-3d"
          >
            <div className="card-3d-inner" style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <motion.h3
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
                animate={{ rotateZ: [0, -2, 2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiCode size={28} />
                VEMU PROGCLUB
              </motion.h3>

              <motion.p
                style={{
                  color: '#9ca3af',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Vemu Institute of Technology Programming Club.
                <br/>
                Empowering the next generation of developers, innovators, and tech leaders.
              </motion.p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { icon: <FiUsers />, label: 'Community', count: '500+' },
                  { icon: <FiCalendar />, label: 'Events', count: '50+' },
                  { icon: <FiBookOpen />, label: 'Workshops', count: '30+' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      textAlign: 'center',
                      minWidth: '80px'
                    }}
                  >
                    <div style={{ color: '#6366f1', marginBottom: '0.3rem' }}>{stat.icon}</div>
                    <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>{stat.label}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>{stat.count}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {[
                  { icon: <FiGithub />, href: "#", color: '#6366f1' },
                  { icon: <FiLinkedin />, href: "https://www.linkedin.com/in/programmers-club-1929b3403", color: '#0a66c2' },
                  { icon: <FiInstagram />, href: "https://www.instagram.com/pc_vemu_2k26/", color: '#e4405f' }
                ].map((social, index) => (
                  <AdvancedSocialIcon
                    key={index}
                    icon={social.icon}
                    href={social.href}
                    color={social.color}
                    delay={index * 0.1}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links with Hover Effects */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <motion.h4
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '2rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
              whileHover={{ x: 5 }}
            >
              <FiCode size={20} />
              Quick Links
            </motion.h4>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { to: "/", label: "Home", icon: <FiCode /> },
                { to: "/events", label: "Events", icon: <FiCalendar /> },
                { to: "/about", label: "About Us", icon: <FiUsers /> },
                { to: "/contact", label: "Contact", icon: <FiMail /> },
                { to: "/register", label: "Join Club", icon: <FiBookOpen /> }
              ].map((link, index) => (
                <AdvancedFooterLink
                  key={index}
                  to={link.to}
                  label={link.label}
                  icon={link.icon}
                  delay={index * 0.1 + 0.4}
                />
              ))}
            </ul>
          </motion.div>

          {/* Contact Info with Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <motion.h4
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '2rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
              whileHover={{ x: 5 }}
            >
              <FiMapPin size={20} />
              Contact Info
            </motion.h4>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <ContactItem
                icon={<FiMapPin />}
                title="Address"
                content={
                  <>
                    Vemu Institute of Technology,<br />
                    P.Kothakota, Chittoor,<br />
                    Andhra Pradesh - 517112
                  </>
                }
                delay={0.5}
              />

              <ContactItem
                icon={<FiMail />}
                title="Email"
                content={
                  <motion.a
                    href="mailto:programmersclub2026@gmail.com"
                    style={{ color: '#6366f1', textDecoration: 'none' }}
                    whileHover={{ color: '#a855f7' }}
                  >
                    programmersclub2026@gmail.com
                  </motion.a>
                }
                delay={0.6}
              />

              <ContactItem
                icon={<FiPhone />}
                title="Phone"
                content={
                  <>
                    +91 9573414287<br />
                    +91 9989723713
                  </>
                }
                delay={0.7}
              />
            </ul>

            {/* Newsletter Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.2)' }}
            >
              <h5 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#fff' }}>Stay Updated</h5>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Get notified about upcoming events and workshops
              </p>

              <motion.div
                style={{ display: 'flex', gap: '0.5rem' }}
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.8rem 1.2rem',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright Section with Animated Elements */}
        <motion.div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '2.5rem',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.95rem',
            position: 'relative',
            zIndex: 2
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.p
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: '#ec4899' }}
            >
              <FiHeart />
            </motion.span>
            <span>by VEMU PROGCLUB Team</span>
          </motion.p>

          <motion.p
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 600,
              fontSize: '1rem'
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &copy; {new Date().getFullYear()} Vemu Institute of Technology Programming Club. All rights reserved.
          </motion.p>

          {/* Animated decorative elements */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)',
              filter: 'blur(1px)'
            }}
            animate={{ width: ['100px', '200px', '100px'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </footer>
  );
};

const AdvancedSocialIcon = ({ icon, href, color, delay }) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ delay, duration: 0.6, ease: "backOut" }}
    whileHover={{
      scale: 1.15,
      y: -5,
      rotate: 5,
      boxShadow: `0 10px 25px ${color}40`
    }}
    whileTap={{ scale: 0.9 }}
    style={{
      width: '45px',
      height: '45px',
      borderRadius: '12px',
      background: `linear-gradient(135deg, ${color}20, ${color}10)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
      border: `1px solid ${color}30`,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <span style={{ position: 'relative', zIndex: 2 }}>{icon}</span>

    {/* Hover shine effect */}
    <motion.div
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `linear-gradient(45deg, transparent, ${color}20, transparent)`,
        transform: 'rotate(45deg)',
        opacity: 0
      }}
      whileHover={{
        opacity: 1,
        transition: { duration: 0.6 }
      }}
    />
  </motion.a>
);

const AdvancedFooterLink = ({ to, label, icon, delay }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <motion.div
      whileHover={{ x: 8, color: '#6366f1' }}
      transition={{ duration: 0.2 }}
      style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
    >
      <motion.span
        style={{ color: '#6366f1', fontSize: '0.9rem' }}
        whileHover={{ rotate: 10 }}
      >
        {icon}
      </motion.span>

      <Link
        to={to}
        style={{
          color: 'inherit',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          position: 'relative',
          padding: '0.5rem 0'
        }}
      >
        {label}

        {/* Animated underline */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '0%',
            height: '2px',
            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
            borderRadius: '1px'
          }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  </motion.li>
);

const ContactItem = ({ icon, title, content, delay }) => (
  <motion.li
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
      background: 'rgba(255, 255, 255, 0.02)',
      padding: '1rem',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.04)',
      transition: 'all 0.3s ease'
    }}
    whileHover={{
      background: 'rgba(255, 255, 255, 0.04)',
      borderColor: 'rgba(99, 102, 241, 0.2)',
      transform: 'translateY(-2px)'
    }}
  >
    <motion.div
      style={{
        color: '#6366f1',
        fontSize: '1.1rem',
        marginTop: '2px',
        background: 'rgba(99, 102, 241, 0.1)',
        padding: '0.5rem',
        borderRadius: '8px'
      }}
      whileHover={{ rotate: 10, scale: 1.1 }}
    >
      {icon}
    </motion.div>

    <div>
      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginBottom: '0.3rem' }}>
        {title}
      </div>
      <div style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: 1.5 }}>
        {content}
      </div>
    </div>
  </motion.li>
);

export default EnhancedFooter;