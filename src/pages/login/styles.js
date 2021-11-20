import styled from 'styled-components';
import { device } from '../../utils/devices';
import { Container as ContainerComponent, Button, Row, Col } from 'react-bootstrap';
import { colors } from '../../utils/colors';

export const Container = styled.div``;

export const ContainerBody = styled(ContainerComponent)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 50px;
  margin-top: 15px;
  max-width: 756px;

  @media ${device.tablet} {
    justify-content: start;
  }

  @media ${device.mobileL} {
    margin-top: 40px;
  }
`;

export const ContainerFooter = styled(ContainerComponent)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20vh;

  @media ${device.laptop} {
    min-height: 20vh;
    margin-bottom: 35px;
  }

  @media ${device.mobileS} {
    min-height: 20vh;
    margin-bottom: 70px;
  }
`;

export const ContainerHeader = styled(ContainerComponent)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  min-height: 15vh;
  margin-bottom: 40px;

  @media ${device.tablet} {
    min-height: 7vh;
    margin-bottom: 0;
  }
`;

export const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
`;

export const CustomRow = styled(Row)`
  ${(props) => props.full && 'height: 100vh'};
  align-items: center;
  justify-content: ${(props) => props.align};
`;

export const CustomCol = styled(Col)`
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const BackgroundLogin = styled(CustomContainer)`
  width: 55%;
  background: ${colors.primary};
`;

export const FormLogin = styled(CustomContainer)`
  width: 45%;
`;

export const CustomButton = styled(Button)`
  background-color: green;
  width: 100%;
`;
