import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, ContentFooter, ContentFooterRigth } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Modal, Text } from '../../components';
import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import {
  createClient,
  getClient,
  deleteClient,
  updateClient,
} from '../../services/clients/clientsService';

import { getAddress } from '../../utils/addressApi';

const Clients = (props) => {
  const alert = useAlert();
  const history = useHistory();
  const [client, setClient] = useState({
    id: null,
    name: '',
    cpf: '',
    phone: '',
    email: '',
    cep: null,
    street: '',
    neighborhood: '',
    number: '',
  });
  const [modal, setModal] = useState(false);
  const { setLoading } = useContext(Context);

  useEffect(async () => {
    const { id } = props.match.params;

    const response = await getClient(id);

    if (response.success) {
      setClient({
        id: response.data.id,
        name: response.data.name,
        cpf: response.data.cpf,
        phone: response.data.phone,
        email: response.data.email,
        cep: response.data.cep,
        street: response.data.street,
        neighborhood: response.data.neighborhood,
        number: response.data.number,
      });
    } else {
      history.push('/clientes/novo');
    }
  }, []);

  const handleChange = (key, value) => {
    setClient({ ...client, [key]: value });
  };

  const clearEmployee = () => {
    setClient({
      id: null,
      name: '',
      cpf: '',
      phone: '',
      email: '',
      cep: '',
      street: '',
      neighborhood: '',
      number: '',
    });
  };

  const handleBack = () => {
    history.push('/clientes');
  };

  const handleSave = async () => {
    setLoading(true);

    if (client.id) {
      const { id, name, cpf, phone, email, cep, street, neighborhood, number } = client;
      const response = await updateClient({
        id,
        name,
        cpf,
        phone,
        email,
        cep,
        street,
        neighborhood,
        number,
      });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Cliente editado com sucesso!');
        clearEmployee();
      }
    } else {
      const { name, cpf, phone, email, cep, street, neighborhood, number } = client;
      const response = await createClient({
        name,
        cpf,
        phone,
        email,
        cep,
        street,
        neighborhood,
        number,
      });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Cliente cadastrado com sucesso!');
        clearEmployee();
      }
    }

    setLoading(false);
  };

  const handleDelete = () => {
    setModal(true);
  };

  const remove = async () => {
    const response = await deleteClient(client.id);

    if (!response.success) {
      alert.error(response.message);
    } else {
      setModal(false);
      alert.success('Cliente excluído com sucesso!');
    }
  };

  const searchAddress = async () => {
    const response = await getAddress(client.cep);

    if (!response.success) {
      alert.error(response.message);
    } else {
      alert.success('CEP inválido');
    }
  };

  return (
    <Container fluid>
      <Modal
        title={'Tem certeza que deseja excluir este cliente?'}
        toggle={modal}
        onClickCancel={() => setModal(false)}
        onClickConfirm={() => remove()}
      />
      <Content>
        <Header>
          <Text large text={client.id ? 'Editar Cliente' : 'Novo Cliente'} />
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                label="Nome"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={client.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="CPF"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={client.cpf}
                onChange={(e) => handleChange('cpf', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="Email"
                type="email"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={client.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Col>
          </Row>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                label="Telefone"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={client.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="CEP"
                size="small"
                variant="outlined"
                margin="normal"
                maxLength={8}
                fullWidth
                onBlur={() => searchAddress()}
                value={client.cep}
                onChange={(e) => handleChange('cep', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="Logradouro"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={client.street}
                onChange={(e) => handleChange('street', e.target.value)}
              />
            </Col>
          </Row>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                label="Bairro"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={client.neighborhood}
                onChange={(e) => handleChange('neighborhood', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="Número"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={client.number}
                onChange={(e) => handleChange('number', e.target.value)}
              />
            </Col>
            <Col md={4}></Col>
          </Row>
        </CardContent>
        <ContentFooter>
          <div>
            {client.id &&
              <Button
                size="large"
                style={{ background: colors.danger, color: colors.white }}
                variant="outlined"
                onClick={handleDelete}>
                Excluir
              </Button>
            }
          </div>

          <ContentFooterRigth>
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
          </ContentFooterRigth>
        </ContentFooter>
      </Content>
    </Container>
  );
};

export default Clients;

Clients.propTypes = {
  match: PropTypes.object,
};
