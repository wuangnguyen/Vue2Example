import http from '@/helpers/http-helper';

class PaymentHistoryService {
  getAll() {
    return http.get('/paymentHistories');
  }

  create(data) {
    return http.post('/paymentHistories', data);
  }

  update(data) {
    return http.put('/paymentHistories', data);
  }

  delete(id) {
    return http.delete(`/paymentHistories/${id}`);
  }
}

export default new PaymentHistoryService();
