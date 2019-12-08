import React from 'react';
import './LoginWidget.css';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

export default () => (
  <div className='login-widget'>
    <form className='signin-form'>
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
    Or <a href={apiUrl + '/auth/google'}>Log in with Google</a>
  </div>
);

