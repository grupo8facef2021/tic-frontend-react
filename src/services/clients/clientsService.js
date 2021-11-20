import { get, create, update, remove } from '../commonService';

export const getClients = async () => {
  return await get('/clients');
};

export const getClient = async (id) => {
  return await get(`/clients/${id}`);
};

export const createClient = async (client) => {
  return await create('/clients', client);
};

export const updateClient = async (client) => {
  return await update('/clients', client);
};

export const deleteClient = async (id) => {
  return await remove(`/clients/${id}`);
};
