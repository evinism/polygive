import React from "react";
import "./LoginWidget.css";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export default () => (
  <div className="login-widget">
    <h3>Sign In</h3>
    <form className="signin-form" action={apiUrl + "/login"} method="POST">
      <label>
        Email:
        <input type="text" name="email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <input type="submit" value="Sign In" />
    </form>
    Or <a href={apiUrl + "/auth/google"}>Log in with Google</a>
    <h3>Sign Up</h3>
    <form className="signup-form" action={apiUrl + "/signup"} method="POST">
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Email:
        <input type="text" name="email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <label>
        Retype Password:
        <input type="password" name="passwordVerify" />
      </label>
      <input type="submit" value="Sign In" />
    </form>
    Or <a href={apiUrl + "/auth/google"}>Sign Up in with Google</a>
  </div>
);
