import axios from 'axios';

const baseURL = 'http://localhost:3001/productos';

export const getProductos = () => axios.get(baseURL);
export const createProducto = (data) => axios.post(baseURL, data);
export const updateProducto = (id, data) => axios.put(`${baseURL}/${id}`, data);
export const deleteProducto = (id) => axios.delete(`${baseURL}/${id}`);
