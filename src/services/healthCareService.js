import http from '@/helpers/http-helper';

class HealthCareService {
  getAll() {
    return http.get('/healthCare');
  }

  create(data) {
    return http.post('/healthCare', data);
  }

  update(data) {
    return http.put('/healthCare', data);
  }

  delete(id) {
    return http.delete(`/healthCare/${id}`);
  }
}

export default new HealthCareService();
