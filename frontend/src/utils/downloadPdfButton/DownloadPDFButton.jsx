import { useState } from "react";
import { Button, Spin, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

const DownloadPDFButton = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/v1/portifolio/download-pdf", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Resume@HemanthGidijala.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      message.success("Download started!");
    } catch (error) {
      console.error(error);
      message.error("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? <Spin size="small" /> : "Download PDF"}
    </Button>
  );
};

export default DownloadPDFButton;