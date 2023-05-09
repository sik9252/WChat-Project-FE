import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const StyledInputBox = styled.input`
  ${FONT_STYLES.P_M}
  width: ${({ width }) => (width ? `${width}px` : '200px')};
  height: ${({ height }) => (height ? `${height}px` : '58px')};
  border: none;
  padding: 10px;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  ::placeholder {
    color: ${COLOR.GREEN_6};
  }

  :focus {
    outline: none;
  }
`;

export const StyledSearchInputBox = styled.input`
  width: ${({ width }) => (width ? `${width}px` : '200px')};
  height: ${({ height }) => (height ? `${height}px` : '58px')};
  padding: 10px;
  border: none;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  ::placeholder {
    color: ${COLOR.GREEN_6};
    ${FONT_STYLES.P_M};
  }

  :focus {
    outline: none;
  }
`;
