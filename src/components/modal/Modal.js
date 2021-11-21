import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { CustomModalHeader, CustomModalBody, CustomModalFooter } from './styles';
import { Text } from '../index';
import { colors } from '../../utils/colors';

export const CustomModal = ({ toggle, title, onClickConfirm, onClickCancel }) => {
  return (
    <Modal centered show={toggle} onHide={onClickCancel}>
      <CustomModalHeader closeButton />
      <CustomModalBody className={'text-center'}>
        <Text medium text={title} />
      </CustomModalBody>
      <CustomModalFooter className={'d-flex justify-content-center'}>
        <Row xs={2}>
          <Col xs={6}>
            <Button
              size="normal"
              style={{
                background: colors.white,
                color: colors.primary
              }}
              onClick={onClickCancel}>
              Cancelar
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              size="normal"
              style={{
                background: colors.danger,
                color: colors.white,
              }}
              onClick={onClickConfirm}>
              Excluir
            </Button>
          </Col>
        </Row>
      </CustomModalFooter>
    </Modal>
  );
};

CustomModal.propTypes = {
  title: PropTypes.string,
  onClickConfirm: PropTypes.func,
  onClickCancel: PropTypes.func,
  toggle: PropTypes.bool,
};
