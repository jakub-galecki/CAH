import '../style.scss';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../../contexts/auth';
import { login } from '../../../../utils/resources';
import { toastError, toastSuccess } from '../../../../utils/toastify/index';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ username, password });

      setAccessToken(result.data.token);
      toastSuccess('Logged in!');
      history.push('/roomList');
    } catch ({ response }) {
      if (response) toastError(response.data.message);
      else toastError('Error while connecting to Server');
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="up">
        <h2>Login</h2>
        <div className="form-group">
          <label>Hello, my username is</label>
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
          <button>Confirm</button>
        </div>
      </div>
    </form>
  );
};

export { Login };
