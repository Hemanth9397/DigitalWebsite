import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Input } from "antd";

const { TextArea } = Input;

const Wrapper = styled.div`
  position: relative;
  margin: 6px 0;
`;

const commonInputStyles = css`
  padding: 4px 11px;
  background-color: #1e222a !important;
  color: #f0f0f0 !important;
  border: 1px solid #444;
  border-radius: 6px;
  resize: vertical;

  ${({ $isActive }) =>
    $isActive &&
    css`
      border-color: #0077b5;
    `}

  &:hover {
    border-color: #0077b5;
  }

  &:focus {
    border-color: #0077b5;
    box-shadow: 0 0 0 2px rgba(0, 119, 181, 0.2);
  }
`;

const StyledInput = styled(Input)`
  ${commonInputStyles}
`;

const StyledTextArea = styled(TextArea)`
  ${commonInputStyles}
  min-height: 120px;

   /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0077b5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #005f91;
  }

  &::-webkit-scrollbar-track {
    background: #2a2f3a;
    border-radius: 4px;
  }

  /* Firefox scrollbar (optional) */
  scrollbar-width: thin;
  scrollbar-color: #0077b5 #2a2f3a;
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  background: #1e222a;
  padding: 0 4px;
  pointer-events: none;
  transition: 0.2s ease all;

  ${({ $isActive }) =>
    $isActive &&
    css`
      left: 10px;
      top: -4px;
      font-size: 16px;
      color: var(--text-primary);
      background: #28364c;
      text-shadow: 0px 0px 5px #007bff, 0px 0px 10px #007bff,
        0px 0px 15px #007bff, 0px 0px 20px #007bff;
    `}
`;

const FloatingLabelInput = ({
  value,
  onChange,
  onBlur,
  label,
  textarea = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;

  return (
    <Wrapper>
      {textarea ? (
        <StyledTextArea
          $isActive={isActive}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (typeof onBlur === "function") {
              onBlur(e);
            }
          }}
          autoSize={{ minRows: 3, maxRows: 10 }} // ✅ Auto-size here
          {...rest}
        />
      ) : (
        <StyledInput
          $isActive={isActive}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (typeof onBlur === "function") {
              onBlur(e);
            }
          }}
          {...rest}
        />
      )}
      <FloatingLabel $isActive={isActive}>{label}</FloatingLabel>
    </Wrapper>
  );
};


export default FloatingLabelInput;
