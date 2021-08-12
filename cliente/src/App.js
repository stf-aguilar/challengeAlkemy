import './App.css';
import Nav from './components/Nav'
import Abm from './components/Abm'
//import Shop from './components/Shop'
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";

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

const Home = () => {
  return(
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default App;
