import http from '@/helpers/http-helper';

class ProductService {
  get(productId) {
    return http.get(`/transactions/${productId}`);
  }

  create(data) {
    return http.post('/transactions', data);
  }

  update(data) {
    return http.put(`/transactions`, data);
  }

  delete(id) {
    return http.delete(`/transactions/${id}`);
  }
}

export default new ProductService();
