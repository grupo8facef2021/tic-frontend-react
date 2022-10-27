import React from 'react';
import { CardListContent } from './styles';
import PropTypes from 'prop-types';

export const CardList = ({ children }) => {
  return <CardListContent>{children}</CardListContent>;
};

CardList.propTypes = {
  children: PropTypes.any,
};
