import React from "react";
import { Card, Typography, Button, Space } from "antd";
import { HourglassOutlined } from "@ant-design/icons"; // Icon for loading
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#1f1f1f",
        padding: "1rem",
      }}
    >
      <Card
        style={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          backgroundColor: "#141414",
          color: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <Space direction="vertical" size="middle">
          <HourglassOutlined style={{ fontSize: "48px", color: "#fa8c16" }} />
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            Coming Soon
          </Title>
          <Text style={{ color: "#aaa" }}>
            I'm working hard to bring this section to you. Stay tuned!
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/")}
            style={{ borderRadius: 6 }}
          >
            Go to Portfolio
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default ComingSoon;
