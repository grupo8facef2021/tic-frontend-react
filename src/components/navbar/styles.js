import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { device } from '../../utils/devices';

// Hamburguer CSS

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 10px;
  left: 20px;
  z-index: 10001;
  display: none;

  @media ${device.laptop} {
    top: 15px;
    left: 15px;
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    position: fixed;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props) => (props.open ? `${colors.white}` : `${colors.white}`)};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    cursor: pointer;
    &:nth-child(1) {
      transform: ${(props) => (props.open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${(props) => (props.open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${(props) => (props.open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

// Navbar CSS
export const Nav = styled.nav`
  height: calc(2rem + 30px);
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${colors.primary};
  align-items: center;
  position: fixed;
  z-index: 2;
  padding-left: 5%;

  @media ${device.laptop} {
    display: flex;
    justify-content: center;
  }

  span {
    font-size: 30px;
    @media only screen and (max-width: 600px) {
      font-size: 20px;
      :nth-child(2) {
        font-size: 16px !important;
        margin-top: 0px !important;
      }
    }
  }
`;

// Links CSS
export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: fixed;
  width: 85%;
  top: 0;
  justify-content: flex-end;
  margin-top: 0px;
  align-items: left;
  font-size: 18px;
  height: 60px;
  z-index: 3;

  a {
    text-decoration: none;
    text-transform: none;
    color: ${colors.white};
    margin-left: -15px;
  }

  li {
    padding: 18px 30px;
    &:hover {
      color: ${colors.white};
    }
  }

  @media ${device.laptop} {
    flex-flow: column nowrap;
    background-color: ${colors.primary};
    position: fixed;
    transform: ${(props) => (props.open ? 'translateX(0);' : 'translateX(-100%);')};
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    padding-top: 80px;
    transition: transform 0.3s ease-in-out;
    z-index: 10000;
    justify-content: normal;
    font-size: 25px;

    li {
      color: ${colors.white};
      padding: 5px 40px;

      &:hover {
        color: ${colors.white};
      }
    }
  }
`;
