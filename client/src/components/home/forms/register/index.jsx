import '../style.scss';

import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post(
      'http://localhost:8080/api/user/createUser',
      {
        username,
        password,
        played: 0,
        won: 0,
      },
    );

    if (result.status === 201) {
      // TODO: redirect
    } else {
      // TODO: error handling
      console.log(result);
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <div className="up">
        <h2>Register</h2>
        <div className="form-group">
          <label>Hello, my username will be:</label>
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
      </div>
      <div className="down">
        <div className="group">
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export { Register };
