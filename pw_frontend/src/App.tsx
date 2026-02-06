import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { NavProvider } from './context/NavProvider';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ResumePage from './pages/ResumePage/ResumePage';
import PlaygroundPage from './pages/PlaygroundPage/PlaygroundPage';
import PlaygroundLanding from './pages/PlaygroundPage/PlaygroundLanding';
import PlaygroundPhysics from './pages/PlaygroundPage/PlaygroundPhysics';
import PlaygroundCasino from './pages/PlaygroundPage/PlaygroundCasino';
import SkillsPage from './pages/SkillsPage/SkillsPage';
import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <NavProvider>
        <Router>
          <div className="app">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/playground" element={<PlaygroundPage />}>
                  <Route index element={<PlaygroundLanding />} />
                  <Route path="physics" element={<PlaygroundPhysics />} />
                  <Route path="casino/*" element={<PlaygroundCasino />} />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </NavProvider>
    </ThemeProvider>
  );
}

export default App;