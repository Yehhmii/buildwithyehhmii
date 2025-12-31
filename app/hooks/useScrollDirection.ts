import { useState, useEffect } from 'react';

export const useScrollDirection = (): 'up' | 'down' => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [prevScroll, setPrevScroll] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > prevScroll && currentScroll > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setPrevScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  return scrollDirection;
};