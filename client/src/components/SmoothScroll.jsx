import React, { useEffect } from 'react';
import { initAnimations } from '../utils/animationUtils';

const SmoothScroll = () => {
  useEffect(() => {
    // Initialize all animations
    initAnimations();

    return () => {
      // Clean up ScrollTrigger instances
      if (typeof window !== 'undefined') {
        const ScrollTrigger = require('gsap/ScrollTrigger');
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return null;
};

export default SmoothScroll;