import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text, CardList } from '../../components';
import { TextField, Button, MenuItem } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import { getActivities } from '../../services/activities/activitiesService';
import { getEmployees } from '../../services/employees/emplyoyeesService';
import { getSituations } from '../../services/situations/situationService';

const Activities = () => {
  const alert = useAlert();
  const history = useHistory();

  const [employees, setEmployees] = useState([]);
  const [situations, setSituations] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(async () => {
    const situations = await getSituations();

    if (!situations.success) {
      alert.error(situations.message);
    } else {
      setSituations(situations.data);
    }

    const employees = await getEmployees();
    if (!employees.success) {
      alert.error(employees.message);
    } else {
      setEmployees(employees.data);
    }
  }, []);

  const { setLoading } = useContext(Context);

  const [search, setSearch] = useState({
    title: '',
    situation_id: '',
    employee_id: '',
  });

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  const clearSearch = () => {
    setSearch({
      title: '',
      situation_id: '',
      employee_id: '',
    });
  };

  const handleSearch = async () => {
    setLoading(true);

    const response = await getActivities();

    if (!response.success) {
      alert.error(response.message);
    } else {
      setActivities(response.data);
      clearSearch();
    }

    setLoading(false);
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Atividades" />
          <HeaderAction>
            <Button
              size="large"
              style={{ color: 'white', background: colors.primary }}
              variant="outlined"
              onClick={() => history.push('/atividades/novo')}>
              + Adicionar
            </Button>
          </HeaderAction>
        </Header>
        <CardContent>
          <Row lg={3} sm={1}>
            <Col md={6}>
              <TextField
                label="Título"
                size="small"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </Col>
            <Col md={3}>
              <TextField
                select
                label="Situação"
                size="small"
                margin="normal"
                variant="outlined"
                fullWidth
                value={search.situation_id}
                onChange={(e) => handleChange('title', e.target.value)}>
                {['teste', 'teste1', 'teste2'].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
            <Col md={3}>
              <TextField
                select
                margin="normal"
                label="Funcionário"
                size="small"
                variant="outlined"
                fullWidth
                value={search.employee_id}
                onChange={(e) => handleChange('employee_id', e.target.value)}>
                {employees.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
          </Row>
          <Row align="right">
            <Col md={9}></Col>
            <Col md={3}>
              <Button
                size="large"
                style={{ color: 'white', background: colors.primary }}
                variant="outlined"
                onClick={handleSearch}>
                Pesquisar
              </Button>
            </Col>
          </Row>
          <Row lg={1} sm={1} xs={1}>
            <CardList
              dataList={activities}
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
            />
          </Row>
        </CardContent>
      </Content>
    </Container>
  );
};

export default Activities;
