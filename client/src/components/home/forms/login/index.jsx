import '../style.scss';

import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post('http://localhost:8080/api/user/login', {
      username,
      password,
    });

    if (result.status === 202) {
      // TODO: redirect
    } else {
      // TODO: error handling
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="group">
        <label>Hello, my login is</label>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>and my password</label>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="group">
        <button>Confirm</button>
      </div>
    </form>
  );
};

export { Login };
