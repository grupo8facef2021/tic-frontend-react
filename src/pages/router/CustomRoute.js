import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { Context } from '../../context/authContext';
import PropTypes from 'prop-types';
import { Loading } from '../../components';

const CustomRoute = ({ isPrivate, ...rest }) => {
  const { auth, loading, checkLogin } = useContext(Context);

  if (isPrivate) checkLogin();
  if (isPrivate && !auth) return (window.location.href = '/login');

  return (
    <>
      {loading && <Loading loadingState={loading} />}
      <Route exact={rest.exact} path={rest.path} component={rest.component} />
    </>
  )
};

CustomRoute.propTypes = { isPrivate: PropTypes.bool };

export default CustomRoute;
