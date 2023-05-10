import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const MyPageContainer = styled.div`
  ${({ theme }) => theme.container.mainContainer};
  display: flex;
  flex-direction: column;
`;

export const MyPageTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  & > p {
    font-weight: 500;
    font-size: 18px;
  }
`;

export const ChangeNickBox = styled.div`
  height: 100%;

  & > div {
    :nth-child(1) {
      padding-bottom: 10px;
    }

    :nth-child(2) {
      display: flex;

      & > button {
        margin-left: 5px;
      }
    }
    :nth-child(3) {
      padding-top: 10px;
      font-size: 13px;
      color: ${COLOR.RED_1};
    }
  }
`;

export const MyPageOptionBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
