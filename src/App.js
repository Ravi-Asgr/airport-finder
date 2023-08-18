import './App.css';
import { PageRoutes } from './routes/index';
import { makeServer } from './mirage/server';

makeServer();

function App() {
  return (
    <PageRoutes />
  );
}

export default App;
