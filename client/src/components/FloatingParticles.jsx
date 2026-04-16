import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const FloatingParticles = ({ count = 20, sizeRange = [5, 15], speedRange = [3, 8] }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const createParticles = () => {
      const container = containerRef.current;
      if (!container) return;

      // Clear existing particles
      particlesRef.current.forEach(particle => particle.remove());
      particlesRef.current = [];

      const colors = ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];
      const shapes = ['circle', 'square', 'triangle'];

      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        particle.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          opacity: ${Math.random() * 0.2 + 0.05};
          border-radius: ${shape === 'circle' ? '50%' : shape === 'triangle' ? '25%' : '4px'};
          filter: blur(${Math.random() * 6 + 2}px);
          pointer-events: none;
          z-index: -1;
        `;

        // Random starting position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;

        container.appendChild(particle);
        particlesRef.current.push(particle);

        // Animate with GSAP
        const speed = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
        const amplitudeX = Math.random() * 100 + 50;
        const amplitudeY = Math.random() * 100 + 50;

        gsap.to(particle, {
          x: `+=${amplitudeX}`,
          y: `+=${amplitudeY}`,
          rotation: Math.random() * 360,
          duration: speed,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % amplitudeX),
            y: gsap.utils.unitize(y => parseFloat(y) % amplitudeY)
          }
        });
      }
    };

    createParticles();

    // Handle window resize
    const handleResize = () => {
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      particlesRef.current.forEach(particle => particle.remove());
    };
  }, [count, sizeRange, speedRange]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

export default FloatingParticles;