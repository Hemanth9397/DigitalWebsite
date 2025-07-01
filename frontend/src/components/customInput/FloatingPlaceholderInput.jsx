import styled from "styled-components";
import { Input } from "antd";
import React, { useState } from "react";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  background-color: #1e222a !important;
  color: #f0f0f0 !important;
  border: 1px solid #444;
  padding-left: 12px;
  height: 40px;

  &:hover + .placeholder {
    color: #0077b5;
    font-weight: 600;
  }

  &:focus + .placeholder {
    display: none;
  }
`;

const PlaceholderText = styled.span`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  transition: color 0.2s ease;
`;

const FloatingPlaceholderInput = ({ value, onChange, placeholder }) => {
  return (
    <Wrapper>
      <StyledInput value={value} onChange={onChange} />
      {!value && <PlaceholderText className="placeholder">{placeholder}</PlaceholderText>}
    </Wrapper>
  );
};

export default FloatingPlaceholderInput;
