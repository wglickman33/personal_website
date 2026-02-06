import './PlaygroundPage.scss';
import { Outlet } from 'react-router-dom';
import { PlaygroundWalletProvider } from '../../context/PlaygroundWalletProvider';

const PlaygroundPage = () => {
  return (
    <div className="playground-page">
      <div className="container">
        <PlaygroundWalletProvider>
          <Outlet />
        </PlaygroundWalletProvider>
      </div>
    </div>
  );
};

export default PlaygroundPage;