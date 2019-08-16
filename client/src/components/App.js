import React, { useState, useEffect } from 'react';
import Home from './Home';
import LoggedOut from './LoggedOut';
import './App.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  // Impossible states impossible mega-violation below:
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(apiUrl + '/user/current', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.loggedIn) {
          setUser({
            name: data.name,
          });
        }
        setLoggedIn(data.loggedIn);
      });
  }, []);

  return (
    <div className="App">
      {!loading && 
        (loggedIn ? <Home user={user}/> : <LoggedOut />)}
    </div>
  );
}

export default App;
