import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { device } from '../../utils/devices';

export const SmallText = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.primary};

  @media ${device.laptop} {
    font-size: 18px;
  }

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export const SmallTextWhite = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: ${colors.white};

  @media ${device.laptop} {
    font-size: 18px;
  }

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

export const MediumText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.primary};

  @media ${device.laptop} {
    font-size: 22px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }
`;

export const MediumTextWhite = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.white};

  @media ${device.laptop} {
    font-size: 22px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }
`;

export const LargeText = styled.h2`
  font-size: 48px;
  font-weight: bold;
  color: ${colors.primary};

  @media ${device.laptop} {
    font-size: 36px;
  }

  @media ${device.tablet} {
    font-size: 30px;
  }
`;

export const LargeTextWhite = styled.h2`
  font-size: 48px;
  font-weight: bold;
  color: ${colors.white};

  @media ${device.laptop} {
    font-size: 36px;
  }

  @media ${device.tablet} {
    font-size: 30px;
  }
`;
