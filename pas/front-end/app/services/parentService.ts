import { Parent } from '../context/types';
import api from './api';

export const getParents = async (): Promise<Parent[]> => {
  const response = await api.get('/parents');
  return response.data;
};

export const getParent = async (id: string): Promise<Parent> => {
  const response = await api.get(`/parents/${id}`);
  return response.data;
};

export const createParent = async (parent: Omit<Parent, 'id'>): Promise<Parent> => {
  const response = await api.post('/parents', parent);
  return response.data;
};

export const updateParent = async (id: string, parent: Partial<Parent>): Promise<Parent> => {
  const response = await api.put(`/parents/${id}`, parent);
  return response.data;
};

export const deleteParent = async (id: string): Promise<void> => {
  await api.delete(`/parents/${id}`);
};