import React, { useState, useEffect } from 'react';
import Home from './Home';
import LoggedOut from './LoggedOut';
import './App.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  // Impossible states impossible mega-violation below:
  const [state, setState] = useState({
    loading: true,
    loggedIn: false,
    user: undefined,
  });

  useEffect(() => {
    fetch(apiUrl + '/user/current', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setState({
          loading: false,
          loggedIn: data.loggedIn,
          user: data.loggedIn
            ? { name: data.name }
            : undefined,
        });
      });
  }, []);

  return (
    <div className="App">
      {!state.loading && 
        (state.loggedIn ? <Home user={state.user}/> : <LoggedOut />)}
    </div>
  );
}

export default App;
