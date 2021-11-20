import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, ContentFooter } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Modal, Text } from '../../components';
import { TextField, Button, MenuItem } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import {
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
} from '../../services/activities/activitiesService';

import { getEmployees } from '../../services/employees/emplyoyeesService';
import { getClients } from '../../services/clients/clientsService';

const Activities = (props) => {
  const alert = useAlert();
  const history = useHistory();
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    description: '',
    vehicle_model: '',
    vehicle_color: '',
    vehicle_board: '',
    prevision_date: '',
    client_id: '',
    situation_id: '',
    user_id: '',
    employee_id: '',
  });
  const [modal, setModal] = useState(false);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);

  const { setLoading } = useContext(Context);

  useEffect(async () => {
    const { id } = props.match.params;

    const response = await getActivity(id);

    if (response.success) {
      setActivity({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        vehicle_model: response.data.vehicle_model,
        vehicle_color: response.data.vehicle_color,
        vehicle_board: response.data.vehicle_board,
        prevision_date: response.data.prevision_date,
        client_id: response.data.client_id,
        situation_id: response.data.situation_id,
        user_id: response.data.user_id,
        employee_id: response.data.employee_id,
      });
    } else {
      history.push('/atividades/novo');
    }

    const employees = await getEmployees();

    if (!employees.success) {
      alert.error(employees.message);
    } else {
      setEmployees(employees.data);
    }

    const clients = await getClients();

    if (!clients.success) {
      alert.error(clients.message);
    } else {
      setClients(clients.data);
    }
  }, []);

  const handleChange = (key, value) => {
    setActivity({ ...activity, [key]: value });
  };

  const clearActivity = () => {
    setActivity({
      id: '',
      title: '',
      description: '',
      vehicle_model: '',
      vehicle_color: '',
      vehicle_board: '',
      prevision_date: 'dd/mm/aaaa',
      client_id: '',
      situation_id: '',
      user_id: '',
      employee_id: '',
    });
  };

  const handleBack = () => {
    history.push('/atividades');
  };

  const handleSave = async () => {
    setLoading(true);

    if (activity.id) {
      const {
        id,
        title,
        description,
        vehicle_model,
        vehicle_color,
        vehicle_board,
        prevision_date,
        client_id,
        situation_id,
        user_id,
        employee_id,
      } = activity;
      const response = await updateActivity({
        id,
        title,
        description,
        vehicle_model,
        vehicle_color,
        vehicle_board,
        prevision_date,
        client_id,
        situation_id,
        user_id,
        employee_id,
      });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Atividade editada com sucesso!');
        clearActivity();
      }
    } else {
      const {
        title,
        description,
        vehicle_model,
        vehicle_color,
        vehicle_board,
        prevision_date,
        client_id,
        situation_id,
        user_id,
        employee_id,
      } = activity;
      const response = await createActivity({
        title,
        description,
        vehicle_model,
        vehicle_color,
        vehicle_board,
        prevision_date,
        client_id,
        situation_id,
        user_id,
        employee_id,
      });

      if (!response.success) {
        alert.error(response.message);
      } else {
        alert.success('Atividade cadastrada com sucesso!');
        clearActivity();
      }
    }

    setLoading(false);
  };

  const handleDelete = () => {
    setModal(true);
  };

  const remove = async () => {
    const response = await deleteActivity(activity.id);

    if (!response.success) {
      alert.error(response.message);
    } else {
      setModal(false);
      alert.success('Atividade excluída com sucesso!');
    }
  };

  return (
    <Container fluid>
      <Modal
        title={'Tem certeza que deseja excluir esta atividade?'}
        toggle={modal}
        onClickCancel={() => setModal(false)}
        onClickConfirm={() => remove()}
      />
      <Content>
        <Header>
          <Text large text={activity.id ? 'Editar Atividade' : 'Nova Atividade'} />
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                label="Nome"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={activity.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="Modelo Veículo"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={activity.vehicle_model}
                onChange={(e) => handleChange('vehicle_model', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="Cor veículo"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={activity.vehicle_color}
                onChange={(e) => handleChange('vehicle_color', e.target.value)}
              />
            </Col>
          </Row>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                label="Placa veículo"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={activity.vehicle_board}
                onChange={(e) => handleChange('vehicle_board', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                label="Data de entrega prevista"
                size="small"
                margin="normal"
                type="date"
                maxLength={8}
                fullWidth
                value={activity.prevision_date}
                onChange={(e) => handleChange('prevision_date', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                select
                label="Cliente"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={activity.client_id}
                onChange={(e) => handleChange('client_id', e.target.value)}>
                {clients.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
          </Row>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                select
                label="Situação"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={activity.situation_id}
                onChange={(e) => handleChange('situation_id', e.target.value)}
              />
            </Col>
            <Col md={4}>
              <TextField
                select
                label="Funcionário"
                size="small"
                variant="outlined"
                margin="normal"
                fullWidth
                value={activity.employee_id}
                onChange={(e) => handleChange('employee_id', e.target.value)}>
                {employees.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Col>
            <Col md={4}></Col>
          </Row>
          <Row>
            <Col>
              <TextField
                id="outlined-multiline-static"
                label="Descrição"
                margin="normal"
                multiline
                fullWidth
                rows={4}
                value={activity.description}
              />
            </Col>
          </Row>
        </CardContent>
        <ContentFooter>
          {activity.id ? (
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

export default Activities;

Activities.propTypes = {
  match: PropTypes.object,
};