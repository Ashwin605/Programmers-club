import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line
import { FiMenu, FiX, FiTerminal, FiLogOut } from 'react-icons/fi';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10' : 'py-6 bg-transparent'}`}
         style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 100,
            padding: scrolled ? '0.7rem 1.5rem' : '1rem 1.5rem',
            background: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
            transition: 'all 0.3s ease'
         }}
    >
      <div className="container flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '1.3rem' }}>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: '#6366f1' }}
            >
              <FiTerminal size={24} />
            </motion.div>
            <span className="text-gradient">VEMU PROGCLUB</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="relative text-sm font-medium hover:text-white transition-colors"
              style={{ 
                  color: location.pathname === link.path ? '#fff' : '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500
              }}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="underline"
                  style={{ 
                    position: 'absolute', 
                    bottom: '-4px', 
                    left: 0, 
                    right: 0, 
                    height: '2px', 
                    background: '#6366f1',
                    borderRadius: '2px'
                  }} 
                />
              )}
            </Link>
          ))}
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <Link 
                  to="/dashboard"
                  style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}
                >
                  Dashboard
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                </div>
                <button 
                  onClick={logout}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: '#ef4444',
                    background: 'rgba(239, 68, 68, 0.1)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                  }}
                  className="hover:bg-red-500/20"
                >
                  <FiLogOut /> Logout
                </button>
            </div>
          ) : (
            <Link 
              to="/register" 
              style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              Join Now
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ zIndex: 110, position: 'relative', color: 'white' }} 
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '70%',
                        maxWidth: '300px',
                        background: '#0a0a0a',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        zIndex: 100,
                        padding: '6rem 2rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem',
                        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                    }}
                >
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            style={{ 
                                fontSize: '1.2rem', 
                                color: location.pathname === link.path ? '#6366f1' : '#fff',
                                fontWeight: 600 
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }}></div>
                            <Link 
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                                style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600 }}
                            >
                                Dashboard
                            </Link>
                            <button 
                                onClick={() => { logout(); setIsOpen(false); }}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    color: '#ef4444', 
                                    fontSize: '1.2rem',
                                    fontWeight: 600,
                                    textAlign: 'left'
                                }} 
                            >
                                <FiLogOut /> Logout
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/register" 
                            onClick={() => setIsOpen(false)}
                            style={{ 
                                marginTop: '1rem',
                                background: 'var(--gradient-main)', 
                                padding: '0.8rem', 
                                borderRadius: '8px', 
                                textAlign: 'center', 
                                color: 'white', 
                                fontWeight: 600 
                            }}
                        >
                            Join Now
                        </Link>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
