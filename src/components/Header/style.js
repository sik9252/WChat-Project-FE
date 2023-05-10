import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fefbe9;
  padding: 25px 20px 25px 12px;
  border-bottom: 1px solid ${COLOR.GREEN_2};
`;

export const LogoBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > img {
    width: 100px;
    cursor: pointer;
  }

  & > div {
    width: 200px;
    color: ${COLOR.BLACK_2};
    padding: 0 30px 0 10px;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: center;

  & > div {
    :nth-child(1) {
      margin-right: 3px;
    }
  }
`;
