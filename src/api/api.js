import axios from 'axios';

const BASE_API_URL = 'https://randomuser.me/api/';
// const API_KEY = 'cddb56e1c82f5dfd7b5c73aad7df5f84';
const instance = axios.create({
  baseURL: BASE_API_URL,
});

// instance.interceptors.request.use((config) => {
//   // eslint-disable-next-line no-param-reassign
//   config.params.appid = API_KEY;
//
//   return config;
// });
export default instance;
