import '../style.scss';

import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../contexts/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await axios.post('http://localhost:8080/api/user/login', {
      username,
      password,
    });

    if (result.status === 202) {
      setAccessToken(result.data.token);
      history.push('/roomList');
    } else {
      // TODO: error handling
      console.log(result);
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
