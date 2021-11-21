import React from 'react';
import { CardListContent, CardListContainer } from './styles';
import PropTypes from 'prop-types';
import { Card } from '../card/Card';

export const CardList = ({ dataList, templateCard, onCardClick }) => {
  return (
    <CardListContent>
      {dataList.map((data, i) => {
        return (
          <Card
            onClick={onCardClick}
            key={i}
            data={data}
            title={data.name}
            templateCard={templateCard}></Card>
        );
      })}
    </CardListContent>
  );
};

CardList.propTypes = {
  dataList: PropTypes.array,
  templateCard: PropTypes.array,
  onCardClick: PropTypes.func,
};
