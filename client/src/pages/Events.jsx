import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import axios from 'axios';
import EventCard from '../components/EventCard';
import SEO from '../components/SEO';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get('/api/events');
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    setEvents([]);
                }
            } catch (err) {
                console.error("API failed:", err);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
                <p>Loading events...</p>
            </div>
        );
    }


    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }} className="container">
            <SEO 
                title="Events & Hackathons | Vemu Institute of Technology Programming Club" 
                description="Explore upcoming workshops, hackathons, and tech talks at Vemu IT Programming Club. Enhance your skills and network with the developer community."
                keywords="Vemu IT events, programming club hackathon, workshops, tech talks, coding competitions"
            />
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3rem', marginBottom: '2rem' }}
            >
                Upcoming <span className="text-gradient">Events</span>
            </motion.h1>

            {events.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: '1.2rem' }}>No upcoming events scheduled at the moment.</p>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '2rem',
                    paddingBottom: '4rem'
                }}>
                    {events.map((event, index) => (
                        <EventCard key={event._id} event={event} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;
