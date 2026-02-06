import { Link } from 'react-router-dom';
import PhysicsEngine from '../../components/widgets/PhysicsEngine/PhysicsEngine';
import './PlaygroundPage.scss';

const PlaygroundPhysics = () => {
  return (
    <div className="playground-section">
      <div className="playground-section__topbar">
        <div className="playground-section__left">
          <h1 className="playground-section__title">Physics</h1>
          <div className="playground-section__breadcrumb">
            <Link to="/playground" className="playground-section__link">Playground</Link>
            <span className="playground-section__sep">/</span>
            <span>Physics</span>
          </div>
        </div>
      </div>

      <PhysicsEngine />
    </div>
  );
};

export default PlaygroundPhysics;

