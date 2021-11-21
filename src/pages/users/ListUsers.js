import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text, CardList } from '../../components';
import { getUsers } from '../../services/users/usersService';

import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

const Users = () => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();
  const history = useHistory();

  const [search, setSearch] = useState({
    name: '',
  });

  const [users, setUsers] = useState([]);

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  const handleSearch = async () => {
    setLoading(true);

    const response = await getUsers();
    if (!response.success) {
      alert.error(response.message);
    } else {
      setUsers(response.data);
    }

    setLoading(false);
  };

  const handleCardClick = (userId) => {
    history.push(`/usuarios/${userId}`);
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Usuários" />
          <HeaderAction>
            <Button
              size="large"
              style={{ color: 'white', background: colors.primary }}
              variant="outlined"
              onClick={() => history.push('/usuarios/novo')}>
              + Adicionar
            </Button>
          </HeaderAction>
        </Header>
        <CardContent>
          <Row>
            <Col>
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
          </Row>
          <Row align="right">
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
              dataList={users}
              templateCard={[
                {
                  key: 'Tipo',
                  accessor: 'email',
                },
                {
                  key: 'Email',
                  accessor: 'email',
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

export default Users;
