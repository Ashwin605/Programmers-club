import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCode, FiUsers, FiCpu } from 'react-icons/fi';
import EnhancedHeroAnimation from '../components/EnhancedHeroAnimation';
import FloatingParticles from '../components/FloatingParticles';

const Home = () => {



    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Global Floating Particles */}
            <FloatingParticles count={30} sizeRange={[3, 12]} speedRange={[5, 12]} />

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '80px' // Add top padding for navbar
            }}>
                 {/* Background Elements */}
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: '#6366f1', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: '#ec4899', filter: 'blur(150px)', opacity: 0.2, borderRadius: '50%' }} />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
                        <h1 style={{ 
                            fontSize: '2.5rem', 
                            fontWeight: 800, 
                            lineHeight: 1.2, 
                            textTransform: 'uppercase',
                            letterSpacing: '-1px',
                            maxWidth: '100%',
                            margin: '0 auto'
                        }}>
                            Vemu Institute of Technology <span className="text-gradient">Programmers Club</span>
                        </h1>
                    </div>

                    <div className="hero-layout">
                        {/* Left Column: Text Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 style={{ 
                                fontSize: '2rem', 
                                fontWeight: 600, 
                                marginBottom: '2rem',
                                color: '#e5e7eb'
                            }}>
                                Code the Future. <span style={{ color: '#6366f1' }}>Build the World.</span>
                            </h2>
                            <p style={{ fontSize: '1.2rem', color: '#9ca3af', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>
                                A community for passionate developers, designers & innovators. <br></br>
                                Workshops | Hackathons | Real-World Projects
                            </p>

                            <div className="action-buttons" style={{ display: 'flex', gap: '1.5rem' }}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Link
                                      to="/register"
                                      className="btn-3d"
                                      style={{
                                          background: 'white',
                                          color: 'black',
                                          padding: '1rem 2rem',
                                          borderRadius: '12px',
                                          fontWeight: 700,
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.5rem',
                                          border: 'none',
                                          cursor: 'pointer',
                                          boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                                          position: 'relative',
                                          overflow: 'hidden'
                                      }}
                                  >
                                      <span style={{ position: 'relative', zIndex: 2 }}>
                                        Become a Member <FiArrowRight />
                                      </span>
                                  </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Link
                                      to="/events"
                                      className="glass-panel btn-3d"
                                      style={{
                                          padding: '1rem 2rem',
                                          borderRadius: '12px',
                                          fontWeight: 600,
                                          display: 'flex',
                                          alignItems: 'center',
                                          color: 'white',
                                          position: 'relative',
                                          overflow: 'hidden'
                                      }}
                                  >
                                    <span style={{ position: 'relative', zIndex: 2 }}>
                                      Explore Events
                                    </span>
                                  </Link>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Column: Animation */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <EnhancedHeroAnimation />
                        </div>
                    </div>
                </div>
            </section>




            {/* Feature Section */}
            <section style={{ padding: '8rem 0', background: '#0a0a0a' }}>
                 <div className="container">
                     <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                         <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Why <span className="text-gradient">Join Us?</span></h2>
                         <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>We provide the resources, mentorship, and community you need to accelerate your coding journey.</p>
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <FeatureCard 
                            icon={<FiCode size={32} color="#6366f1" />}
                            title="Workshops & Bootcamps"
                            desc="Hands-on sessions on Web Dev, AI/ML, Cloud Computing, and more led by industry experts."
                        />
                        <FeatureCard 
                            icon={<FiUsers size={32} color="#ec4899" />}
                            title="Vibrant Community"
                            desc="Connect with like-minded peers, collaborate on projects, and grow your network."
                        />
                         <FeatureCard 
                            icon={<FiCpu size={32} color="#a855f7" />}
                            title="Hackathons"
                            desc="Participate in 24-48 hour coding marathons, win prizes, and showcase your skills."
                        />
                     </div>
                 </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -15,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass-panel-3d hover-lift"
        style={{
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
    >
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {icon}
        </motion.div>
        <h3 style={{ fontSize: '1.5rem', transform: 'translateZ(10px)' }}>{title}</h3>
        <p style={{ color: '#9ca3af', lineHeight: 1.6, transform: 'translateZ(5px)' }}>{desc}</p>
    </motion.div>
);

export default Home;
