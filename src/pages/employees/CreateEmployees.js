import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, ContentFooter } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text } from '../../components';
import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import {
  createEmployee,
  getEmployee,
  updateEmploye,
  deleteEmployee,
  updateEmployee,
} from '../../services/employees/emplyoyeesService';

const Employees = (props) => {
  const alert = useAlert();
  const history = useHistory();
  const [employee, setEmployee] = useState({
    id: null,
    name: '',
    role: '',
  });
  const { setLoading } = useContext(Context);

  useEffect(async () => {
    const { id } = props.match.params;

    const response = await getEmployee(id);

    if (response.success) {
      setEmployee({
        id: response.data.id,
        name: response.data.name,
        role: response.data.role,
      });
    } else {
      history.push('/funcionarios/novo');
    }
  }, []);

  const handleChange = (key, value) => {
    setEmployee({ ...employee, [key]: value });
  };

  const clearEmployee = () => {
    setEmployee({
      name: '',
      role: '',
    });
  };

  const handleBack = () => {
    history.push('/funcionarios');
  };

  const handleSave = async () => {
    setLoading(true);

    if (employee.id) {
      const { id, name, role } = employee;
      const response = await updateEmployee({ id, name, role });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Funcionário editado com sucesso !');
        clearEmployee();
      }
    } else {
      const { name, role } = employee;
      const response = await createEmployee({ name, role });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Funcionário cadastrado com sucesso !');
        clearEmployee();
      }
    }

    setLoading(false);
  };

  const handleDelete = () => {
    console.log('abre modal');
  };

  const remove = async () => {
    const response = await deleteEmployee(employee.id);

    if (!response.success) {
      alert.error(response.message);
    } else {
      alert.success('Funcionário excluído com sucesso!');
      clearEmployee();
    }
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text={employee.id ? 'Editar Funcionário' : 'Novo Funcionário'} />
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col>
              <TextField
                label="Nome"
                variant="outlined"
                margin="normal"
                fullWidth
                value={employee.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Col>
            <Col>
              <TextField
                label="Cargo"
                variant="outlined"
                margin="normal"
                fullWidth
                value={employee.role}
                onChange={(e) => handleChange('role', e.target.value)}
              />
            </Col>
          </Row>
        </CardContent>
        <ContentFooter>
          {employee.id ? (
            <Row xs={3}>
              <Col xs={4}>
                <Button
                  size="normal"
                  style={{
                    borderColor: colors.danger,
                    color: colors.danger,
                  }}
                  variant="outlined"
                  onClick={handleDelete}>
                  Excluir
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  size="normal"
                  style={{ color: colors.primary, borderColor: colors.primary }}
                  variant="outlined"
                  onClick={handleBack}>
                  Voltar
                </Button>
              </Col>
              <Col xs={4}>
                <Button
                  size="normal"
                  style={{ background: colors.primary, color: 'white' }}
                  variant="contained"
                  onClick={handleSave}>
                  Salvar
                </Button>
              </Col>
            </Row>
          ) : (
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
          )}
        </ContentFooter>
      </Content>
    </Container>
  );
};

export default Employees;

Employees.propTypes = {
  match: PropTypes.object,
};
