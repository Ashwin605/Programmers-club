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
                if (data && data.length > 0) {
                    setEvents(data);
                } else {
                    throw new Error("No events found");
                }
            } catch (err) {
                console.error("API failed, using mock data:", err);
                // Fallback Mock Data
                setEvents([
                    {
                        _id: '1',
                        title: 'Full Stack Workshop',
                        description: 'Learn MERN stack from scratch in this 2-day hands-on workshop.',
                        date: new Date('2025-02-15'),
                        location: 'Lab 1',
                        category: 'Workshop',
                        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
                    },
                    {
                        _id: '2',
                        title: 'HackTheFuture 2025',
                        description: '24-hour hackathon to solve real-world problems using AI and Blockchain.',
                        date: new Date('2025-03-10'),
                        location: 'Main Auditorium',
                        category: 'Hackathon',
                        image: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1924&auto=format&fit=crop'
                    },
                    {
                        _id: '3',
                        title: 'Tech Talk: Graph Neural Networks',
                        description: 'Deep dive into GNNs with Dr. Alan Turing (Guest Speaker).',
                        date: new Date('2025-01-20'),
                        location: 'Seminar Hall',
                        category: 'Seminar',
                        image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=2071&auto=format&fit=crop'
                    }
                ]);
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
