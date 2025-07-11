import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "antd";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Label = styled.span`
  min-width: 70px;
  color: #0077b5;
  font-weight: 500;
  display: ${({ $show }) => ($show ? "inline-block" : "none")};
  margin-right: 8px;
`;

const StyledInput = styled(Input)`
  background-color: #1e222a !important;
  color: #f0f0f0 !important;
  border: 1px solid #444;
  height: 40px;

  &::placeholder {
    color: #888;
  }
`;

const FloatingLeftLabelInput = ({ value, onChange, placeholder, onFocus, onBlur, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || !!value;

  return (
    <Wrapper>
      <Label $show={isActive}>{placeholder}:</Label>
      <StyledInput
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        placeholder={!isActive ? placeholder : ""}
        {...rest}
      />
    </Wrapper>
  );
};

export default FloatingLeftLabelInput;
