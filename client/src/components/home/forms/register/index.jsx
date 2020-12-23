import '../style.scss';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { register } from '../../../../utils/resources';
import { toastError, toastSuccess } from '../../../../utils/toastify/index';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: elaborate on instant login & redirect (backend interference)
    try {
      await register({ username, password });

      toastSuccess('Signed up!');
      history.push('/');
    } catch ({ response }) {
      if (response) toastError(response.data.message);
      else toastError('Error while connecting to Server');
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
