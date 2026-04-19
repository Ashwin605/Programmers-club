import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line
import { FiMenu, FiX, FiTerminal, FiLogOut } from 'react-icons/fi';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (user && user.role === 'admin') {
      navigate('/dashboard');
    } else {
      setShowAccessDenied(true);
    }
    setIsOpen(false);
  };

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
                <button 
                  onClick={handleDashboardClick}
                  style={{ 
                    color: '#fff', 
                    textDecoration: 'none', 
                    fontSize: '0.95rem', 
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Dashboard
                </button>
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
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    cursor: 'pointer'
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
                            <button 
                                onClick={handleDashboardClick}
                                style={{ 
                                  fontSize: '1.2rem', 
                                  color: '#fff', 
                                  fontWeight: 600,
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: 0,
                                  textAlign: 'left'
                                }}
                            >
                                Dashboard
                            </button>
                            <button 
                                onClick={() => { logout(); setIsOpen(false); }}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem', 
                                    color: '#ef4444', 
                                    fontSize: '1.2rem',
                                    fontWeight: 600,
                                    textAlign: 'left',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0
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

        {/* Access Denied Modal */}
        <AnimatePresence>
          {showAccessDenied && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAccessDenied(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                backdropFilter: 'blur(4px)'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 40, 0.95) 0%, rgba(30, 20, 50, 0.95) 100%)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  maxWidth: '450px',
                  width: '90%',
                  textAlign: 'center',
                  boxShadow: '0 20px 60px rgba(239, 68, 68, 0.1)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
                <h2 style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 700, 
                  marginBottom: '1rem',
                  color: '#ef4444'
                }}>
                  Access Denied
                </h2>
                <p style={{ 
                  color: '#d1d5db', 
                  fontSize: '1rem', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  The Dashboard is only accessible to administrators. Only admins can view and manage events through the dashboard.
                </p>
                <div style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  color: '#a5b4fc',
                  fontSize: '0.9rem'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Admin Credentials</p>
                  <p style={{ margin: '0', fontSize: '0.85rem' }}>
                    Contact your administrator if you believe you should have access.
                  </p>
                </div>
                <button
                  onClick={() => setShowAccessDenied(false)}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    color: 'white',
                    padding: '0.8rem 2rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Understood
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
