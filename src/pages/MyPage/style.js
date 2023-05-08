import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const MyPageContainer = styled.div`
  ${({ theme }) => theme.container.mainContainer};
`;
