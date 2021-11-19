import { axiosDefault } from '../../utils/clientApi';
import { handleErrors } from '../../utils/handleErrors';

const axios = axiosDefault();

export const login = async (payload) => {
  try {
    const { data } = await axios.post(`/auth`, payload);
    localStorage.setItem('TOKEN_KEY', data.token);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
};
