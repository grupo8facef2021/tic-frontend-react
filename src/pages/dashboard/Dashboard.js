import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Card, CardList, Text } from '../../components';
import { CardContent, Content, Header } from '../../components/Layout/Layout';

import { getActivities } from '../../services/activities/activitiesService';
import { colors } from '../../utils/colors';

const Dashboard = () => {
  const alert = useAlert();
  const [activities, setActivities] = useState([]);

  const history = useHistory();

  useEffect(async () => {
    const response = await getActivities();

    if (!response.success) {
      alert.error(response.message);
    } else {
      setActivities(response.data);
    }
  }, [activities]);

  const handleCardClick = (activitieId) => {
    history.push(`atividades/${activitieId}`);
  };

  return (
    <Container fluid>
      <Content>
        <Header>
          <Text large text="Dashboard" />
        </Header>
        <CardContent>
          <Row></Row>
          <CardList>
            {activities.map((data, i) => {
              return (
                <Card
                  key={i}
                  data={data}
                  onClick={() => handleCardClick(data.id)}
                  title={data.title}
                  color={colors.primary}
                  templateCard={[
                    {
                      key: 'Título',
                      value: data.title,
                    },
                    {
                      key: 'Cargo',
                      accessor: data.role,
                    },
                  ]}></Card>
              );
            })}
          </CardList>
        </CardContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
