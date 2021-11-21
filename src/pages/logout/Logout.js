import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Logout = () => {
    const history = useHistory()

    useEffect(() => {
        localStorage.removeItem('TOKEN_KEY')
        history.push('/login')
    })

  return (
    <></>
  );
};

export default Logout;
