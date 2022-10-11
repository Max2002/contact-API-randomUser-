import axios from 'axios';

const apiUser = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

export default apiUser;
