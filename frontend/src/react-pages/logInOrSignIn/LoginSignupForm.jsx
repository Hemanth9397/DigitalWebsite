import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Upload, message } from "antd";
import withNotification from "../../utils/notification/withNotification";
import { useDispatch } from "react-redux";
import { login } from "../../slicers/auth/authSlice";
import axios from "axios";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    filter: drop-shadow(0 0 8px #007bff);
    box-shadow: 0 4px 20px rgba(255, 69, 69, 0.4);
    border: 1px solid #007bff;
    background-color: #1e1e1e;
    color: #f0f0f0;
  }
`;

function LoginSignupForm({ notify, isLogin: isLoginProp = true }) {
  const [isLogin, setIsLogin] = useState(isLoginProp);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const signupSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
    image: Yup.mixed().required("Profile image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      image: null,
    },
    validationSchema: isLogin ? loginSchema : signupSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        if (!isLogin) {
          formData.append("name", values.name);
          formData.append("image", selectedImage);
        }

        const endpoint = isLogin ? "/api/v1/login" : "/api/v1/signup";
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL + `${endpoint}`, formData, {
          withCredentials: true, // ✅ Send cookie (JWT) with request
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        resetForm();
        notify({
          type: "success",
          message: res.data.message,
          description: isLogin ? "Successful Login." : "Successful Signup.",
        });
        isLogin && dispatch(login(res.data.user));
        isLogin
          ? navigate("/portfolio", { replace: true })
          : setIsLogin(true);
      } catch (err) {
        const msg = err.response?.data?.message || "Something went wrong";
        if (msg === "Email already exists.") {
          formik.setFieldError("email", msg);
        } else {
          notify({
            type: "error",
            message: msg,
            description: msg,
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <StyledModal
      open={true}
      footer={null}
      onCancel={() => {
        navigate("/");
        formik.resetForm();
      }}
    >
      <div className="space-y-4">
        <Typography.Title
          level={3}
          style={{ textAlign: "center", color: "#007bff" }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Typography.Title>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full p-2 border rounded text-primaryColor"
              />
              {formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full p-2 border rounded text-primaryColor"
            />
            {formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full p-2 border rounded text-primaryColor"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeInvisibleOutlined className="hover:text-primaryColor" />
              ) : (
                <EyeOutlined className="hover:text-primaryColor" />
              )}
            </span>
          </div>
          {formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}

          {!isLogin && (
            <div className="max-w-[130px] mx-auto">
              <Upload
                name="image"
                listType="picture-card"
                showUploadList={false}
                accept="image/*"
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    message.error("You can only upload image files!");
                    return false;
                  }
                  setSelectedImage(file);
                  formik.setFieldValue("image", file);
                  const reader = new FileReader();
                  reader.onload = () => {
                    setImagePreview(reader.result);
                  };
                  reader.readAsDataURL(file);
                  return false;
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8, color: "#ccc" }}>Upload</div>
                  </div>
                )}
              </Upload>
              {formik.errors.image && (
                <div className="text-red-500 text-sm">
                  {formik.errors.image}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              formik.resetForm();
              navigate(`/${isLogin ? "signUp" : "login"}`);
            }}
            className="text-blue-500 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </StyledModal>
  );
}

export default withNotification(LoginSignupForm);
