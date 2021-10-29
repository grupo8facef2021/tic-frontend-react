import React, { useContext, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Screen, Text } from '../../components';
import { Row, Col } from 'react-bootstrap';
import { Context } from '../../Context/authContext';
import { colors } from '../../utils/colors';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [state, setState] = useState({
    loadingState: false,
    modalState: { title: 'Erro', text: '', toggle: false, onHide: '' },
  });
  const { handleLogin } = useContext(Context);

  const handleChange = (id, value) => {
    setUser({ ...user, [id]: value });
  };

  const handleSubmit = async () => {
    setState({ ...state, loadingState: true });

    if (user.email === '') setEmailError(true);
    if (user.password === '') setPasswordError(true);

    if (!emailError || !passwordError) {
      const response = await handleLogin(user);

      if (response.ok) {
        window.location.href = '/';
      } else {
        console.log();
      }
      setState({ state });
    }

    setState({ ...state, loadingState: false });
  };

  const body = () => {
    return (
      <>
        <Row align="center">
          <Col>
            <Text large text={'Realize seu login para continuar!'} />
          </Col>
        </Row>
        <Row align="center">
          <Col md={12}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              margin="normal"
              error={emailError}
              value={user.email}
              placeholder={'E-mail'}
              onChange={(e) => {
                handleChange('email', e.target.value);
                setEmailError(false);
              }}
            />
          </Col>
          <Col md={12}>
            <TextField
              label="Senha"
              type="password"
              margin="normal"
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
        <Row align="center">
          <Col>
            <Button
              variant="contained"
              style={{ backgroundColor: colors.primary }}
              onClick={() => handleSubmit()}>
              login
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Screen login body={body} modalState={state.modalState} loadingState={state.loadingState} />
  );
};

export default Login;