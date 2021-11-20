import React from 'react';
import { CardListContainer } from './styles';
import PropTypes from 'prop-types';
import { Card } from '../card/Card';

export const CardList = ({ dataList, templateCard }) => {
  return (
    <CardListContainer>
      {dataList.map((data, i) => {
        return <Card key={i} data={data} title={data.name} templateCard={templateCard}></Card>;
      })}
    </CardListContainer>
  );
};

CardList.propTypes = {
  dataList: PropTypes.array,
  templateCard: PropTypes.array,
};
