import React from 'react';
import { StyledInputBox, StyledSearchInputBox } from './style';

export const InputBox = ({
  inputName,
  width,
  height,
  value,
  placeholder,
  onChange,
  defaultValue,
  onKeyPress,
}) => {
  return (
    <StyledInputBox
      name={inputName}
      width={width}
      height={height}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export const SearchInputBox = ({
  inputName,
  width,
  height,
  value,
  placeholder,
  onChange,
  onKeyPress,
}) => {
  return (
    <StyledSearchInputBox
      name={inputName}
      width={width}
      height={height}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};
