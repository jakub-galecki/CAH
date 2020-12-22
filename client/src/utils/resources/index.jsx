import axios from 'axios';

export const login = ({ username, password }) =>
  axios.post('http://localhost:8080/api/user/login', {
    username,
    password,
  });

export const register = ({ username, password }) =>
  axios.post('http://localhost:8080/api/user/createUser', {
    username,
    password,
    played: 0,
    won: 0,
  });
