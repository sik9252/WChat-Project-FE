import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const UserListContainer = styled.div`
  padding: 10px;
  background-color: ${COLOR.GREEN_1};

  & > div {
    :nth-child(1) {
      text-align: center;
    }
  }
`;

export const UserListBox = styled.div``;

export const User = styled.div``;
