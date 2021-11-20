import { get } from '../services/commonService';

export const getAddress = async (cep) => {
  const response = { success: true };
  if (cep.length === 8) {
    return await get(`https://viacep.com.br/ws/${cep}/json/`);
  } else {
    return (response.success = false);
  }
};
