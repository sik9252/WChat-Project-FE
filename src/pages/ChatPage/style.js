import styled, { css } from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const ChatPageContainer = styled.div`
  ${({ theme }) => theme.container.mainContainer};
  ${FONT_STYLES.P_M}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChatListSection = styled.div`
  position: relative;
  height: 100%;
`;

export const ChatListBox = styled.div`
  width: 100%;
  height: 100%; // 이게 원인인데
  overflow: scroll;
  position: absolute;
  bottom: 0;
`;

export const ChatBox = styled.div`
  width: 100%;
  margin: 10px 0;

  & > div {
    :nth-child(1) {
      padding-bottom: 10px;
      ${({ isMe }) =>
        isMe
          ? css`
              display: none;
            `
          : css`
              display: block;
            `}
    }
    :nth-child(2) {
      display: flex;
      align-items: flex-end;

      ${({ isMe }) =>
        isMe
          ? css`
              flex-direction: row-reverse;
              margin-left: auto;
            `
          : css`
              margin-right: auto;
            `}

      & > div {
        :nth-child(2) {
          padding-right: 5px;
          margin: 0 5px;
          font-size: 13px;
          color: ${COLOR.GREEN_9};
        }
      }
    }
  }
`;

export const Chat = styled.div`
  max-width: 300px;
  max-height: 500px;
  overflow: scroll;
  border: none;
  padding: 10px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${COLOR.GREEN_4};
  word-break: break-word;
  line-height: 1.3;

  & > div {
    padding: 3px 0;
    color: ${COLOR.GREEN_11};
  }
`;

export const ChatNotice = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${COLOR.GREEN_9};
  text-align: center;
  margin: 20px 0;
  padding: 10px 0;
  box-shadow: rgba(64, 81, 59, 0.1) 0px 2px 5px;
`;

export const InputSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > button {
    margin-left: 5px;
  }
`;

export const NoticeBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 300;
  color: ${COLOR.GREEN_10};

  & > div {
    :nth-child(1) {
      width: 30.3%;
    }
    :nth-child(2) {
      width: 30.3%;
      text-align: center;
      line-height: 1.3;

      & > div {
        padding: 5px 0;
      }
    }
    :nth-child(3) {
      width: 30.3%;
    }
  }

  @media (max-width: 720px) {
    display: block;

    & > div {
      :nth-child(1) {
        width: 100%;
      }
      :nth-child(2) {
        width: 100%;
        margin-top: 10px;
        text-align: center;
        line-height: 1.3;

        & > div {
          padding: 5px 0;
        }
      }
    }
  }
`;
