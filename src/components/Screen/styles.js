import styled from 'styled-components';
import { device } from '../../utils/devices';
import { Container as ContainerComponent } from 'react-bootstrap';
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

export const ContainerLogin = styled(ContainerComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const BackgroundLogin = styled(ContainerComponent)`
  display: flex;
  height: 100vh;
  background-color: ${colors.primary};
`;
