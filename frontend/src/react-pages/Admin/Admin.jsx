import React, { useEffect, useState } from "react";
import {
  Table,
  Avatar,
  Button,
  Tag,
  message,
  Popconfirm,
  Typography,
  Empty,
} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;

const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`,
        { withCredentials: true }
      );
      setUsers(res.data);
    } catch {
      message.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users/approve/${userId}`,
        {},
        { withCredentials: true }
      );
      message.success("User approved");
      fetchUsers();
    } catch {
      message.error("Approval failed");
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users/${userId}`,
        { withCredentials: true }
      );
      message.success("User deleted");
      fetchUsers();
    } catch {
      message.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getStatusTag = (status) =>
    status === "approved" ? (
      <Tag color="green">APPROVED</Tag>
    ) : (
      <Tag color="orange">PENDING</Tag>
    );

  const getRoleTag = (role) =>
    role === "admin" ? (
      <Tag color="geekblue">ADMIN</Tag>
    ) : (
      <Tag color="default">USER</Tag>
    );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <Avatar
          size={48}
          src={`${process.env.REACT_APP_BACKEND_URL}/files/uploads/${image}`}
          alt="user"
        />
      ),
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: getStatusTag,
      responsive: ["md", "lg"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: getRoleTag,
      responsive: ["md", "lg"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {record.status === "pending" && (
            <Button
              size="small"
              type="primary"
              onClick={() => handleApprove(record._id)}
            >
              Approve
            </Button>
          )}
          {user?.role === "admin" && (
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" danger>
                Delete
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        User Management
      </Title>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 6 }}
        scroll={{ x: "max-content" }}
        bordered
        size="middle"
        locale={{
          emptyText: (
            <Empty
              description="No users to display"
              styles={{ image: { height: 60 } }}
            />
          ),
        }}
      />
    </div>
  );
};

export default Admin;
