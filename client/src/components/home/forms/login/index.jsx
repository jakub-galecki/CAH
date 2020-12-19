import '../style.scss';

import React from 'react';

const Login = () => {
  return (
    <form className="login">
      <div className="group">
        <label>Hello, my login is</label>
        <input placeholder="My-login"></input>
        <label>and my password</label>
        <input type="password" placeholder="My-password"></input>
      </div>
      <div className="group">
        <button>Confirm</button>
      </div>
    </form>
  );
};

export { Login };
