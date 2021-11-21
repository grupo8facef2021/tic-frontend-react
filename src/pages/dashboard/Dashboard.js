import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Col, Container, Row } from 'react-bootstrap';
import { CardList, Text } from '../../components';
import { CardContent, Content, Header } from '../../components/layout/Layout';

import { getActivities } from '../../services/activities/activitiesService';

const Dashboard = () => {
  const alert = useAlert();
  const [activities, setActivities] = useState([]);

  useEffect(async () => {
    const response = await getActivities();

    if (!response.success) {
      alert.error(response.message);
    } else {
      setActivities(response.data);
    }
  }, [activities]);

  return (
    <Container fluid>
      <Content>
        <Header />
        <Row>
          <Col>
            <CardContent>
              <Row>
                <Col>
                  <Text large text="Atividades" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CardList
                    dataList={activities}
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
                  />
                </Col>
              </Row>
            </CardContent>
          </Col>
          <Col>
            <CardContent>
              <Text large text="Fazendo" />
            </CardContent>
          </Col>
          <Col>
            <CardContent>
              <Text large text="Concluído" />
            </CardContent>
          </Col>
        </Row>
      </Content>
    </Container>
  );
};

export default Dashboard;
