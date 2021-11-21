import React from 'react';
import { CardContent } from './styles';
import PropTypes from 'prop-types';

export const Card = ({ title, templateCard, data, onClick }) => {
  return (
    <CardContent onClick={() => onClick(data.id)}>
      <div>
        <label>{title}</label>
      </div>
      <div>
        {templateCard.map((t, i) => {
          return (
            <p key={i}>
              {t.key}: {data[t.accessor]}
            </p>
          );
        })}
      </div>
    </CardContent>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  templateCard: PropTypes.array,
  data: PropTypes.object,
  onClick: PropTypes.func,
};
