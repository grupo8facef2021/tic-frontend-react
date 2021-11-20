import { get, create, update, remove } from '../commonService';

export const getEmployees = async () => {
  return await get('/employees');
};

export const getEmployee = async (id) => {
  return await get(`/employees/${id}`);
};

export const createEmployee = async (employee) => {
  return await create('/employees', employee);
};

export const updateEmployee = async (employee) => {
  return await update('/employees', employee);
};

export const deleteEmployee = async (id) => {
  return await remove(`/employees/${id}`);
};
