import { Button, Spin } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  padding: 1em 2em !important;
  background-color: #161a20 !important;
  border: none !important;
  color: #f0f0f0 !important;
  border-radius: 1000px !important;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &::after{
    content: "";
    position: absolute;
    height: 107%;
    width: 102%;
    border-radius: 1000px;
    background-image: linear-gradient(to bottom right, #008cff, #ff4545) !important;
    z-index: -1;
  }

  &:hover {
    z-index: 0;
    box-shadow: 20px 0 50px #008cff85, -20px 0 50px #ff4545;
  }
`;

const CustomButton = ({
  className = "",
  loading = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      className={`${className}`}
      disabled={loading || props.disabled}
    >
      {loading ? <Spin size="small" /> : children}
    </StyledButton>
  );
};

export default CustomButton;
