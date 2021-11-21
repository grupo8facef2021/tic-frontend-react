import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent } from '../../components/layout/Layout';
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
    history.push(`/funcionarios/${employeeId}`)
  }

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Funcionários" />
        </Header>
        <CardContent>
          <Row lg={2} sm={1} xs={1}>
            <Col>
              <Row lg={2}>
                <Col>
                  <TextField
                    label="Nome"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={search.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Col>
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
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                size="large"
                style={{ color: 'white', background: colors.primary }}
                variant="outlined"
                onClick={() => history.push('/funcionarios/novo')}>
                Novo Usuário
              </Button>
            </Col>
          </Row>
          <Row lg={1} sm={1} xs={1}>
            <CardList
              dataList={employees}
              templateCard={[
                {
                  key: 'Nome',
                  accessor: 'name',
                },
                {
                  key: 'Cargo',
                  accessor: 'role',
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
