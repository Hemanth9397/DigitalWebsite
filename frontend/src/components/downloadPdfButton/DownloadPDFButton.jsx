import { useState } from "react";
import { Button, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import styled, { keyframes, css } from "styled-components";

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0px #ff4545;
  }
  50% {
    box-shadow: 0 0 25px #008cff, 0 0 50px #ff4545;
  }
  100% {
    box-shadow: 0 0 0px #ff4545;
  }
`;

const StyledButton = styled(Button)`
  padding: 1em 2em;
  background-color: #161a20 !important;
  border: none;
  color: #f0f0f0 !important;
  border-radius: 1000px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    height: 107%;
    width: 102%;
    border-radius: 1000px;
    background-image: linear-gradient(to bottom right, #008cff, #ff4545);
    z-index: -1;
    transform: scale(1.05);
  }

  &:hover {
    box-shadow: 0 0 30px #008cff85, 0 0 30px #ff4545;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      animation: ${pulseGlow} 1.2s ease-in-out infinite;
    `}
`;

const DownloadPDFButton = ({ notify }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/v1/portfolio/download-pdf`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume@HemanthGidijala.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      notify({
        type: "success",
        message: "Saved as Resume@HemanthGidijala.pdf",
        description: "Your resume has been downloaded successfully.",
      });
    } catch (error) {
      notify({
        type: "error",
        message: "Download Failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledButton
      type="primary"
      icon={<DownloadOutlined />}
      onClick={handleDownload}
      disabled={loading}
      $isLoading={loading}
    >
      {loading ? <Spin size="small" /> : "Download PDF"}
    </StyledButton>
  );
};

export default DownloadPDFButton;
