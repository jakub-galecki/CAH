import axios from 'axios';

import { getServerHttpUrl } from '../serverURL';

export const login = ({ username, password }) =>
  axios.post(`${getServerHttpUrl()}user/login`, {
    username,
    password,
  });

export const register = ({ username, password }) =>
  axios.post(`${getServerHttpUrl()}user/createUser`, {
    username,
    password,
    played: 0,
    won: 0,
  });
