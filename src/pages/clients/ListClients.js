import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text, CardList } from '../../components';
import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import { getClients } from '../../services/clients/clientsService';

const Clients = () => {
  const alert = useAlert();
  const history = useHistory();

  const { setLoading } = useContext(Context);

  const [search, setSearch] = useState({
    name: '',
  });

  const [clients, setClients] = useState([]);

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  const handleSearch = async () => {
    setLoading(true);

    const response = await getClients();
    if (!response.success) {
      alert.error(response.message);
    } else {
      setClients(response.data);
    }

    setLoading(false);
  };

  const handleCardClick = (clientId) => {
    history.push(`/clientes/${clientId}`);
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Clientes" />
          <HeaderAction>
            <Button
              size="large"
              style={{ color: 'white', background: colors.primary }}
              variant="outlined"
              onClick={() => history.push('/clientes/novo')}>
              + Adicionar
            </Button>
          </HeaderAction>
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                label="Nome"
                size="small"
                margin="normal"
                variant="outlined"
                fullWidth
                value={search.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Col>
            <Col md={4}></Col>
            <Col md={4}></Col>
          </Row>
          <Row align="left">
            <Col>
              <Button
                size="large"
                style={{ color: 'white', background: colors.primary }}
                variant="outlined"
                onClick={handleSearch}>
                Pesquisar
              </Button>
            </Col>
          </Row>
          <Row>
            <CardList
              dataList={clients}
              templateCard={[
                {
                  key: 'Nome',
                  value: (value) => value.name,
                },
                {
                  key: 'Telefone',
                  value: (value) => value.phone,
                },
                {
                  key: 'Endereço',
                  value: (value) => value.street,
                },
                {
                  key: 'CPF',
                  value: (value) => value.cpf,
                },
              ]}
              onCardClick={handleCardClick}
            />
          </Row>
        </CardContent>
      </Content>
    </Container>
  );
};

export default Clients;
