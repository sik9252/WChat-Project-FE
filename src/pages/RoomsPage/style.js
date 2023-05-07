import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const RoomsPageContainer = styled.div`
  ${({ theme }) => theme.container.mainContainer};
`;

export const RoomsListBox = styled.div`
  & > div {
    padding: 10px 0;
    cursor: pointer;
  }
`;
