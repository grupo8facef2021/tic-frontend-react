import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
  ContainerLogin,
  BackgroundLogin,
} from './styles';
import { Loading } from '../index';

class Screen extends Component {
  render() {
    // props
    const { body, footer, loadingState } = this.props;

    //types
    const { login } = this.props;

    if (login) {
      return (
        <ContainerLogin>
          <Loading loadingState={loadingState} />
          <BackgroundLogin />
          <ContainerBody>
            <div className={'container'}>{body ? body() : ''}</div>
          </ContainerBody>
        </ContainerLogin>
      );
    }

    return (
      <Container>
        <ContainerHeader />
        <ContainerBody>
          <div className={'container'}>{body ? body() : ''}</div>
        </ContainerBody>
        {footer && (
          <ContainerFooter>
            <div className={'container'}>{footer ? footer() : ''}</div>
          </ContainerFooter>
        )}
      </Container>
    );
  }
}

Screen.propTypes = {
  // props
  body: PropTypes.func.isRequired,
  footer: PropTypes.func,
  modalState: PropTypes.object,
  loadingState: PropTypes.bool,

  // types
  login: PropTypes.bool,
};

export default Screen;
