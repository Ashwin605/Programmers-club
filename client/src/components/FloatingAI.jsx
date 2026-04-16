import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const FloatingAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm the ProgClub AI Assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // eslint-disable-next-line
    const userMsg = { id: Date.now(), text: inputText, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Mock AI Response with delay
    setTimeout(() => {
      const botResponse = getMockResponse(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, isBot: true }]);
      setIsTyping(false);
    }, 1500);
  };

  const getMockResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('event') || lower.includes('hackathon')) return "We have an upcoming Hackathon on March 10th! Check the Events page for more details.";
    if (lower.includes('register') || lower.includes('join')) return "You can register by clicking the 'Join Now' button in the top right corner.";
    if (lower.includes('contact')) return "You can reach us at contact@progclub.com or through the Contact page.";
    if (lower.includes('resource') || lower.includes('learn')) return "We recommend checking out our Workshops section for learning resources on React and Node.js.";
    return "I'm not sure about that, but I'm learning every day! Try asking about events or registration.";
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8, transformOrigin: "bottom right" }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '100%',
                right: '0',
                marginBottom: '1.5rem',
                width: '350px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                background: '#0a0a0a',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                overflow: 'hidden'
              }}
            >
              {/* Header */}
              <div style={{ 
                padding: '1rem', 
                borderBottom: '1px solid rgba(255,255,255,0.1)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    padding: '8px', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaRobot color="#a855f7" size={20} />
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, display: 'block' }}>ProgBot</span>
                    <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                      Online
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ opacity: 0.7, transition: 'opacity 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.4)' }}>
                {messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    style={{ 
                      alignSelf: msg.isBot ? 'flex-start' : 'flex-end', 
                      maxWidth: '85%',
                      background: msg.isBot ? 'rgba(30, 41, 59, 0.8)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                      padding: '1rem',
                      borderRadius: '16px',
                      borderBottomLeftRadius: msg.isBot ? '4px' : '16px',
                      borderBottomRightRadius: msg.isBot ? '16px' : '4px',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      border: msg.isBot ? '1px solid rgba(255,255,255,0.05)' : 'none'
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', background: 'rgba(30, 41, 59, 0.8)', padding: '0.8rem 1.2rem', borderRadius: '16px', borderBottomLeftRadius: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} style={{ width: '6px', height: '6px', background: '#9ca3af', borderRadius: '50%' }} />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} style={{ width: '6px', height: '6px', background: '#9ca3af', borderRadius: '50%' }} />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} style={{ width: '6px', height: '6px', background: '#9ca3af', borderRadius: '50%' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.6)' }}>
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  style={{ display: 'flex', gap: '10px' }}
                >
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    style={{ 
                      flex: 1, 
                      background: 'rgba(255,255,255,0.05)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      padding: '0.8rem 1rem', 
                      borderRadius: '24px', 
                      color: 'white',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    style={{ 
                      background: 'var(--gradient-main)', 
                      color: 'white', 
                      width: '45px',
                      height: '45px', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                    }}
                  >
                    <FiSend size={18} style={{ marginLeft: '2px' }} />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: isOpen 
              ? '0 0 0 rgba(99, 102, 241, 0)' 
              : ['0 0 0 0px rgba(99, 102, 241, 0.4)', '0 0 0 20px rgba(99, 102, 241, 0)']
          }}
          transition={{ 
            boxShadow: { duration: 1.5, repeat: Infinity, repeatDelay: 1 }
          }}
          style={{ 
            width: '65px', 
            height: '65px', 
            borderRadius: '50%', 
            background: 'var(--gradient-main)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
            color: 'white',
            cursor: 'pointer',
            border: 'none',
            zIndex: 1000
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiX size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaRobot size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
};

export default FloatingAI;
