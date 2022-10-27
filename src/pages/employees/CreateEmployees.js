import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import {
  Header,
  Content,
  CardContent,
  ContentFooter,
  ContentFooterRight,
} from '../../components/Layout/Layout';
import { colors } from '../../utils/colors';
import { Modal, Text } from '../../components';
import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import {
  createEmployee,
  getEmployee,
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
  const [modal, setModal] = useState(false);
  const { setLoading } = useContext(Context);

  useEffect(async () => {
    const { id } = props.match.params;

    setLoading(true);
    const response = await getEmployee(id);
    setLoading(false);

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

    const { id, name, role } = employee;

    if (id) {
      const response = await updateEmployee(id, { name, role });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Funcionário editado com sucesso !');
      }
    } else {
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
    setModal(true);
  };

  const remove = async () => {
    setLoading(true);

    const { id } = employee;
    const response = await deleteEmployee(id);

    setLoading(false);

    if (!response.success) {
      alert.error(response.message);
    } else {
      setModal(false);
      alert.success('Funcionário excluído com sucesso!');
      history.push('/funcionarios');
    }
  };

  return (
    <Container fluid>
      <Modal
        title={'Tem certeza que deseja excluir este funcionário?'}
        toggle={modal}
        onClickCancel={() => setModal(false)}
        onClickConfirm={() => remove()}
      />
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
                size="small"
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
                size="small"
                fullWidth
                value={employee.role}
                onChange={(e) => handleChange('role', e.target.value)}
              />
            </Col>
          </Row>
        </CardContent>
        <ContentFooter>
          <div>
            {employee.id && (
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

export default Employees;

Employees.propTypes = {
  match: PropTypes.object,
};
