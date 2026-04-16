import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => setFormStatus('success'), 2000);
    };

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Get in <span className="text-gradient">Touch</span></h1>
                <p style={{ color: '#9ca3af', fontSize: '1.2rem' }}>Have questions? We'd love to hear from you.</p>
            </motion.div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '4rem' 
            }}>
                {/* Contact Info */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Contact Information</h2>
                    
                    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ 
                                background: 'rgba(99, 102, 241, 0.1)', 
                                padding: '1rem', 
                                borderRadius: '12px',
                                color: '#6366f1'
                            }}>
                                <FiMail size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Email Us</h3>
                                <p style={{ color: '#9ca3af' }}>programmersclub2026@gmail.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                            <div style={{ 
                                background: 'rgba(168, 85, 247, 0.1)', 
                                padding: '1rem', 
                                borderRadius: '12px',
                                color: '#a855f7'
                            }}>
                                <FiMapPin size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Visit Us</h3>
                                <p style={{ color: '#9ca3af' }}>Vemu Institute of Technology,</p>
                                <p style={{ color: '#9ca3af' }}>P.Kothakota, Chittoor,</p>
                                <p style={{ color: '#9ca3af' }}>Andhra Pradesh - 517112</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                     initial={{ opacity: 0, x: 50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 }}
                >
                    <div className="glass-panel" style={{ padding: '2.5rem' }}>
                        {formStatus === 'success' ? (
                             <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                 <h3 style={{ fontSize: '1.5rem', color: '#4ade80', marginBottom: '1rem' }}>Message Sent!</h3>
                                 <p style={{ color: '#9ca3af' }}>We'll get back to you as soon as possible.</p>
                                 <button 
                                    onClick={() => setFormStatus('idle')}
                                    style={{ marginTop: '1.5rem', color: '#6366f1', textDecoration: 'underline' }}
                                 >
                                    Send another message
                                 </button>
                             </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Send a Message</h3>
                                
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Your Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        style={{ 
                                            width: '100%', 
                                            padding: '1rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none'
                                        }} 
                                        placeholder="John Doe"
                                    />
                                </div>
                                
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        style={{ 
                                            width: '100%', 
                                            padding: '1rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none'
                                        }} 
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#9ca3af' }}>Message</label>
                                    <textarea 
                                        required
                                        rows="4"
                                        style={{ 
                                            width: '100%', 
                                            padding: '1rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none',
                                            resize: 'none'
                                        }} 
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={formStatus === 'submitting'}
                                    style={{ 
                                        padding: '1rem', 
                                        background: 'var(--gradient-main)', 
                                        borderRadius: '12px', 
                                        color: 'white', 
                                        fontWeight: 600,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        opacity: formStatus === 'submitting' ? 0.7 : 1
                                    }}
                                >
                                    {formStatus === 'submitting' ? 'Sending...' : <>Send Message <FiSend /></>}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
