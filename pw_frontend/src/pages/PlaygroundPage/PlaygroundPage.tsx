import PhysicsEngine from '../../components/widgets/PhysicsEngine/PhysicsEngine';
import './PlaygroundPage.scss';

const PlaygroundPage = () => {
  return (
    <div className="page-name-page">
      <div className="container">
        <h1>Playground</h1>
        <PhysicsEngine />
      </div>
    </div>
  );
};

export default PlaygroundPage;