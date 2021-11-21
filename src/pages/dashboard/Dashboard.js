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
        <Header>
          <Text large text="Dashboard" />
        </Header>
        <CardContent>
          <Row></Row>
          <CardList
            dataList={activities}
            templateCard={[
              {
                key: 'Título',
                accessor: 'title',
              },
              {
                key: 'Cargo',
                accessor: 'role',
              },
            ]}
          />
        </CardContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
