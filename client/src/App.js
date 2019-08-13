import React, { useState, useEffect } from 'react';
import './App.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setTitle(data.title));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {title}
        </p>
      </header>
    </div>
  );
}

export default App;
