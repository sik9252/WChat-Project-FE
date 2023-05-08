import styled from 'styled-components';
import COLOR from '../../../styles/common/color';
import { FONT_STYLES } from '../../../styles/common/font-styles';

export const StyledInputBox = styled.input`
  ${FONT_STYLES.P_M}
  width: ${({ width }) => (width ? `${width}px` : '200px')};
  height: ${({ height }) => (height ? `${height}px` : '58px')};
  font-size: 18px;
  border: none;
  padding: 19px 43px;
  border-radius: 34px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  ::placeholder {
    color: #716b6b;
  }

  :focus {
    outline: none;
  }
`;

export const StyledSearchInputBox = styled.input`
  width: ${({ width }) => (width ? `${width}px` : '200px')};
  height: ${({ height }) => (height ? `${height}px` : '58px')};
  border: none;
  border-bottom: 1px solid ${COLOR.GRAY_4};

  ::placeholder {
    color: ${COLOR.BLACK_1};
    ${FONT_STYLES.P_M};
  }

  :focus {
    outline: none;
  }
`;
