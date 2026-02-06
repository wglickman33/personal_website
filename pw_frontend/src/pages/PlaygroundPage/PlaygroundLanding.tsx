import { Link } from 'react-router-dom';
import { usePlaygroundWallet } from '../../context/usePlaygroundWallet';
import './PlaygroundPage.scss';

const PlaygroundLanding = () => {
  const wallet = usePlaygroundWallet();

  return (
    <div className="playground-landing">
      <div className="playground-landing__bg" aria-hidden="true"></div>

      <div className="playground-landing__content">
        <div className="playground-landing__header">
          <div className="playground-landing__badgeRow">
            <div className="playground-landing__badge">
              <span className="material-symbols-outlined playground-landing__badgeIcon" aria-hidden="true">paid</span>
              <span className="playground-landing__badgeLabel">Shared Coins</span>
              <span className="playground-landing__badgeValue">{wallet.balance.toLocaleString()}</span>
            </div>
            <div className="playground-landing__badge playground-landing__badge--hint">
              Coins carry across Physics + Casino
            </div>
          </div>

          <h1 className="playground-landing__title">Playground</h1>
          <p className="playground-landing__subtitle">
            Pick a sandbox. Break things. Learn fast. Rack up coins.
          </p>
        </div>

        <div className="playground-landing__grid">
          <Link to="/playground/physics" className="playground-landing__card playground-landing__card--physics">
            <div className="playground-landing__cardTop">
              <span className="material-symbols-outlined playground-landing__cardIcon" aria-hidden="true">ads_click</span>
              <div className="playground-landing__cardTitle">Physics Engine</div>
            </div>
            <div className="playground-landing__cardBody">
              Drop items into a bouncy box. Earn coins from collisions. Unlock more droppables.
            </div>
            <div className="playground-landing__cardMeta">
              <span className="playground-landing__pill">Shop</span>
              <span className="playground-landing__pill">Bouncy Box</span>
              <span className="playground-landing__pill">Drag + Drop</span>
            </div>
            <div className="playground-landing__cardCta">
              Enter
              <span className="material-symbols-outlined playground-landing__cardCtaIcon" aria-hidden="true">arrow_forward</span>
            </div>
          </Link>

          <Link to="/playground/casino" className="playground-landing__card playground-landing__card--casino">
            <div className="playground-landing__cardTop">
              <span className="material-symbols-outlined playground-landing__cardIcon" aria-hidden="true">casino</span>
              <div className="playground-landing__cardTitle">Casino (Fake)</div>
            </div>
            <div className="playground-landing__cardBody">
              Play casino mini-games with your shared coins. Blackjack is live; more coming soon.
            </div>
            <div className="playground-landing__cardMeta">
              <span className="playground-landing__pill">Blackjack</span>
              <span className="playground-landing__pill">6-Deck Shoe</span>
              <span className="playground-landing__pill">Betting</span>
            </div>
            <div className="playground-landing__cardCta">
              Enter
              <span className="material-symbols-outlined playground-landing__cardCtaIcon" aria-hidden="true">arrow_forward</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundLanding;

