import React, { useContext, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiTrash2, FiEdit2, FiUsers, FiCalendar } from 'react-icons/fi';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    // const [registrations, setRegistrations] = useState([]); // Placeholder for registrations
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        maxParticipants: '',
        category: 'workshop'
    });
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();



    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const { data } = await axios.get('/api/registrations');
                setRegistrations(data);
            } catch (error) {
                console.error("Failed to fetch registrations", error);
            }
        };

        if (user) {
            fetchRegistrations();
        }
    }, [user, activeTab]);

    useEffect(() => {
       // Only if we need to sync updates later, currently empty
    }, []);



    // Calculated stats
    const stats = [
        { label: 'Total Members', value: registrations.length ? new Set(registrations.map(r => r.email)).size.toString() : '0', icon: <FiUsers size={24} />, color: '#6366f1' },
        { label: 'Events Hosted', value: events.length.toString(), icon: <FiCalendar size={24} />, color: '#a855f7' },
        { label: 'Active Registrations', value: registrations.length.toString(), icon: <FiEdit2 size={24} />, color: '#ec4899' },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get('/api/events');
                setEvents(data);
            } catch (error) {
                console.error("Dashboard API Error:", error);
                // Fallback to empty array if API fails
                setEvents([]);
            }
        };

        if (!authLoading && !user) {
            navigate('/login');
        } else if (user) {
            fetchEvents();
        }
    }, [user, authLoading, navigate]);

    // Event creation handler
    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            const eventData = {
                title: newEvent.title,
                description: newEvent.description,
                date: newEvent.date ? new Date(`${newEvent.date}T${newEvent.time}`) : null,
                location: newEvent.location,
                category: newEvent.category,
                maxParticipants: newEvent.maxParticipants || null
            };

            // Call backend API
            const { data } = await axios.post('/api/events', eventData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Add to local state
            setEvents(prev => [data, ...prev]);
            setShowModal(false);
            setNewEvent({
                title: '',
                description: '',
                date: '',
                time: '',
                location: '',
                maxParticipants: '',
                category: 'workshop'
            });

        } catch (error) {
            console.error('Failed to create event:', error);
            alert('Failed to create event. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Delete event handler
    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await axios.delete(`/api/events/${eventId}`);
            setEvents(prev => prev.filter(e => e._id !== eventId));
        } catch (error) {
            console.error('Failed to delete event:', error);
            alert('Failed to delete event. Please try again.');
        }
    };

    // Data Moved Up for Stats Calculation

    if (authLoading) return <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p style={{ color: '#9ca3af' }}>Welcome back, {user?.name}</p>
                </div>
                {user && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setActiveTab('registrations')}
                            style={{
                                background: activeTab === 'registrations' ? 'var(--gradient-main)' : 'rgba(255,255,255,0.1)',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600
                            }}
                        >
                            <FiUsers /> Registrations
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            style={{
                                background: activeTab === 'events' ? 'var(--gradient-main)' : 'rgba(255,255,255,0.1)',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600
                            }}
                        >
                           <FiCalendar /> Manage Events
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                background: 'var(--gradient-main)',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <FiPlus /> Create Event
                        </button>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ 
                            width: '50px', 
                            height: '50px', 
                            borderRadius: '12px', 
                            background: `${stat.color}20`, 
                            color: stat.color, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</div>
                            <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Tabs */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>{activeTab === 'registrations' ? 'Recent Registrations' : 'Managed Events'}</h2>
                <div style={{ overflowX: 'auto' }}>
                    {activeTab === 'registrations' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {events.map(event => {
                                const eventRegistrations = registrations.filter(r => r.event === event.title);
                                return (
                                    <div key={event._id}>
                                        <h3 style={{ 
                                            marginBottom: '1rem', 
                                            paddingBottom: '0.5rem', 
                                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                                            color: '#818cf8'
                                        }}>
                                            {event.title}
                                        </h3>
                                        {eventRegistrations.length > 0 ? (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e5e7eb' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#9ca3af' }}>Name</th>
                                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#9ca3af' }}>Email</th>
                                                        <th style={{ textAlign: 'left', padding: '1rem', color: '#9ca3af' }}>Phone No.</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {eventRegistrations.map((reg) => (
                                                        <tr key={reg._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <td style={{ padding: '1rem' }}>{reg.name}</td>
                                                            <td style={{ padding: '1rem' }}>{reg.email}</td>
                                                            <td style={{ padding: '1rem' }}>{reg.phone}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p style={{ color: '#9ca3af', fontStyle: 'italic', padding: '1rem 0' }}>No registrations yet.</p>
                                        )}
                                    </div>
                                );
                            })}
                            {events.length === 0 && <p style={{ color: '#9ca3af' }}>No events to show.</p>}
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e5e7eb' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#9ca3af' }}>Event Name</th>
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#9ca3af' }}>Date</th>
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#9ca3af' }}>Location</th>
                                    <th style={{ textAlign: 'left', padding: '1rem', color: '#9ca3af' }}>Status</th>
                                    <th style={{ textAlign: 'right', padding: '1rem', color: '#9ca3af' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>{event.title}</td>
                                        <td style={{ padding: '1rem' }}>{event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}</td>
                                        <td style={{ padding: '1rem' }}>{event.location}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: '20px', 
                                                background: 'rgba(16, 185, 129, 0.1)', 
                                                color: '#34d399', 
                                                fontSize: '0.85rem' 
                                            }}>Active</span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button style={{ padding: '0.5rem', color: '#6366f1' }} title="Edit"><FiEdit2 /></button>
                                                <button onClick={() => handleDeleteEvent(event._id)} style={{ padding: '0.5rem', color: '#ef4444' }} title="Delete"><FiTrash2 /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {activeTab === 'events' && events.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>No events found.</p>}
                </div>
            </div>

            {/* Create Event Modal */}
            {showModal && (
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    background: 'rgba(0,0,0,0.8)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    zIndex: 1000 
                }}
                    onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-panel"
                        style={{ padding: '2rem', width: '560px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ margin: 0 }}>Create New Event</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                style={{ background: 'none', color: '#9ca3af', fontSize: '1.5rem', cursor: 'pointer', padding: '0.25rem' }}
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleCreateEvent}>
                            {/* Title */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                                    Event Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. React Workshop"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            {/* Description */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Describe the event..."
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            {/* Date & Time Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newEvent.date}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            colorScheme: 'dark'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                                        Time *
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={newEvent.time}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            colorScheme: 'dark'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={newEvent.location}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Room 204, CS Building"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            {/* Category & Max Participants Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={newEvent.category}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="workshop" style={{ background: '#1f2937' }}>Workshop</option>
                                        <option value="hackathon" style={{ background: '#1f2937' }}>Hackathon</option>
                                        <option value="seminar" style={{ background: '#1f2937' }}>Seminar</option>
                                        <option value="competition" style={{ background: '#1f2937' }}>Competition</option>
                                        <option value="meetup" style={{ background: '#1f2937' }}>Meetup</option>
                                        <option value="other" style={{ background: '#1f2937' }}>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500 }}>
                                        Max Participants
                                    </label>
                                    <input
                                        type="number"
                                        name="maxParticipants"
                                        value={newEvent.maxParticipants}
                                        onChange={handleInputChange}
                                        placeholder="Unlimited"
                                        min="1"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            background: 'rgba(255,255,255,0.05)',
                                            color: '#fff',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button 
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ 
                                        background: 'rgba(255,255,255,0.1)', 
                                        color: '#d1d5db', 
                                        padding: '0.75rem 1.5rem', 
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isCreating}
                                    style={{ 
                                        background: isCreating ? 'rgba(99,102,241,0.5)' : 'var(--gradient-main, linear-gradient(135deg, #6366f1, #a855f7))', 
                                        color: 'white', 
                                        padding: '0.75rem 1.5rem', 
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        cursor: isCreating ? 'not-allowed' : 'pointer',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {isCreating ? (
                                        <>
                                            <span style={{ 
                                                display: 'inline-block', 
                                                width: '16px', 
                                                height: '16px', 
                                                border: '2px solid rgba(255,255,255,0.3)', 
                                                borderTopColor: '#fff', 
                                                borderRadius: '50%', 
                                                animation: 'spin 0.6s linear infinite' 
                                            }} />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <FiPlus /> Create Event
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
