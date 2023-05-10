import styled, { css } from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const RoomsPageContainer = styled.div`
  ${({ theme }) => theme.container.mainContainer};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RoomPageContents = styled.div``;

export const WelcomeTitle = styled.div`
  display: flex;
  justify-content: center;

  & > p {
    font-weight: 500;
    font-size: 18px;
  }
`;

export const RoomsListBox = styled.div``;

export const Room = styled.div`
  margin: 5px 0;
  padding: 15px 10px;
  border: 1px solid ${COLOR.GREEN_4};
  cursor: pointer;
  color: ${COLOR.GREEN_11};

  display: flex;
  justify-content: space-between;

  & > div {
    :nth-child(1) {
      padding-right: 20px;
      white-space: nowrap;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :nth-child(2) {
      display: flex;
    }
  }

  ${({ isSecret }) =>
    isSecret
      ? css`
          & > div {
            :nth-child(2) {
              & > div {
                :nth-child(1) {
                  margin-right: 13px;
                }
              }
            }
          }
        `
      : css`
          & > div {
            :nth-child(2) {
              & > div {
                :nth-child(1) {
                  margin-right: 10px;
                }
              }
            }
          }
        `}
`;

export const SearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin: 20px 0;

  & > svg {
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const RoomListTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  //border-bottom: 1px solid ${COLOR.GREEN_2};
  padding-bottom: 10px;

  & > div {
    :nth-child(1) {
      font-weight: 500;
      color: ${COLOR.GREEN_11};
    }
    :nth-child(2) {
      & > button {
        margin-right: 20px;
      }

      & > svg {
        cursor: pointer;
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  color: ${COLOR.GREEN_11};
`;