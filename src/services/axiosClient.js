import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

export default axiosClient;
