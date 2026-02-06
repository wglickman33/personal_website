import { Link } from 'react-router-dom';
import '../../../pages/PlaygroundPage/PlaygroundPage.scss';

const CasinoHub = () => {
  return (
    <div className="playground-casino">
      <div className="playground-casino__grid">
        <Link to="blackjack" className="playground-landing__card">
          <div className="playground-landing__cardTitle">Blackjack</div>
          <div className="playground-landing__cardBody">6-deck shoe. Bet coins. Hit, stand, double.</div>
          <div className="playground-landing__cardCta">Play</div>
        </Link>

        <div className="playground-landing__card playground-landing__card--disabled">
          <div className="playground-landing__cardTitle">Roulette</div>
          <div className="playground-landing__cardBody">Coming soon</div>
        </div>

        <div className="playground-landing__card playground-landing__card--disabled">
          <div className="playground-landing__cardTitle">Plinko</div>
          <div className="playground-landing__cardBody">Coming soon</div>
        </div>

        <div className="playground-landing__card playground-landing__card--disabled">
          <div className="playground-landing__cardTitle">Keno</div>
          <div className="playground-landing__cardBody">Coming soon</div>
        </div>

        <div className="playground-landing__card playground-landing__card--disabled">
          <div className="playground-landing__cardTitle">Baccarat</div>
          <div className="playground-landing__cardBody">Coming soon</div>
        </div>

        <div className="playground-landing__card playground-landing__card--disabled">
          <div className="playground-landing__cardTitle">Poker (Hold’em)</div>
          <div className="playground-landing__cardBody">Coming soon</div>
        </div>
      </div>
    </div>
  );
};

export default CasinoHub;

