import axios from 'axios';

const baseURL = 'http://localhost:3001/usuarios';

export const getUsuarios = () => axios.get(baseURL);
export const createUsuario = (data) => axios.post(baseURL, data);
export const updateUsuario = (id, data) => axios.put(`${baseURL}/${id}`, data);
export const deleteUsuario = (id) => axios.delete(`${baseURL}/${id}`);