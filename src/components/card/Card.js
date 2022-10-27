import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from './styles';

export const Card = ({ title, color, templateCard, onClick }) => {
  return (
    <CardContent onClick={onClick} color={color}>
      <div>
        <label>{title}</label>
      </div>
      <div>
        {templateCard.map((t, i) => {
          return (
            <p key={i}>
              {t.key}: {t.value}
            </p>
          );
        })}
      </div>
    </CardContent>
  );
};

Card.propTypes = {
  title: PropTypes.func,
  color: PropTypes.func,
  templateCard: PropTypes.array,
  onClick: PropTypes.func,
};
