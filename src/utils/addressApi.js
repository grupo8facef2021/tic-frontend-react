import axios from 'axios';

export const getAddress = async (cep) => {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Não foi possível consultar seu CEP',
    };
  }
};
