import React from 'react';
import {
  StyledButton,
} from './style';

export const Button = ({
  children,
  name,
  width,
  height,
  onClickFunc,
  bgColor,
  fontSize,
}) => {
  return (
    <StyledButton
      name={name}
      width={width}
      height={height}
      onClick={onClickFunc}
      bgColor={bgColor}
      fontSize={fontSize}
    >
      {children}
    </StyledButton>
  );
};
