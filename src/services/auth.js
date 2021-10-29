import { axiosDefault, handleErrors } from '../utils/defaults';
const axios = axiosDefault();

const authService = {
  login: async (user) => {
    try {
      const { data } = await axios.post(`/api/auth/login`, { user });

      return data;
    } catch (error) {
      return handleErrors(error);
    }
  },

  logout: async () => {
    try {
      const { data } = await axios.post(`/api/auth/logout`);

      return data;
    } catch (error) {
      return handleErrors(error);
    }
  },
};

export default authService;
