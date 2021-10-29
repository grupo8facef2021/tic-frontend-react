import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { Context } from '../../Context/authContext';
import PropTypes from 'prop-types';
import { CustomModal } from '../../components/Loading/styles';

const CustomRoute = ({ isPrivate, ...rest }) => {
  const { auth, loading, checkLogin } = useContext(Context);

  if (loading) return <CustomModal />;
  if (isPrivate) checkLogin();
  if (isPrivate && !auth) return (window.location.href = '/login');

  return <Route exact={rest.exact} path={rest.path} component={rest.component} />;
};

CustomRoute.propTypes = { isPrivate: PropTypes.bool };

export default CustomRoute;
