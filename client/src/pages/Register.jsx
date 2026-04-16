import React, { useState, useContext } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setLoading(true);
            await register(formData.name, formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            paddingTop: '80px' 
        }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ 
                    padding: '2.5rem', 
                    width: '100%', 
                    maxWidth: '500px',
                    borderRadius: '24px'
                }}
            >
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Join the Club</h2>
                <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' }}>Create your account to start your journey</p>

                {error && <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    color: '#ef4444', 
                    padding: '0.8rem', 
                    borderRadius: '8px', 
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <FiUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange} 
                                required
                                placeholder="John Doe"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.8rem 1rem 0.8rem 2.5rem', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <FiMail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange} 
                                required
                                placeholder="john@example.com"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.8rem 1rem 0.8rem 2.5rem', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <FiLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange} 
                                required
                                placeholder="••••••••"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.8rem 1rem 0.8rem 2.5rem', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <FiLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input 
                                type="password" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange} 
                                required
                                placeholder="••••••••"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.8rem 1rem 0.8rem 2.5rem', 
                                    background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(255,255,255,0.1)', 
                                    borderRadius: '12px',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ 
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'var(--gradient-main)',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        {loading ? 'Creating Account...' : (
                            <>
                                Register <FiArrowRight />
                            </>
                        )}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>
                    Already have an account? <Link to="/login" style={{ color: '#6366f1', fontWeight: 600 }}>Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
