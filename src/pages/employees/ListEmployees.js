import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text, CardList } from '../../components';
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
          <Row>
            <Col>
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
          </Row>
          <Row align="right">
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
            <CardList
              dataList={employees}
              templateCard={[
                {
                  key: 'Nome',
                  value: value => value.name
                },
                {
                  key: 'Cargo',
                  value: value => value.role
                },
              ]}
              onCardClick={handleCardClick}
            />
          </Row>
        </CardContent>
      </Content>
    </Container>
  );
};

export default Employees;
