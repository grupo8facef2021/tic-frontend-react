import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SmallText,
  SmallTextWhite,
  MediumText,
  MediumTextWhite,
  LargeText,
  LargeTextWhite,
} from './styles';

export class Text extends Component {
  render() {
    //props
    const { text } = this.props;

    //types
    const { small, smallWhite, medium, mediumWhite, large, largeWhite } = this.props;

    if (small) {
      return <SmallText>{text}</SmallText>;
    }

    if (smallWhite) {
      return <SmallTextWhite>{text}</SmallTextWhite>;
    }

    if (medium) {
      return <MediumText>{text}</MediumText>;
    }

    if (mediumWhite) {
      return <MediumTextWhite>{text}</MediumTextWhite>;
    }

    if (large) {
      return <LargeText>{text}</LargeText>;
    }

    if (largeWhite) {
      return <LargeTextWhite>{text}</LargeTextWhite>;
    }
  }
}

Text.propTypes = {
  //props
  text: PropTypes.string,

  //types
  small: PropTypes.bool,
  smallWhite: PropTypes.bool,
  medium: PropTypes.bool,
  mediumWhite: PropTypes.bool,
  large: PropTypes.bool,
  largeWhite: PropTypes.bool,
};
