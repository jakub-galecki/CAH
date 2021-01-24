import axios from 'axios';

//const url = 'http://localhost:8080/';
const url = 'https://cardz-against-humanity.herokuapp.com/';

export const login = ({ username, password }) =>
  axios.post(`${url}user/login`, {
    username,
    password,
  });

export const register = ({ username, password }) =>
  axios.post(`${url}user/createUser`, {
    username,
    password,
    played: 0,
    won: 0,
  });
