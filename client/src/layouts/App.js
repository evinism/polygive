import React, { useState, useEffect } from 'react';
import Home from './Home';
import LoggedOut from './LoggedOut';
import {getCurrentUser} from '../api.js';
import './App.css';


function App() {
  // Impossible states impossible mega-violation below:
  const [state, setState] = useState({
    loading: true,
    loggedIn: false,
    user: undefined,
  });

  useEffect(() => {
    getCurrentUser()
      .then(data => {
        setState({
          loading: false,
          loggedIn: data.loggedIn,
          user: data.loggedIn
            ? data
            : undefined,
        });
      });
  }, []);

  return (
    <div className="App">
      {!state.loading && 
        (state.loggedIn ? <Home state={state} /> : <LoggedOut />)}
    </div>
  );
}

export default App;
