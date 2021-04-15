import http from '@/helpers/http-helper';

class RewardService {
  get(userId) {
    return http.get(`/rewards/${userId}`);
  }

  create(data) {
    return http.post('/rewards', data);
  }

  update(data) {
    return http.put(`/rewards`, data);
  }

  delete(id) {
    return http.delete(`/rewards/${id}`);
  }
}

export default new RewardService();
