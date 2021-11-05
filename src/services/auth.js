import { axiosDefault, handleErrors } from '../utils/defaults';
const axios = axiosDefault();

export const login = async (user) => {
  try {
    const { data } = await axios.post(`/auth`, user);

    return data;
  } catch (error) {
    return handleErrors(error);
  }
}
