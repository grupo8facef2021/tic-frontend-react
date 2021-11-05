import React, { useContext, useEffect } from 'react';
import { Screen } from '../../components';
import { Context } from '../../context/authContext';

const Logout = () => {
  const { handleLogout } = useContext(Context);

  useEffect(() => {
    handleLogout();
  });

  const body = () => {
    return <></>;
  };
  return <Screen body={body} />;
};

export default Logout;
