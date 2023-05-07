import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const LoginPageContainer = styled.div`
  ${({ theme }) => theme.container.mainContainer};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    cursor: pointer;
  }
`;
