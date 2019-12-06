import React, { useState, useEffect, ReactElement } from 'react';
import Routes from './Routes';
import {getCurrentUser} from '../api';
import {AppState} from '../clientTypes';
import './App.css';

const initialState: AppState = {
  status: 'LOADING_USER',
}

function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getCurrentUser()
      .then(data => {
        if (!data.loggedIn) {
          setState({
            status: 'LOGGED_OUT',
          })
        } else {
          setState({
            status: 'LOGGED_IN',
            user: data.user,
          });
        }
      });
  }, []);

  let page : ReactElement;
  page = <Routes state={state} />;

  return (
    <div className="App">
      {page}
    </div>
  );
}

export default App;
