import { createContext } from 'react';

interface NavContextType {
  isNavOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;
}

const NavContext = createContext<NavContextType>({
  isNavOpen: false,
  toggleNav: () => {},
  closeNav: () => {},
});

export { NavContext };
export default NavContext;