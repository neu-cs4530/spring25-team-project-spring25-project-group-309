/* eslint-disable import/no-extraneous-dependencies */
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import FakeStackOverflow from './components/fakestackoverflow';
import { FakeSOSocket } from './types/types';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';

const container = document.getElementById('root');

const App = () => {
  const [socket, setSocket] = useState<FakeSOSocket | null>(null);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  if (serverURL === undefined) {
    throw new Error("Environment variable 'REACT_APP_SERVER_URL' must be defined");
  }

  useEffect(() => {
    if (!socket) {
      setSocket(io(serverURL));
    }

    return () => {
      if (socket !== null) {
        socket.disconnect();
      }
    };
  }, [socket, serverURL]);

  return (
    <Router>
      <Provider store={store}>
        <FakeStackOverflow socket={socket} />
      </Provider>
    </Router>
  );
};

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}
