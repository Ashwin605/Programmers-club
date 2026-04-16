import React from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line
import { FiGithub, FiLinkedin } from 'react-icons/fi';

const TeamMember = ({ name, role, image, github = "#", linkedin = "#" }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-panel"
    style={{ 
      padding: '1.5rem', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: '1rem'
    }}
  >
    <div style={{ 
      width: '120px', 
      height: '120px', 
      borderRadius: '50%', 
      overflow: 'hidden', 
      border: '4px solid rgba(99, 102, 241, 0.2)',
      marginBottom: '0.5rem'
    }}>
      <img 
        src={image} 
        alt={name} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
    <div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>{name}</h3>
      <span style={{ color: '#a855f7', fontSize: '0.9rem', fontWeight: 600 }}>{role}</span>
    </div>
    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
      <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af' }} className="hover:text-white transition-colors"><FiGithub size={20} /></a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#9ca3af' }} className="hover:text-blue-500 transition-colors"><FiLinkedin size={20} /></a>
    </div>
  </motion.div>
);

const About = () => {
  const team = [
    { name: 'Reddyvari Jahnavi', role: 'President', image: 'https://ui-avatars.com/api/?name=Reddyvari+Jahnavi&background=random&size=256', github: 'https://github.com/jahnavireddy18', linkedin: 'https://www.linkedin.com/in/reddyvari-jahnavi' },
    { name: 'Abburi Yoshitha', role: 'Convener', image: 'https://ui-avatars.com/api/?name=Abburi+Yoshitha&background=random&size=256', github: 'https://github.com/yoshithaabburi6666-netizen', linkedin: 'https://www.linkedin.com/in/yoshitha-abburi-t6' },
    { name: 'Shaik Baaji', role: 'Co Convener', image: 'https://ui-avatars.com/api/?name=Shaik+Baaji&background=random&size=256', github: 'https://github.com/baaji210', linkedin: 'https://www.linkedin.com/in/shaik-baaji-b4bb65363/' },
    { name: 'G Bhanu Prasad Reddy', role: 'Member', image: 'https://ui-avatars.com/api/?name=G+Bhanu+Prasad+Reddy&background=random&size=256', github: 'https://github.com/gurrambhanuprasadreddy957-svg', linkedin: 'https://www.linkedin.com/in/gurram-bhanu-prasad-reddy67' },
    { name: 'A Uday Varma', role: 'Member', image: 'https://ui-avatars.com/api/?name=A+Uday+Varma&background=random&size=256', github: 'https://github.com/arkadudayvarma', linkedin: 'https://www.linkedin.com/in/uday-varma-arkad-b3183338a' },
    { name: 'K Leela Vinayak', role: 'Member', image: 'https://ui-avatars.com/api/?name=K+Leela+Vinayak&background=random&size=256', github: 'https://github.com/leelavinayak', linkedin: 'https://www.linkedin.com/in/leelavinayak' },
    { name: 'C Ashwin', role: 'Member', image: 'https://ui-avatars.com/api/?name=C+Ashwin&background=random&size=256', github: 'https://github.com/Ashwin605' },
  ];

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
        >
          About <span className="text-gradient">ProgClub</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ maxWidth: '700px', margin: '0 auto', color: '#9ca3af', fontSize: '1.2rem', lineHeight: 1.6 }}
        >
          We are more than just a club. We are a community of creators, dreamers, and builders obsessed with technology and innovation.
        </motion.p>
      </div>

      {/* Mission Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '4rem', 
        alignItems: 'center', 
        marginBottom: '6rem' 
      }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-panel" style={{ padding: '0.5rem' }}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team working" 
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </div>
        </motion.div>
        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.6 }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Mission</h2>
          <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            At ProgClub, our mission is to foster a culture of technical excellence and collaborative learning. 
            We believe that the best way to learn is by doing, which is why we focus heavily on hackathons, 
            interactive workshops, and open-source projects.
          </p>
          <p style={{ color: '#9ca3af', lineHeight: 1.8 }}>
            Whether you are a beginner writing your first line of code or an expert system architect, 
            there is a place for you here. We support each other's growth and celebrate every milestone.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Meet the Team</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
