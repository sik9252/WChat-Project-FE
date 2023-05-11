import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  box-shadow: 0px 3px 15px #00000029;
  border-radius: 22px;
  z-index: 15;
`;

export const ModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
`;

export const ModalContent = styled.div`
  & > svg {
    float: right;
    cursor: pointer;
  }

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  max-height: 300px;
  background-color: ${COLOR.GRAY_0};
  box-shadow: 0px 3px 15px #00000029;
  border-radius: 7px;
  overflow-y: scroll;
`;
