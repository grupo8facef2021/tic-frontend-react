const { axiosDefault, handleErrors } = require('../utils/defaults');
const axios = axiosDefault();

const exampleService = {
  save: async (example) => {
    try {
      const { data } = await axios.post(`/api/example`, { example });

      return data;
    } catch (error) {
      return handleErrors(error);
    }
  },

  get: async (id, queryParams = {}) => {
    try {
      const { filter } = queryParams;
      const { data } = await axios.get(
        `/api/example/${id ? id : ''}${filter ? `?filter=${filter}` : ''} `,
      );

      return data;
    } catch (error) {
      return handleErrors(error);
    }
  },

  edit: async (example) => {
    try {
      const { data } = await axios.put(`/api/example/${example.id}`, { example });

      return data;
    } catch (error) {
      return handleErrors(error);
    }
  },

  remove: async (id) => {
    try {
      const { data } = await axios.delete(`/api/example/${id}`);

      return data;
    } catch (error) {
      return handleErrors(error);
    }
  },
};

export default exampleService;
