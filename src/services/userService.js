import http from '@/helpers/http-helper';

class UserService {
  getAll() {
    return http.get('/users');
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post('/users', data);
  }

  update(data) {
    return http.put(`/users`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new UserService();
