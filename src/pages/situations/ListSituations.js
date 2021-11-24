import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { colorCardConstant } from '../../utils/constants';
import { Text, CardList, Card } from '../../components';
import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router';

import { getSituations } from '../../services/situations/situationService';

const ListSituations = () => {
  const alert = useAlert();
  const history = useHistory();

  const { setLoading } = useContext(Context);

  const [search, setSearch] = useState({
    description: '',
  });

  const [situations, setSituations] = useState([]);

  const handleChange = (key, value) => {
    setSearch({ ...search, [key]: value });
  };

  const handleSearch = async () => {
    setLoading(true);

    const response = await getSituations();
    if (!response.success) {
      alert.error(response.message);
    } else {
      setSituations(response.data);
    }

    setLoading(false);
  };

  const handleCardClick = (situationId) => {
    history.push(`/situacoes/${situationId}`);
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Situações" />
          <HeaderAction>
            <Button
              size="large"
              style={{ color: 'white', background: colors.primary }}
              variant="outlined"
              onClick={() => history.push('/situacoes/novo')}>
              + Adicionar
            </Button>
          </HeaderAction>
        </Header>
        <CardContent>
          <Row lg={3} sm={1} xs={1}>
            <Col md={4}>
              <TextField
                label="Descrição"
                size="small"
                margin="normal"
                variant="outlined"
                fullWidth
                value={search.name}
                onChange={(e) => handleChange('descripition', e.target.value)}
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
              {situations.map((data, i) => {
                return (
                  <Card
                    key={i}
                    data={data}
                    onClick={() => handleCardClick(data.id)}
                    title={data.description}
                    color={colorCardConstant.find(c => c.value === data.color).hex}
                    templateCard={[
                      {
                        key: 'Descrição',
                        value: data.description,
                      },
                      {
                        key: 'Cor',
                        value: colorCardConstant.find(c => c.value === data.color).label,
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

export default ListSituations;
