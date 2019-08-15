import React, { useState, useEffect } from 'react';
import './App.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  // Impossible states impossible mega-violation below:
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(apiUrl + '/user/current', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setLoggedIn(data.loggedIn);
        if (data.loggedIn) {
          setName(data.name);
        }
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        { !loading && (
          <>
            <p>
              {loggedIn ?  'Welcome, ' + name : 'PolyGive.'}
            </p>
            {!loggedIn && <a href={apiUrl + "/auth/google"}>Sign In with Google</a>}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
