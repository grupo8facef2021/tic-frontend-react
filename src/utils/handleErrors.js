import { statusEnum } from './enum';

export const handleErrors = (error) => {
  let response = {
    success: false,
    message: 'Sistema indisponível no momento. Tente novamente mais tarde.',
  };

  if (error?.response?.status === statusEnum.UNAUTHORIZED) {
    localStorage.removeItem('TOKEN_KEY');
    window.location.href = '/login';
    return;
  }

  if (error?.response?.data?.message) {
    response.message = error.response.data.message;
  }

  return response;
};
