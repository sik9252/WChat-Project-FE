import styled from 'styled-components';
import COLOR from '../../styles/common/colors';
import { FONT_STYLES } from '../../styles/common/font-styles';

export const StyledButton = styled.button`
  ${FONT_STYLES.P_M}
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : `${15}px`)};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : COLOR.GREEN_9)};
  color: ${({ color }) => (color ? color : COLOR.GRAY_0)};
  border-radius: 7px;

  :hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: ${({ bgColor }) =>
      bgColor ? COLOR.GREEN_10 : COLOR.GREEN_10};
    color: ${({ bgColor }) => (bgColor ? COLOR.GRAY_0 : COLOR.GRAY_0)};
  }
`;
