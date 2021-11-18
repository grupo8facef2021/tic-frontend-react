import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Context } from '../context/authContext';
import { Loading, Navbar } from '../components';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../services/auth/authService';

const CustomRoute = ({ isPrivate, exact, path, component }) => {
  const { loading } = useContext(Context);

  useEffect(() => {
    if(isPrivate){
      const isAuth = isAuthenticated()
      if(!isAuth){
        window.location.href = '/login'
      }
    }
  }, [])

  return (
    <>
      {isPrivate && <Navbar />}
      {loading && <Loading loadingState={loading} />}
      <Route exact={exact} path={path} component={component} />
    </>
  )
};

CustomRoute.propTypes = { 
  isPrivate: PropTypes.bool,
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.any
};

export default CustomRoute;
