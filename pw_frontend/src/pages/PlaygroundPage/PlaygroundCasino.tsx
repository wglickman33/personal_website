import { Link, Route, Routes } from 'react-router-dom';
import './PlaygroundPage.scss';
import CasinoHub from '../../components/widgets/Casino/CasinoHub';
import BlackjackGame from '../../components/widgets/Casino/Blackjack/BlackjackGame';

const PlaygroundCasino = () => {
  return (
    <div className="playground-section">
      <div className="playground-section__topbar">
        <div className="playground-section__left">
          <h1 className="playground-section__title">Casino</h1>
          <div className="playground-section__breadcrumb">
            <Link to="/playground" className="playground-section__link">Playground</Link>
            <span className="playground-section__sep">/</span>
            <span>Casino</span>
          </div>
        </div>
      </div>

      <Routes>
        <Route index element={<CasinoHub />} />
        <Route path="blackjack" element={<BlackjackGame />} />
      </Routes>
    </div>
  );
};

export default PlaygroundCasino;

