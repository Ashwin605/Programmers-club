import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const CodeSnippet = () => {
    const codeLines = [
        "const createFuture = async () => {",
        "  const dream = new Dream();",
        "  await dream.compile();",
        "  return dream.launch();",
        "};",
        "",
        "// Initialize ProgClub",
        "createFuture();"
    ];

    const [key, setKey] = useState(0);

    useEffect(() => {
        const totalDuration = 14000; // Total animation cycle duration (~14s)
        const interval = setInterval(() => {
            setKey(prev => prev + 1); // Reset animation by changing key
        }, totalDuration);

        return () => clearInterval(interval);
    }, []);

    return (
        <div key={key} style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
            {codeLines.map((line, i) => (
                <TypewriterLine key={i} text={line} delay={i * 1.5} />
            ))}
        </div>
    );
};

const TypewriterLine = ({ text, delay }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout;
    const startTyping = () => {
      let currentText = '';
      text.split('').forEach((char, index) => {
        setTimeout(() => {
          currentText += char;
          setDisplayedText(currentText);
        }, index * 50); // Typing speed
      });
    };

    timeout = setTimeout(startTyping, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  // Syntax highlighting logic (simple)
  const renderHighlighted = (txt) => {
    const keywords = ['const', 'async', 'await', 'return', 'new', 'function'];
    const functions = ['createFuture', 'compile', 'launch', 'Date', 'log'];
    const comments = txt.startsWith('//');
    
    if (comments) return <span style={{ color: '#6b7280' }}>{txt}</span>;

    return txt.split(' ').map((word, i) => {
      // Handle function calls like createFuture();
      const cleanWord = word.replace(/[();{}.]/g, '');
      
      let style = { color: '#e5e7eb' };
      if (keywords.includes(cleanWord)) style = { color: '#c084fc' }; // Purple
      else if (functions.includes(cleanWord)) style = { color: '#60a5fa' }; // Blue
      else if (word.includes('()')) style = { color: '#60a5fa' }; 

      return <span key={i} style={style}>{word} </span>;
    });
  };

  return (
    <div style={{ minHeight: '1.5em' }}>
      {renderHighlighted(displayedText)}
    </div>
  );
};

const HeroAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="glass-panel"
      style={{
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(30, 41, 59, 0.7)', // Darker glass
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative'
      }}
    >
      {/* Window Header */}
      <div style={{
        padding: '0.8rem 1rem',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'sans-serif' }}>future.js</div>
      </div>

      {/* Code Body */}
      <div style={{ padding: '1.5rem', position: 'relative' }}>
        {/* Glow effect behid code */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: '200px', 
          height: '200px', 
          background: '#6366f1', 
          filter: 'blur(100px)', 
          opacity: 0.15, 
          zIndex: 0 
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1rem' }}>
          {/* Line Numbers */}
          <div style={{ color: '#4b5563', textAlign: 'right', userSelect: 'none' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>{i + 1}</div>
            ))}
          </div>
          
          {/* Code Content */}
          <div style={{ flex: 1 }}>
            <CodeSnippet />
          </div>
        </div>
      </div>
      
       {/* Floating Elements (Decorations) */}
       <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            borderRadius: '20px',
            zIndex: -1,
            opacity: 0.5,
            filter: 'blur(20px)'
        }}
       />
    </motion.div>
  );
};

export default HeroAnimation;
