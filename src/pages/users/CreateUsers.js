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
import { levelConstant } from '../../utils/constants';
import { Text, Modal } from '../../components';
import { createUser, deleteUser, getUser, updateUser } from '../../services/users/usersService';

import { TextField, MenuItem, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

const Users = (props) => {
  const { setLoading } = useContext(Context);
  const alert = useAlert();
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    level: 1,
    password: '',
    confirmPassword: '',
  });

  useEffect(async () => {
    const { id } = props.match.params;

    setLoading(true);
    const response = await getUser(id);
    setLoading(false);

    if (response.success) {
      setUser({
        ...user,
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        level: response.data.level,
      });
    } else {
      history.push('/usuarios/novo');
    }
  }, []);

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const clearUser = () => {
    setUser({
      id: null,
      name: '',
      email: '',
      level: 1,
      password: '',
      confirmPassword: '',
    });
  };

  const handleBack = () => {
    history.push('/usuarios');
  };

  const handleSave = async () => {
    setLoading(true);

    const { id, name, email, level, password } = user;

    if (id) {
      const response = await updateUser(id, { name, level, password });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Usuário alterado com sucesso !');
      }
    } else {
      const response = await createUser({ name, email, level, password });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Usuário cadastrado com sucesso !');
        clearUser();
      }
    }

    setLoading(false);
  };

  const handleDelete = () => {
    setModal(true);
  };

  const remove = async () => {
    setLoading(true);

    const { id } = user;
    const response = await deleteUser(id);

    setLoading(false);

    if (!response.success) {
      alert.error(response.message);
    } else {
      setModal(false);
      alert.success('Usuário excluído com sucesso !');
      history.push('/usuarios');
    }
  };

  return (
    <Container fluid>
      <Modal
        title={'Tem certeza que deseja excluir este usuário?'}
        toggle={modal}
        onClickCancel={() => setModal(false)}
        onClickConfirm={() => remove()}
      />
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
                disabled={user.id}
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
                fullWidth
              >
                {levelConstant.map((option) => (
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
          <div>
            {user.id && (
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

Users.propTypes = {
  match: PropTypes.object,
};

export default Users;
