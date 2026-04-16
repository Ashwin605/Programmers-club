import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EventCard = ({ event, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-panel"
        style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
        <div style={{ height: '200px', overflow: 'hidden', background: '#222' }}>
            {event.image ? (
                <img 
                    src={event.image} 
                    alt={event.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                    No Image
                </div>
            )}
        </div>
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ 
                color: '#ec4899', 
                fontSize: '0.8rem', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                marginBottom: '0.5rem' 
            }}>
                {event.category} {event.date && `• ${new Date(event.date).toLocaleDateString()}`}
            </span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{event.title}</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{event.description}</p>
            <Link to={`/events/${event.title.replace(/\s+/g, '-').toLowerCase()}/register`} style={{ textDecoration: 'none' }}>
                <button style={{ 
                    width: '100%', 
                    padding: '0.8rem', 
                    borderRadius: '8px', 
                    background: 'rgba(99, 102, 241, 0.2)', 
                    color: '#818cf8', 
                    fontWeight: 600,
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.background = '#6366f1';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                    e.currentTarget.style.color = '#818cf8';
                }}
                >
                    Register Now
                </button>
            </Link>
        </div>
    </motion.div>
);

export default EventCard;
