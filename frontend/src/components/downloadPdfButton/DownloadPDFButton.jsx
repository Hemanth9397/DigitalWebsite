import { useState } from "react";
import { Button, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import styled from "styled-components";

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

&::after{
  content: '';
  position: absolute;
  height: 107%;
  width: 102%;
  border-radius: 1000px;
  background-image: linear-gradient(to bottom right, #008cff, #ff4545);
  z-index: -1;
}

&:hover{
  z-index: 0;
  box-shadow: 20px 0 50px #008cff85, -20px 0 50px #ff4545;
}
`;


const DownloadPDFButton = (props) => {
  const [loading, setLoading] = useState(false);
 console.log(props);
  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/v1/portfolio/download-pdf", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume@HemanthGidijala.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      props.notify({
      type: "success",
      message: "Download Successful",
      description: "Your file has been downloaded successfully.",
    });

    } catch (error) {
      console.error(error);
      props.notify({
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
    >
      {loading ? <Spin size="small" /> : "Download PDF"}
    </StyledButton>
  );
};

export default DownloadPDFButton;