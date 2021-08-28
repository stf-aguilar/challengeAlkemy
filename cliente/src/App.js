import './App.css';
import Nav from './components/Nav'
import Abm from './components/Abm'
import Home from './components/Home'
//import Shop from './components/Shop'
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/abm' component={Abm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
