import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent, HeaderAction } from '../../components/layout/Layout';
import { colors } from '../../utils/colors';
import { Text, CardList } from '../../components';
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
    history.push(`/situacoes/${situationId}`)
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
              +Adicionar
            </Button>
          </HeaderAction>
        </Header>
        <CardContent>
          <Row lg={2} sm={1} xs={1}>
            <Col>
              <Row lg={2}>
                <Col>
                  <TextField
                    label="Descripition"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={search.name}
                    onChange={(e) => handleChange('descripition', e.target.value)}
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
          </Row>
          <Row lg={1} sm={1} xs={1}>
            <CardList
              dataList={situations}
              templateCard={[
                {
                  key: 'Descrição',
                  value: value => value.description
                },
                {
                  key: 'Cor',
                  value: value => value.color
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

export default ListSituations;
