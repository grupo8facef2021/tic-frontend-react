const axios = require('axios');

exports.defaultStates = () => {
  return {
    newRegister: true,
    loadingState: false,
  };
};

exports.Header = () => {
  let headers = new Headers();
  const token = localStorage.getItem('token');
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token ? `Bearer ${token}` : undefined);

  return headers;
};

exports.axiosDefault = () => {
  const token = localStorage.getItem('token');
  const configs = {
    baseURL: 'http://localhost:3333/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      withCredentials: true,
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true,
  };

  return axios.create(configs);
};

exports.handleErrors = (error) => {
  if (error.response && error.response.data && error.response.data.log) {
    console.log('Erro:', error.response.data.log);
  }

  if (error.response && error.response.data && error.response.data.logout) {
    window.location.href = '/logout';
  }

  return (error.response && error.response.data) || { ok: false, message: 'Erro inesperado' };
};
