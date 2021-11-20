import styled from 'styled-components';
import { colors } from '../../utils/colors';

export const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const CardContent = styled.div`
  width: 23rem;
  margin: 1rem;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-left: 5px solid ${colors.primary};
  box-shadow: rgb(0 0 0 / 20%) 0px 4px 8px 0px;
  border-radius: 4px;
  cursor: pointer;

  div {
    padding: 0.5rem;
    margin: 0;
  }

  p {
    font-weight: 500;
    margin: 0;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
