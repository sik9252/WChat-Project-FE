import React from 'react';
import { StyledButton } from './style';

export const Button = ({
  children,
  name,
  width,
  height,
  onClick,
  bgColor,
  fontSize,
}) => {
  return (
    <StyledButton
      name={name}
      width={width}
      height={height}
      onClick={onClick}
      bgColor={bgColor}
      fontSize={fontSize}
    >
      {children}
    </StyledButton>
  );
};
