import styled, { css } from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const CreateRoomPageContainer = styled.div`
  ${({ theme }) => theme.container.mainContainer};
`;

export const RoomNameBox = styled.div`
  margin: 15px 0;

  & > div {
    :nth-child(1) {
      padding-bottom: 10px;
    }
  }
`;

export const MaxPeopleBox = styled.div`
  margin: 15px 0;

  & > div {
    :nth-child(1) {
      padding-bottom: 10px;
    }
  }
`;

export const RoomPassWordBox = styled.div`
  margin: 15px 0;

  & > div {
    :nth-child(1) {
      padding-bottom: 10px;
    }
  }
`;

export const IsSecretBox = styled.div`
  margin: 15px 0;

  & > div {
    :nth-child(1) {
      padding-bottom: 10px;
    }
  }
`;

export const EndOptionBox = styled.div`
  margin-top: 60px;
  text-align: center;

  & > button {
    :nth-child(1) {
      margin-right: 10px;
    }
  }
`;

export const ErrorBox = styled.div`
  display: block;
  font-size: 13px;
  color: ${COLOR.RED_1};

  ${({ checkRoomName }) =>
    checkRoomName
      ? css`
          display: none;
        `
      : null}
  ${({ checkMaxPeople }) =>
    checkMaxPeople
      ? css`
          display: none;
        `
      : null}
    ${({ checkRoomPassword }) =>
    checkRoomPassword
      ? css`
          display: none;
        `
      : null};
`;
