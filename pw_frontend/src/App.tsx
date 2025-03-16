import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { NavProvider } from './context/NavProvider';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ResumePage from './pages/ResumePage/ResumePage';
import PlaygroundPage from './pages/PlaygroundPage/PlaygroundPage';
import { setupMobileNavigation } from './utils/mobileNav';
import './App.scss';

function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      setupMobileNavigation();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ThemeProvider>
      <NavProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/apps" element={<ProjectsPage section="apps" />} />
                <Route path="/projects/widgets" element={<ProjectsPage section="widgets" />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </NavProvider>
    </ThemeProvider>
  );
}

export default App;