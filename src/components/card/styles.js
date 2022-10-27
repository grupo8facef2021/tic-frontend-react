import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const CardContent = styled.div`
  width: 30%;
  margin: 0.6rem;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 5px solid ${(props) => props.color};
  box-shadow: rgb(0 0 0 / 20%) 0px 4px 8px 0px;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 1300px) {
    width: 47%;
  }

  @media (max-width: 800px) {
    width: 90%;
  }

  div {
    padding: 0.5rem;
    margin: 0;
  }

  label {
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: ${colors.primary};
  }

  p {
    font-weight: 500;
    margin: 0;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
