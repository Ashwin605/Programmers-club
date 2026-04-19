import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiBook, FiLayers, FiHash, FiCheckCircle } from 'react-icons/fi';

const EventRegister = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        rollNumber: '',
        branch: '',
        year: '',
        section: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [eventName, setEventName] = useState('Event...');

    useEffect(() => {
        const fetchEventName = async () => {
            try {
                const { data } = await axios.get(`/api/events/${id}`);
                if (data && data.title) {
                    setEventName(data.title);
                }
            } catch (error) {
                console.error("Failed to fetch event details", error);
            }
        };
        if (id) fetchEventName();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/api/registrations', {
                ...formData,
                event: id
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ 
                minHeight: '80vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                paddingTop: '80px'
            }}>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-panel"
                    style={{ 
                        padding: '3rem', 
                        textAlign: 'center', 
                        maxWidth: '500px'
                    }}
                >
                    <FiCheckCircle size={64} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Registration Successful!</h2>
                    <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                        You have successfully registered for <strong>{eventName}</strong>. 
                        We have sent a confirmation details to your email.
                    </p>
                    <button 
                        onClick={() => navigate('/events')}
                        style={{ 
                            background: 'var(--gradient-main)',
                            border: 'none',
                            padding: '0.8rem 2rem',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Browse More Events
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '3rem', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="glass-panel"
                    style={{ padding: '2rem' }}
                >
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Event Registration</h1>
                    <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '2rem' }}>
                        Register for <span style={{ color: '#6366f1', fontWeight: 600 }}>{eventName}</span>
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        
                        {/* Name */}
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <FiUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ 
                                        width: '100%', 
                                        padding: '0.8rem 1rem 0.8rem 2.8rem', 
                                        background: 'rgba(255,255,255,0.05)', 
                                        border: '1px solid rgba(255,255,255,0.1)', 
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Email & Phone */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <FiMail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.8rem 1rem 0.8rem 2.8rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <FiPhone style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        required
                                        placeholder="+91 9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.8rem 1rem 0.8rem 2.8rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Roll No & Branch */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>Roll Number</label>
                                <div style={{ position: 'relative' }}>
                                    <FiHash style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                    <input 
                                        type="text" 
                                        name="rollNumber"
                                        required
                                        placeholder="20A41A0501"
                                        value={formData.rollNumber}
                                        onChange={handleChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.8rem 1rem 0.8rem 2.8rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>Branch</label>
                                <div style={{ position: 'relative' }}>
                                    <FiLayers style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                    <select 
                                        name="branch"
                                        required
                                        value={formData.branch}
                                        onChange={handleChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.8rem 1rem 0.8rem 2.8rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none',
                                            appearance: 'none'
                                        }}
                                    >
                                        <option value="" style={{ color: 'black' }}>Select Branch</option>
                                        <option value="CSE" style={{ color: 'black' }}>CSE</option>
                                        <option value="ECE" style={{ color: 'black' }}>ECE</option>
                                        <option value="EEE" style={{ color: 'black' }}>EEE</option>
                                        <option value="MECH" style={{ color: 'black' }}>MECH</option>
                                        <option value="CIVIL" style={{ color: 'black' }}>CIVIL</option>
                                        <option value="AI&DS" style={{ color: 'black' }}>AI&DS</option>
                                        <option value="AIML" style={{ color: 'black' }}>AIML</option>
                                        <option value="AI" style={{ color: 'black' }}>AI</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Year & Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>Year (Class)</label>
                                <div style={{ position: 'relative' }}>
                                    <FiBook style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                    <select 
                                        name="year"
                                        required
                                        value={formData.year}
                                        onChange={handleChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.8rem 1rem 0.8rem 2.8rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="" style={{ color: 'black' }}>Select Year</option>
                                        <option value="1" style={{ color: 'black' }}>1st Year</option>
                                        <option value="2" style={{ color: 'black' }}>2nd Year</option>
                                        <option value="3" style={{ color: 'black' }}>3rd Year</option>
                                        <option value="4" style={{ color: 'black' }}>4th Year</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#9ca3af' }}>Section</label>
                                <div style={{ position: 'relative' }}>
                                    <FiHash style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                                    <input 
                                        type="text" 
                                        name="section"
                                        required
                                        placeholder="A"
                                        value={formData.section}
                                        onChange={handleChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.8rem 1rem 0.8rem 2.8rem', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{ 
                                marginTop: '1rem',
                                background: 'var(--gradient-main)',
                                border: 'none',
                                padding: '1rem',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            {loading ? 'Registering...' : 'Complete Registration'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default EventRegister;
