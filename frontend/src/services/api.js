import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicio para Materiales
export const materialesService = {
  getAll: () => api.get('/materiales'),
  getById: (id) => api.get(`/materiales/${id}`),
  create: (data) => api.post('/materiales', data),
  update: (id, data) => api.put(`/materiales/${id}`, data),
  delete: (id) => api.delete(`/materiales/${id}`),
};

// Servicio para Movimientos
export const movimientosService = {
  getAll: () => api.get('/movimientos'),
  getMaterialesActivos: () => api.get('/movimientos/materiales/activos'),
  create: (data) => api.post('/movimientos', data),
  update: (id, data) => api.put(`/movimientos/${id}`, data),
  delete: (id) => api.delete(`/movimientos/${id}`),
};

// Servicio para Reportes
export const reportesService = {
  getStockBajo: () => api.get('/reportes/stock-bajo'),
  getMovimientosFiltrados: (params) => api.get('/reportes/movimientos', { params }),
  getFiltros: () => api.get('/reportes/filtros'),
};

export default api;