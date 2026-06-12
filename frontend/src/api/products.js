import client from './client'

const BASE = '/products'

export const productsApi = {
  list: (params = {}) => client.get(BASE, { params }).then((r) => r.data),
  // params: { page, page_size, search, sort_by, sort_order }

  get: (id) => client.get(`${BASE}/${id}`).then((r) => r.data),

  create: (data) => client.post(BASE, data).then((r) => r.data),
  // data: { name, sku, price, quantity }

  update: (id, data) => client.put(`${BASE}/${id}`, data).then((r) => r.data),

  delete: (id) => client.delete(`${BASE}/${id}`),
}
