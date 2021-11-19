import React, { Component } from 'react';
import { Nav, StyledBurger, Ul, Logo } from './styles';
import { Text } from '../../components';
import { NavLink } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Header } from '../layout/Layout';
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbar: false,
    };
  }

  render() {
    return (
      <>
        <Nav>
          <Text largeWhite text="Easy-Tasks" />
        </Nav>
        <StyledBurger
          open={this.state.navbar}
          onClick={() => {
            this.setState({ navbar: !this.state.navbar });
          }}>
          <div></div>
          <div></div>
          <div></div>
        </StyledBurger>
        <Modal
          style={{ zIndex: '-1' }}
          show={this.state.navbar}
          onHide={() => {
            this.setState({ navbar: !this.state.navbar });
          }}></Modal>
        <Ul open={this.state.navbar}>
          <NavLink
            onClick={() => {
              this.setState({ navbar: !this.state.navbar });
            }}
            to="/dashboard">
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            onClick={() => {
              this.setState({ navbar: !this.state.navbar });
            }}
            to="/atividades">
            <li>Atividades</li>
          </NavLink>
          <NavLink
            onClick={() => {
              this.setState({ navbar: !this.state.navbar });
            }}
            to="/clientes">
            <li>Clientes</li>
          </NavLink>
          <NavLink
            onClick={() => {
              this.setState({ navbar: !this.state.navbar });
            }}
            to="/usuarios">
            <li>Usuários</li>
          </NavLink>
          <NavLink
            onClick={() => {
              this.setState({ navbar: !this.state.navbar });
            }}
            to="/funcionarios">
            <li>Funcionários</li>
          </NavLink>
          <NavLink
            onClick={() => {
              this.setState({ navbar: !this.state.navbar });
            }}
            to="/situacoes">
            <li>Situações</li>
          </NavLink>
          <NavLink to="/situacoes">
            <li>Sair</li>
          </NavLink>
        </Ul>
        <Header />
      </>
    );
  }
}
