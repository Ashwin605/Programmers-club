import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation utility functions
export const animateOnScroll = (element, options = {}) => {
  const {
    y = 50,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = "power2.out",
    start = "top 80%"
  } = options;

  gsap.fromTo(element,
    {
      y,
      opacity,
      rotationX: -5
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const createParallax = (element, intensity = 0.3) => {
  gsap.to(element, {
    yPercent: -intensity * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

export const staggerAnimation = (elements, options = {}) => {
  const {
    y = 30,
    opacity = 0,
    duration = 0.6,
    stagger = 0.1,
    ease = "power2.out"
  } = options;

  gsap.fromTo(elements,
    {
      y,
      opacity
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: elements[0],
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

export const hover3DEffect = (element) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

    gsap.to(element, {
      rotationY: x,
      rotationX: -y,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  });
};

// Initialize all animations
export const initAnimations = () => {
  // Wait for DOM to be fully loaded
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      try {
        // Animate elements with data-animate attribute
        const animateElements = gsap.utils.toArray('[data-animate]');
        if (animateElements.length > 0) {
          animateElements.forEach((element, index) => {
            animateOnScroll(element, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "back.out(1.7)"
            });
          });
        }

        // Apply parallax to elements with data-parallax attribute
        const parallaxElements = gsap.utils.toArray('[data-parallax]');
        if (parallaxElements.length > 0) {
          parallaxElements.forEach((element) => {
            const intensity = parseFloat(element.getAttribute('data-parallax-intensity')) || 0.3;
            createParallax(element, intensity);
          });
        }

        // Apply 3D hover effects to elements with data-3d-hover attribute
        const hoverElements = gsap.utils.toArray('[data-3d-hover]');
        if (hoverElements.length > 0) {
          hoverElements.forEach((element) => {
            hover3DEffect(element);
          });
        }
      } catch (error) {
        console.warn('Animation initialization error:', error);
      }
    }, 100); // Small delay to ensure DOM is ready
  }
};