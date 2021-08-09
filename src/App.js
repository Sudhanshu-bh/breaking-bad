import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Character from './Character';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>

          <Route path="/character/:id">
            <Character />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
