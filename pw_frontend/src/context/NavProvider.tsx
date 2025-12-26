import { useState, useCallback, ReactNode } from 'react';
import { NavContext } from './NavContext';

interface NavProviderProps {
  children: ReactNode;
}

export const NavProvider = ({ children }: NavProviderProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const toggleNav = useCallback(() => {
    setIsNavOpen(prevState => !prevState);
  }, []);
  
  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);
  
  return (
    <NavContext.Provider value={{ isNavOpen, toggleNav, closeNav }}>
      {children}
    </NavContext.Provider>
  );
};