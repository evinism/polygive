import React, { useState, useEffect, ReactElement } from 'react';
import Home from './layouts/Home';
import LoggedOut from './layouts/LoggedOut';
import {getCurrentUser} from './api';
import {AppState} from './clientTypes';

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
  switch(state.status) {
    case 'LOADING_USER':
      page = <div>Loading...</div>;
      break;
    case 'LOGGED_OUT':
      page = <LoggedOut />;
      break;
    case 'LOGGED_IN':
      page = <Home state={state} />;
      break;
    default: 
      page = <div>wat</div>;
      break;
  }

  return (
    <div className="App">
      {page}
    </div>
  );
}

export default App;
