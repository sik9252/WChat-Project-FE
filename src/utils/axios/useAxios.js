import axios from 'axios';

export const useAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_IP,
  headers: {},
});
