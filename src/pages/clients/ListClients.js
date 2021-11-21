import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent } from '../../components/layout/Layout';
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
    history.push(`/clientes/${clientId}`)
  }

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Clientes" />
        </Header>
        <CardContent>
          <Row lg={2} sm={1} xs={1}>
            <Col md={7}>
              <TextField
                label="Nome"
                size="small"
                variant="outlined"
                fullWidth
                value={search.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Col>
            <Col md={2}>
              <Button
                size="large"
                style={{ color: 'white', background: colors.primary }}
                variant="outlined"
                onClick={handleSearch}>
                Pesquisar
              </Button>
            </Col>
            <Col md={3}>
              <Button
                size="large"
                style={{ color: 'white', background: colors.primary }}
                variant="outlined"
                onClick={() => history.push('/clientes/novo')}>
                Novo Cliente
              </Button>
            </Col>
          </Row>
          <Row lg={1} sm={1} xs={1}>
            <CardList
              dataList={clients}
              templateCard={[
                {
                  key: 'Nome',
                  accessor: 'name',
                },
                {
                  key: 'Telefone',
                  accessor: 'phone',
                },
                {
                  key: 'Endereço',
                  accessor: 'street',
                },
                {
                  key: 'CPF',
                  accessor: 'cpf',
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
