import http from '@/helpers/http-helper';

class ProductService {
  getAll() {
    return http.get('/products');
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post('/products', data);
  }

  update(data) {
    return http.put(`/products`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }
}

export default new ProductService();
