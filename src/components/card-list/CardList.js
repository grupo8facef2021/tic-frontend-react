import React from 'react';
import { CardListContainer } from './styles';
import PropTypes from 'prop-types';
import { Card } from '../card/Card';

export const CardList = ({ dataList, templateCard, onClick }) => {
  return (
    <CardListContainer>
      {dataList.map((data, i) => {
        return (
          <Card
            onClick={onClick}
            key={i}
            data={data}
            title={data.name}
            templateCard={templateCard}></Card>
        );
      })}
    </CardListContainer>
  );
};

CardList.propTypes = {
  dataList: PropTypes.array,
  templateCard: PropTypes.array,
  onClick: PropTypes.func,
};
