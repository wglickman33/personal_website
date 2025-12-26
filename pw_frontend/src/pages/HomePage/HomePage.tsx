import Hero from '../../components/Hero/Hero';
import Projects from '../../components/Projects/Projects';
import Skills from '../../components/Skills/Skills';
import Footer from '../../components/Footer/Footer';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
};

export default HomePage;
