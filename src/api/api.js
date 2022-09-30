import axios from 'axios';

const BASE_API_URL = 'https://randomuser.me/api/';
const instance = axios.create({
  baseURL: BASE_API_URL,
});

export default instance;
