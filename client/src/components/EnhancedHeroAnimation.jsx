import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const EnhancedHeroAnimation = () => {
  const containerRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    // Create floating 3D particles
    const createFloatingElements = () => {
      const container = containerRef.current;
      if (!container) return;

      // Clear existing elements
      floatingElementsRef.current.forEach(el => el.remove());
      floatingElementsRef.current = [];

      const shapes = ['circle', 'square', 'triangle', 'hexagon'];
      const colors = ['#6366f1', '#a855f7', '#ec4899', '#10b981'];

      for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        const size = Math.random() * 20 + 10;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        element.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          opacity: ${Math.random() * 0.3 + 0.1};
          border-radius: ${shape === 'circle' ? '50%' : shape === 'hexagon' ? '25%' : '4px'};
          filter: blur(${Math.random() * 8 + 4}px);
          z-index: -1;
        `;

        container.appendChild(element);
        floatingElementsRef.current.push(element);

        // Animate with GSAP
        gsap.to(element, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          rotation: Math.random() * 360,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    createFloatingElements();

    return () => {
      floatingElementsRef.current.forEach(el => el.remove());
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1],
        rotateY: { duration: 1.5 }
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="glass-panel"
      style={{
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(30, 41, 59, 0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Window Header */}
      <div style={{
        padding: '0.8rem 1rem',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }}></div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'sans-serif' }}>future.js</div>
      </div>

      {/* Code Body */}
      <div style={{ padding: '1.5rem', position: 'relative', minHeight: '200px' }}>
        {/* 3D Glow effect */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '250px',
          height: '250px',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          filter: 'blur(120px)',
          opacity: 0.2,
          zIndex: 0,
          borderRadius: '50%'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1rem' }}>
          {/* Line Numbers */}
          <div style={{ color: '#4b5563', textAlign: 'right', userSelect: 'none' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <CodeSnippet />
        </div>
      </div>
    </motion.div>
  );
};

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

  return (
    <div style={{ flex: 1, fontFamily: '"Fira Code", monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
      {codeLines.map((line, i) => (
        <TypewriterLine key={i} text={line} delay={i * 0.8} />
      ))}
    </div>
  );
};

const TypewriterLine = ({ text, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
      style={{ minHeight: '1.5em' }}
    >
      {renderHighlighted(text)}
    </motion.div>
  );
};

const renderHighlighted = (txt) => {
  const keywords = ['const', 'async', 'await', 'return', 'new', 'function'];
  const functions = ['createFuture', 'compile', 'launch', 'Date', 'log'];
  const comments = txt.startsWith('//');

  if (comments) return <span style={{ color: '#6b7280' }}>{txt}</span>;

  return txt.split(' ').map((word, i) => {
    const cleanWord = word.replace(/[();{}.]/g, '');

    let style = { color: '#e5e7eb' };
    if (keywords.includes(cleanWord)) style = { color: '#c084fc' };
    else if (functions.includes(cleanWord)) style = { color: '#60a5fa' };
    else if (word.includes('()')) style = { color: '#60a5fa' };

    return <span key={i} style={style}>{word} </span>;
  });
};

export default EnhancedHeroAnimation;