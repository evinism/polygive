import React, { useState, useEffect } from 'react';
import './App.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(apiUrl, { credentials: 'include' })
      .then(response => response.json())
      .then(data => setTitle(data.title));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {title}
        </p>
        <a href={apiUrl + "/auth/google"}>Sign In with Google</a>
      </header>
    </div>
  );
}

export default App;
