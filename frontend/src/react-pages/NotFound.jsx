import React from "react";
import { Card, Typography, Button, Space } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const NotFound = () => {
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
        bordered={false}
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
          <FrownOutlined style={{ fontSize: "48px", color: "#ff4d4f" }} />
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            404 - Page Not Found
          </Title>
          <Text style={{ color: "#aaa" }}>
            The page you're looking for doesn't exist or has been moved.
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/")}
            style={{ borderRadius: 6 }}
          >
            Go to Home
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default NotFound;
