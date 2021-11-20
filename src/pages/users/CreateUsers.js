import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, ContentFooter } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text } from '../../components';
import { createUser } from '../../services/users/usersService';

import { TextField, MenuItem, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';

const Users = () => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();

  const [user, setUser] = useState({
    name: '',
    email: '',
    level: 1,
    password: '',
    confirmPassword: '',
  });

  const values = [
    {
      value: 1,
      label: 'Administrador',
    },
    {
      value: 2,
      label: 'Comum',
    },
  ];

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const clearUser = () => {
    setUser({
      name: '',
      email: '',
      level: 1,
      password: '',
      confirmPassword: '',
    });
  };

  const handleBack = () => {
    alert('back');
  };

  const handleSave = async () => {
    setLoading(true);

    const { name, email, level, password } = user;
    const response = await createUser({ name, email, level, password });

    if (!response.success) {
      alert.error(response.message);
    } else {
      alert.success('Usuário cadastrado com sucesso !');
      clearUser();
    }

    setLoading(false);
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Novo Usuário" />
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col>
              <TextField
                label="Nome"
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                value={user.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Col>
            <Col>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                value={user.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Col>
            <Col>
              <TextField
                select
                margin="normal"
                label="Nível"
                size="small"
                value={user.level}
                variant="outlined"
                onChange={(e) => handleChange('level', e.target.value)}
                fullWidth>
                {values.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
            <Col>
              <TextField
                type="password"
                label="Senha"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                value={user.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </Col>
            <Col>
              <TextField
                type="password"
                label="Confirmar senha"
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                value={user.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />
            </Col>
          </Row>
        </CardContent>
        <ContentFooter>
          <Row xs={2}>
            <Col xs={6}>
              <Button
                size="normal"
                style={{ color: colors.primary, borderColor: colors.primary }}
                variant="outlined"
                onClick={handleBack}>
                Voltar
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                size="normal"
                style={{ background: colors.primary, color: 'white' }}
                variant="contained"
                onClick={handleSave}>
                Salvar
              </Button>
            </Col>
          </Row>
        </ContentFooter>
      </Content>
    </Container>
  );
};

export default Users;
