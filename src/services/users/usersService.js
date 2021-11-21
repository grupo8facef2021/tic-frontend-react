import { get, create, update, remove } from '../commonService';

export const getUser = async (id) => {
  return await get(`/users/${id}`);
};

export const getUsers = async () => {
  return await get('/users');
};

export const createUser = async (user) => {
  return await create('/users', user);
};

export const updateUser = async (id, user) => {
  return await update(`/users/${id}`, user);
};

export const deleteUser = async (id) => {
  return await remove(`/users/${id}`);
};
