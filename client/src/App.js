import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './views/Home';
import Sandbox from './views/sandbox';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/sandbox" component={Sandbox}/>
          <Route path="*" component={() => 'error 404'}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
