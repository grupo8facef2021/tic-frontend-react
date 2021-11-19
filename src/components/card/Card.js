import React from 'react';
import { CardContent } from './styles';
import PropTypes from 'prop-types';

export const Card = ({ title, templateCard, data }) => {
  return (
    <CardContent>
      <div>
        <h3>{title}</h3>
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
};
