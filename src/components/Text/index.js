import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SmallText, MediumText, LargeText, ExtraLargeText } from './styles';

class Text extends Component {
  render() {
    //props
    const { text } = this.props;

    //types
    const { small, medium, large, extraLarge } = this.props;

    if (small) {
      return <SmallText>{text}</SmallText>;
    }

    if (medium) {
      return <MediumText>{text}</MediumText>;
    }

    if (large) {
      return <LargeText>{text}</LargeText>;
    }

    if (extraLarge) {
      return <ExtraLargeText>{text}</ExtraLargeText>;
    }
  }
}

Text.propTypes = {
  //props
  text: PropTypes.string,

  //types
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

export default Text;
