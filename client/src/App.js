import React, { useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './views/Home';
import Login from './views/Login';
import Maps from './views/Maps';
import Sandbox from './views/sandbox';
import useStore from './zustand/store';
import ProtectedRoute from './protected-route/protected-route';

function App() {
  const { init, loading } = useStore(useCallback(state => ({ init: state.init, loading: state.loading }), []))

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="App">
      <Router>
        {loading ? <p>Loading...</p> : 
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home}/>
            <ProtectedRoute exact path="/maps" component={Maps}/>
            <ProtectedRoute exact path="/sandbox" component={Sandbox}/>
            <Route path="*" component={() => 'error 404'}/>
          </Switch>
        }
      </Router>
    </div>
  );
}

export default App;
