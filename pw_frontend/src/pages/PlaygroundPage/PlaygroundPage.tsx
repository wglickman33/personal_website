import CapitalVenture from '../../components/widgets/CapitalVenture/CapitalVenture';
import './PlaygroundPage.scss';

const PlaygroundPage = () => {
  return (
    <div className="page-name-page">
      <div className="container">
        <h1>Playground</h1>
        <CapitalVenture />
      </div>
    </div>
  );
};

export default PlaygroundPage;