import { useEffect } from 'react';

/**
 * Custom hook to trigger entrance animations on scroll using Intersection Observer.
 * Adds 'reveal-active' class to elements when they enter the viewport.
 */
export const useScrollReveal = (selector = '.reveal-on-scroll', threshold = 0.05) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          // Once revealed, we can unobserve if we only want it to happen once
          // observer.unobserve(entry.target); 
        } else {
          // Optional: remove class to animate again on scroll up
          // entry.target.classList.remove('reveal-active');
        }
      });
    }, {
      threshold,
      rootMargin: '0px'
    });

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selector, threshold]);
};
