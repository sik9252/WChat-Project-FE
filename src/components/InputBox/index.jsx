import React from 'react';
import { StyledInputBox, StyledSearchInputBox } from './style';

export const InputBox = ({
  inputName,
  width,
  height,
  placeholder,
  onChange,
  defaultValue,
}) => {
  return (
    <StyledInputBox
      name={inputName}
      width={width}
      height={height}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export const SearchInputBox = ({
  inputName,
  width,
  height,
  placeholder,
  onChange,
  onKeyPress,
}) => {
  return (
    <StyledSearchInputBox
      name={inputName}
      width={width}
      height={height}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};
