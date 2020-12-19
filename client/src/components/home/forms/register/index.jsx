import '../style.scss';

import React from 'react';

const Register = () => {
  return (
    <form className="register">
      <div className="group">
        <label>Hello, my email is:</label>
        <input placeholder="epicEmail@email.com"></input>
        <label>my login will be:</label>
        <input placeholder="VeryNiceLogin"></input>
        <label>and my password</label>
        <input placeholder="password"></input>
      </div>
      <div className="group">
        <button>Confirm</button>
      </div>
    </form>
  );
};

export { Register };
