import React, { useState, useEffect } from 'react';
import Home from './layouts/Home';
import LoggedOut from './layouts/LoggedOut';
import {getCurrentUser} from './api';
import {AppState, LoggedInAppState} from './clientTypes';

const initialState: AppState = {
  loading: true,
  user: undefined,
}

function App() {
  // Impossible states impossible mega-violation below:
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getCurrentUser()
      .then(data => {
        setState({
          loading: false,
          user: data,
        });
      });
  }, []);

  return (
    <div className="App">
      {!state.loading && 
        (state.user ? <Home state={state as LoggedInAppState} /> : <LoggedOut />)}
    </div>
  );
}

export default App;
