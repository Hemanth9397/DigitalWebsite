import { Button, Spin } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  padding: clamp(0.5rem, 1vw + 0.5rem, 1rem) clamp(1rem, 2vw + 0.5rem, 2rem) !important;
  background-color: #161a20 !important;
  border: none !important;
  color: #f0f0f0 !important;
  border-radius: 1000px !important;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(0.9rem, 1vw + 0.3rem, 1.1rem);

  &::after {
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

  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0.6rem 1.5rem !important;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.5rem 1rem !important;
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
      className={className}
      disabled={loading || props.disabled}
    >
      {loading ? <Spin size="small" /> : children}
    </StyledButton>
  );
};

export default CustomButton;
