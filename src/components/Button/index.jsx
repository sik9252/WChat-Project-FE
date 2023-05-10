import React from 'react';
import { StyledButton } from './style';

export const Button = ({
  children,
  name,
  width,
  height,
  onClick,
  bgColor,
  color,
  fontSize,
}) => {
  return (
    <StyledButton
      name={name}
      width={width}
      height={height}
      onClick={onClick}
      bgColor={bgColor}
      color={color}
      fontSize={fontSize}
    >
      {children}
    </StyledButton>
  );
};
