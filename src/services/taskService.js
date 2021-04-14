import http from '@/helpers/http-helper';

class TaskService {
  getAll() {
    return http.get('/tasks');
  }

  get(id) {
    return http.get(`/tasks/${id}`);
  }

  create(data) {
    return http.post('/tasks', data);
  }

  update(data) {
    return http.put(`/tasks`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }
}

export default new TaskService();
