import { useState, useEffect } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | null;
}

export const useScrollPosition = (threshold: number = 50): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      const isScrolled = currentScrollY > threshold;
      
      const scrollDirection = 
        currentScrollY > lastScrollY 
          ? 'down' 
          : currentScrollY < lastScrollY 
            ? 'up' 
            : null;
      
      setScrollPosition({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        isScrolled,
        scrollDirection,
      });
      
      lastScrollY = currentScrollY;
    };

    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrollPosition;
};

export default useScrollPosition;