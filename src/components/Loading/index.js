import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomModal } from './styles';
import { Spinner } from 'react-bootstrap';
import { colors } from '../../utils/colors';

class LoadingComponent extends Component {
  render() {
    //props
    const { loadingState } = this.props;

    //types
    const {} = this.props;

    return (
      <CustomModal
        show={loadingState}
        onHide={() => {}}
        centered
        aria-labelledby="contained-modal-title-vcenter">
        <div>
          <Spinner
            animation={'border'}
            style={{
              border: `.35em solid ${colors.primary}`,
              borderRightColor: 'transparent',
              width: '3rem',
              height: '3rem',
              animationDuration: '1.5s',
            }}
          />
        </div>
      </CustomModal>
    );
  }
}

LoadingComponent.propTypes = {
  // props
  loadingState: PropTypes.bool,

  // types
};

export default LoadingComponent;
