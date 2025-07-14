import React from "react";
import { useRouteError } from "react-router-dom";
import { Card, Typography, Button, Space } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ErrorPage = () => {
  const error = useRouteError();
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
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
          backgroundColor: "#141414",
          color: "#fff",
          boxShadow: "0 0 12px rgba(255, 77, 79, 0.6)",
        }}
      >
        <Space direction="vertical" size="middle">
          <WarningOutlined style={{ fontSize: "48px", color: "#ff4d4f" }} />
          <Title level={2} style={{ color: "#fff", marginBottom: 0 }}>
            Oops! Something went wrong
          </Title>
          <Text style={{ color: "#aaa" }}>
            {error?.statusText || error?.message || "Unknown error occurred."}
          </Text>

          {error?.status && (
            <Text type="danger">
              <strong>Status:</strong> {error.status}
            </Text>
          )}

          {error?.data && (
            <pre
              style={{
                background: "#2a2a2a",
                padding: "0.75rem",
                borderRadius: "6px",
                textAlign: "left",
                color: "#ddd",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <code>{JSON.stringify(error.data, null, 2)}</code>
            </pre>
          )}

          <Space size="middle">
            <Button type="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button
              type="default"
              onClick={() => navigate("/")}
              style={{ color: "#fff", borderColor: "#fff" }}
            >
              Go to Home
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default ErrorPage;
