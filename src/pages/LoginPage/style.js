import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fefbe9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    cursor: pointer;
  }
`;

export const LogoBox = styled.div`
  width: 70%;
  margin-bottom: 80px;

  & > img {
    width: 100%;
  }
`;
