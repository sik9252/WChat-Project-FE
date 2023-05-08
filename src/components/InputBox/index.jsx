import React from 'react';
import { StyledInputBox, StyledSearchInputBox } from './style';

export const InputBox = ({
  inputName,
  width,
  height,
  placeholder,
  onChangeFunc,
  defaultValue,
}) => {
  return (
    <StyledInputBox
      name={inputName}
      width={width}
      height={height}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChangeFunc}
    />
  );
};

export const SearchInputBox = ({
  inputName,
  width,
  height,
  placeholder,
  onChangeFunc,
  onKeyPressFunc,
}) => {
  return (
    <StyledSearchInputBox
      name={inputName}
      width={width}
      height={height}
      placeholder={placeholder}
      onChange={onChangeFunc}
      onKeyPress={onKeyPressFunc}
    />
  );
};
