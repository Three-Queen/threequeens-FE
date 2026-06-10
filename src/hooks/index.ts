import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll position for sticky navbar effects
 */
export const useScrolled = (threshold = 80) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};

/**
 * Hook to handle smooth scroll to section
 */
export const useSmoothScroll = () => {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return { scrollTo };
};
