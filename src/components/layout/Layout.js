import styled from 'styled-components';

export const CommonDiv = styled.div`
  width: 80%;
`

export const Header = styled(CommonDiv)`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const CardContent = styled(CommonDiv)`
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  padding: 3rem;
`

export const ContentFooter = styled(CommonDiv)`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
  padding-bottom: 2rem;
  justify-content: flex-end;
`