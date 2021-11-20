import React, { useContext, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Text } from '../../components';
import { Row, Col, Container } from 'react-bootstrap';
import { Context } from '../../context/authContext';
import { colors } from '../../utils/colors';
import { useAlert } from 'react-alert';
import { login } from '../../services/login/loginService';

import image from './images/mecanico 2.2.png';
import { BackgroundLogin, FormLogin } from './styles';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { setLoading } = useContext(Context);

  const alert = useAlert();

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = user;
    let isValid = true;

    if (email === '') {
      setEmailError(true);
      isValid = false;
    }

    if (password === '') {
      setPasswordError(true);
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);
    const response = await login(user);
    setLoading(false);

    if (!response.success) {
      alert.show(response.message);
      return;
    }

    window.location.href = '/users';
  };

  return (
    <Container fluid>
      <Row align="center">
        <BackgroundLogin>
          <img src={image} />
        </BackgroundLogin>

        <FormLogin align="center">
          <Row>
            <Col md={12}>
              <Text large text={'Login'} />
              <Text small text={'Realize seu login para entrar em nosso sistema'} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                type="email"
                margin="normal"
                fullWidth
                error={emailError}
                value={user.email}
                placeholder={'E-mail'}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                onChange={(e) => {
                  handleChange('email', e.target.value);
                  setEmailError(false);
                }}></TextField>
            </Col>
            <Col md={12}>
              <TextField
                label="Senha"
                type="password"
                margin="normal"
                fullWidth
                size="small"
                error={passwordError}
                value={user.password}
                placeholder={'******'}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                onChange={(e) => {
                  handleChange('password', e.target.value);
                  setPasswordError(false);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: colors.primary }}
                onClick={() => handleSubmit()}>
                login
              </Button>
            </Col>
          </Row>
        </FormLogin>
      </Row>
    </Container>
  );
};

export default Login;
