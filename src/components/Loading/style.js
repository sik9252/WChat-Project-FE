import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fefbe9;
`;

export const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 25px;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
