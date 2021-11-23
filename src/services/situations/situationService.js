import { get, create, update, remove } from '../commonService';

export const getSituations = async () => {
  return await get('/situations');
};

export const getSituation = async (id) => {
  return await get(`/situations/${id}`);
};

export const createSituation = async (situation) => {
  return await create('/situations', situation);
};

export const updateSituation = async (id, situation) => {
  return await update(`/situations/${id}`, situation);
};

export const deleteSituation = async (id) => {
  return await remove(`/situations/${id}`);
};
