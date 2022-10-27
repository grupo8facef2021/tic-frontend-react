import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/Layout/Layout';
import { colors } from '../../utils/colors';
import { Text, CardList, Card } from '../../components';
import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import { getEmployees } from '../../services/employees/emplyoyeesService';

const Employees = () => {
  const alert = useAlert();
  const history = useHistory();

  const { setLoading } = useContext(Context);

  const [search, setSearch] = useState({
    name: '',
  });

  const [employees, setEmployees] = useState([]);

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  const handleSearch = async () => {
    setLoading(true);

    const response = await getEmployees();
    if (!response.success) {
      alert.error(response.message);
    } else {
      setEmployees(response.data);
    }

    setLoading(false);
  };

  const handleCardClick = (employeeId) => {
    history.push(`/funcionarios/${employeeId}`);
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Funcionários" />
          <HeaderAction>
            <Button
              size="large"
              style={{ color: 'white', background: colors.primary }}
              variant="outlined"
              onClick={() => history.push('/funcionarios/novo')}>
              + Adicionar
            </Button>
          </HeaderAction>
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
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
            <Col md={4}></Col>
            <Col md={4}></Col>
          </Row>
          <Row align="left">
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
          <Row lg={1} sm={1} xs={1}>
            <CardList>
              {employees.map((data, i) => {
                return (
                  <Card
                    key={i}
                    data={data}
                    onClick={() => handleCardClick(data.id)}
                    title={data.name}
                    color={colors.primary}
                    templateCard={[
                      {
                        key: 'Nome',
                        value: data.name,
                      },
                      {
                        key: 'Cargo',
                        value: data.role,
                      },
                    ]}></Card>
                );
              })}
            </CardList>
          </Row>
        </CardContent>
      </Content>
    </Container>
  );
};

export default Employees;
