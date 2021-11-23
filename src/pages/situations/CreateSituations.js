import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import {
  Header,
  Content,
  CardContent,
  ContentFooter,
  ContentFooterRight,
} from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { colorConstant } from '../../utils/constants';
import { Modal, Text } from '../../components';
import { TextField, Button, MenuItem } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import {
  createSituation,
  getSituation,
  updateSituation,
  deleteSituation,
} from '../../services/situations/situationService';

const Situations = (props) => {
  const alert = useAlert();
  const history = useHistory();
  const [situation, setSituation] = useState({
    id: null,
    description: '',
    color: 1,
  });

  const [modal, setModal] = useState(false);
  const { setLoading } = useContext(Context);

  useEffect(async () => {
    const { id } = props.match.params;

    setLoading(true)
    const response = await getSituation(id);
    setLoading(false)


    if (response.success) {
      setSituation({
        id: response.data.id,
        description: response.data.description,
        color: response.data.color,
      });
    } else {
      history.push('/situacoes/novo');
    }
  }, []);

  const handleChange = (key, value) => {
    setSituation({ ...situation, [key]: value });
  };

  const clearSituation = () => {
    setSituation({
      description: '',
      color: '',
    });
  };

  const handleBack = () => {
    history.push('/situacoes');
  };

  const handleSave = async () => {
    setLoading(true);

    console.log('teste')

    const { id, description, color } = situation;

    if (id) {
      const response = await updateSituation(id, { description, color });


      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Situação atualizada com sucesso!');
      }
    } else {
      const response = await createSituation({ description, color });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Situação cadastrado com sucesso !');
        clearSituation();
      }
    }
    setLoading(false);
  };

  const handleDelete = () => {
    setModal(true);
  };

  const remove = async () => {

    setLoading(true);

    const { id } = situation;
    const response = await deleteSituation(id);

    setLoading(false);

    if (!response.success) {
      alert.error(response.message);
    } else {
      setModal(false);
      alert.success('Situação excluída com sucesso! ');
      history.push('/situacoes')
    }
  };

  return (
    <Container fluid>
      <Modal
        title={'Tem certeza que deseja excluir essa situação?'}
        toggle={modal}
        onClickCancel={() => setModal(false)}
        onClickConfirm={() => remove()}
      />
      <Content>
        <Header>
          <Text large text={situation.id ? 'Editar Situação' : 'Nova Situação'} />
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col>
              <TextField
                label="Descrição"
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                value={situation.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </Col>
            <Col>
              <TextField
                select
                margin="normal"
                label="Cor Situação"
                size="small"
                value={situation.value}
                variant="outlined"
                onChange={(e) => handleChange('color', e.target.value)}
                fullWidth>
                {colorConstant.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
          </Row>
        </CardContent>
        <ContentFooter>
          <div>
            {situation.id && (
              <Button
                size="large"
                style={{ color: colors.danger, borderColor: colors.danger }}
                variant="outlined"
                onClick={handleDelete}>
                Excluir
              </Button>
            )}
          </div>

          <ContentFooterRight>
            <div>
              <Button
                size="large"
                style={{ color: colors.primary, borderColor: colors.primary }}
                variant="outlined"
                onClick={handleBack}>
                Voltar
              </Button>
            </div>
            <div>
              <Button
                size="large"
                style={{ background: colors.primary, color: 'white' }}
                variant="contained"
                onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </ContentFooterRight>
        </ContentFooter>
      </Content>
    </Container>
  );
};

export default Situations;

Situations.propTypes = {
  match: PropTypes.object,
};
