import React, { useState, useEffect, ReactElement } from "react";
import Routes from "./Routes";
import { getCurrentUser } from "../api";
import { AppState } from "../clientTypes";
import "./App.css";
import { WaitForLoaded } from "../components/UIElements";

const initialState: AppState = {
  status: "LOADING_USER"
};

function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getCurrentUser().then(data => {
      if (!data.loggedIn) {
        setState({
          status: "LOGGED_OUT"
        });
      } else {
        setState({
          status: "LOGGED_IN",
          user: data.user,
          paymentConfiguration: data.paymentConfiguration
        });
      }
    });
  }, []);

  let page: ReactElement;
  page = <Routes state={state} />;

  return (
    <div className="App">
      <WaitForLoaded item={state.status !== "LOADING_USER"}>
        {() => page}
      </WaitForLoaded>
    </div>
  );
}

export default App;
