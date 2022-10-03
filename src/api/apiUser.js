import axios from 'axios';

const BASE_API_URL = 'https://randomuser.me/api/';
const apiUser = axios.create({
  baseURL: BASE_API_URL,
});

export default apiUser;
