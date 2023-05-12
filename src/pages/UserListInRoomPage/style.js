import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const UserListContainer = styled.div`
  padding: 10px;
  background-color: ${COLOR.GREEN_1};

  & > div {
    :nth-child(1) {
      margin-bottom: 10px;
      text-align: center;
      font-weight: 600;
      color: ${COLOR.GREEN_11};
    }
  }
`;

export const UserListBox = styled.div`
  text-align: center;
  max-height: 300px;
  overflow-y: scroll;
`;

export const User = styled.div`
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${COLOR.GREEN_9};
`;
