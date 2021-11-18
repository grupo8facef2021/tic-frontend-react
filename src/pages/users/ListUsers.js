import React, { useState, useContext } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Header, Content, CardContent } from '../../components/layout/Layout'
import { colors } from '../../utils/colors';
import { Text, CardList } from '../../components'
import { getUsers, createUser } from '../../services/users/usersService'

import { TextField, Button } from '@material-ui/core';
import { Context } from '../../context/authContext';
import { useAlert } from 'react-alert'

const Users = () => {
    const { setLoading } = useContext(Context);
    const alert = useAlert()

    const [search, setSearch] = useState({
        name: ''
    })

    const [users, setUsers] = useState([])

    const handleChange = (key, value) => {
        setSearch({ ...search, [key]: value });
    };

    const handleSearch = async () => {
        setLoading(true)

        const response = await getUsers()
        if(!response.success){
            alert.error(response.message)
        }else{
            setUsers(response.data)
        }

        setLoading(false)
    }

    return (
        <Container fluid>
            <Content>
                <Header>
                    <Text large text="Usuários" />
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
                                        onChange={e => handleChange('name', e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        size="large"
                                        style={{ color: 'white', background: colors.primary }}
                                        variant="outlined"
                                        onClick={handleSearch}
                                    >
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
                            >
                                Novo Usuário
                            </Button>
                        </Col>
                    </Row>
                    <Row lg={1} sm={1} xs={1}>
                        <CardList
                            dataList={users}
                            templateCard={[
                                {
                                    key: 'Tipo',
                                    accessor: 'email'
                                },
                                {
                                    key: 'Email',
                                    accessor: 'email'
                                }
                            ]}
                        />
                    </Row>
                </CardContent>
            </Content>
        </Container >
    );
};

export default Users;
