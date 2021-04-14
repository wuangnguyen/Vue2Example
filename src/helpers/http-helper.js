import axios from 'axios';
import { EventBus } from '@/plugins/event-bus.js';

const http = axios.create({
  baseURL: '/api/v2',
  headers: {
    'Content-type': 'application/json'
  }
});
http.interceptors.request.use(
  async function(config) {
    if (config.method != 'get') {
      EventBus.$emit('showLoading');
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function(response) {
    EventBus.$emit('hideLoading');
    return response;
  },

  function(error) {
    var status = error.response.status;
    let errorResponse = error.response.data.httpCode !== undefined ? error.response.data : [];
    switch (status) {
      case 401:
        return;
      case 400:
        break;
      case 500:
        break;
      default:
        break;
    }
    EventBus.$emit('hideLoading');

    return Promise.reject(errorResponse);
  }
);
export default http;
