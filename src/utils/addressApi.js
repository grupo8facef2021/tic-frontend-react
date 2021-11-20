import { get } from '../services/commonService';

export const getAddress = async (cep) => {
  return await get(`https://viacep.com.br/ws/${cep}/json/`);
};
