import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text, CardList, Card } from '../../components';
import { TextField, Button, MenuItem } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import { getActivities } from '../../services/activities/activitiesService';
import { getEmployees } from '../../services/employees/emplyoyeesService';
import { getClients } from '../../services/clients/clientsService';
import { getSituations } from '../../services/situations/situationService';

const Activities = () => {
  const alert = useAlert();
  const history = useHistory();

  const { setLoading } = useContext(Context);

  const [search, setSearch] = useState({
    title: '',
    situation_id: '',
    employee_id: '',
  });

  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [activities, setActivities] = useState([]);
  const [situations, setSituations] = useState([]);

  useEffect(async () => {
    const [
      employeesResponse,
      clientsResponse,
      situationsResponse
    ] = await Promise.all([
      getEmployees(),
      getClients(),
      getSituations()
    ])

    if (!employeesResponse.success) {
      alert.error(employeesResponse.message);
    } else {
      setEmployees(employeesResponse.data);
    }

    if (!clientsResponse.success) {
      alert.error(clientsResponse.message);
    } else {
      setClients(clientsResponse.data);
    }

    if (!situationsResponse.success) {
      alert.error(situationsResponse.message);
    } else {
      setSituations(situationsResponse.data);
    }

  }, []);

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

  const handleCardClick = (activitieId) => {
    history.push(`atividades/${activitieId}`)
  }

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
                {situations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.description}
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
            <CardList>
              {activities.map((data, i) => {
                return (
                  <Card
                    key={i}
                    onClick={() => handleCardClick(data.id)}
                    title={data.title}
                    color={colors.primary}
                    templateCard={[
                      {
                        key: 'Situação',
                        value: situations.find(s => s.id === data.situation.id).description,
                      },
                      {
                        key: 'Título',
                        value: data.title,
                      },
                      {
                        key: 'Veículo',
                        value: `${data.vehicle_model} ${data.vehicle_color}`,
                      },
                      {
                        key: 'Funcionário',
                        value: employees.find(e => e.id === data.employee.id).name,
                      },
                      {
                        key: 'Previsão de entraga',
                        value: data.prevision_date,
                      },
                    ]}>
                  </Card>
                );
              })}
            </CardList>
          </Row>
        </CardContent>
      </Content>
    </Container>
  );
};

export default Activities;
