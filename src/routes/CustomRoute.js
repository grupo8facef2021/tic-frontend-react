import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Context } from '../context/authContext';
import { Loading, Navbar } from '../components';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../services/auth/authService';
import { useHistory } from 'react-router';

const CustomRoute = ({ isPrivate, exact, path, component }) => {
  const { loading } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (isPrivate) {
      const isAuth = isAuthenticated();
      if (!isAuth) {
        history.push('/login');
      }
    }
  }, []);

  return (
    <>
      {isPrivate && <Navbar />}
      {loading && <Loading loadingState={loading} />}
      <Route exact={exact} path={path} component={component} />
    </>
  );
};

CustomRoute.propTypes = {
  isPrivate: PropTypes.bool,
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.any,
  history: PropTypes.func,
};

export default CustomRoute;
