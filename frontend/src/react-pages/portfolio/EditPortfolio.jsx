import React from "react";
import { useState } from "react";
import CustomButton from "../../components/customButton/CustomButton";
import { Button, Divider, Input, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getIn, useFormik } from "formik";
import axios from "axios";
import styled, { createGlobalStyle, css } from "styled-components";
import FloatingLabelInput from "../../components/customInput/FloatingLabelInput";
import FloatingPlaceholderInput from "../../components/customInput/FloatingPlaceholderInput";
import { parseSkills } from "../../utils/parseSkills";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ApiCall from "../../utils/auth/apiCall";
import { useSelector } from "react-redux";

const projectSchema = Yup.object().shape({
  title: Yup.string().required("Project title is required"),
  description: Yup.string().required("Project description is required"),
  link: Yup.string()
    .url("Project link must be a valid URL")
    .required("Project link is required"),
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  shortNote: Yup.string().required("Short Note is required"),
  aboutMe: Yup.string().required("About Me is required"),
  technicalSkills: Yup.object().shape({
    frontend: Yup.array().of(Yup.string()).min(1, "Frontend skills required"),
    backend: Yup.array().of(Yup.string()).min(1, "Backend skills required"),
    database: Yup.array().of(Yup.string()).min(1, "Database skills required"),
    verisonControl: Yup.array()
      .of(Yup.string())
      .min(1, "Version control skills required"),
    toolsAndUtilities: Yup.array()
      .of(Yup.string())
      .min(1, "Tools & Utilities required"),
  }),
  projects: Yup.array()
    .of(projectSchema)
    .min(1, "At least one project is required"),
});

const ModalScrollbarGlobalStyles = createGlobalStyle`
  .ant-modal-wrap {
    overflow: auto !important;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 24px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #444;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #222;
    }

    &::-webkit-scrollbar-track {
      background: #000;
      border-radius: 4px;
    }

    scrollbar-width: thin;
    scrollbar-color: #444 #000;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    filter: drop-shadow(0 0 8px #007bff);
    box-shadow: 0 4px 20px rgba(255, 69, 69, 0.4);
    border: 1px solid #007bff;
  }
`;

const Label = styled.label`
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 4px;
  pointer-events: none;
  transition: 0.2s ease all;

  ${({ $isActive }) =>
    $isActive &&
    css`
      left: 10px;
      top: -4px;
      font-size: 16px;
      color: var(--text-primary);
      background: #28364c;
      text-shadow: 0px 0px 5px #007bff, 0px 0px 10px #007bff,
        0px 0px 15px #007bff, 0px 0px 20px #007bff;
    `}
`;

const StyledEditIcon = styled(EditOutlined)`
  color: #f0f0f0 !important;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &:hover {
    filter: drop-shadow(0 0 2px #28a745) drop-shadow(0 0 5px #28a745);
  }
`;

const EditPortfolio = ({
  notify,
  editIcon = false,
  initialValues,
  fetchData,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [showEditPortfolio, setShowEditPortfolio] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      shortNote: initialValues?.shortNote || "",
      aboutMe: initialValues?.aboutMe || "",
      projects: initialValues?.projects || [
        { title: "", description: "", link: "" },
      ],
      technicalSkills: {
        frontend: initialValues?.technicalSkills?.frontend || "",
        backend: initialValues?.technicalSkills?.backend || "",
        database: initialValues?.technicalSkills?.database || "",
        verisonControl: initialValues?.technicalSkills?.verisonControl || "",
        toolsAndUtilities:
          initialValues?.technicalSkills?.toolsAndUtilities || "",
      },
    },
    validationSchema: validationSchema,
    onSubmit: submitHandler,
    validateOnMount: true,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  //Extract helper:

  const getFieldError = (name) =>
    getIn(formik.touched, name) && getIn(formik.errors, name)
      ? getIn(formik.errors, name)
      : null;

  async function submitHandler(values) {
    const payload = {
      ...values,
      technicalSkills: {
        ...values.technicalSkills,
        frontend: parseSkills(values?.technicalSkills?.frontend),
        backend: parseSkills(values?.technicalSkills?.backend),
        database: parseSkills(values?.technicalSkills?.database),
        verisonControl: parseSkills(values?.technicalSkills?.verisonControl),
        toolsAndUtilities: parseSkills(
          values?.technicalSkills?.toolsAndUtilities
        ),
      },
    };

    try {
      await axios.post(`${ApiCall}/portfolio`, payload, {
        withCredentials: true, // ✅ Send cookie (JWT) with request
      });
      notify({
        type: "success",
        message: "Portfolio Submitted",
        description: "Your portfolio has been saved to the database.",
      });
      setShowEditPortfolio(false);
      formik.resetForm();
    } catch (err) {
      notify({
        type: "error",
        message: "Error Occured",
        description: "Failed to save portfolio. Please try again.",
      });
    }
  }

  //scroll to first error
  const scrollToFirstError = () => {
    const errorKeys = Object.keys(formik.errors);
    if (errorKeys.length > 0) {
      const firstErrorField = document.querySelector(
        `[name="${errorKeys[0]}"]`
      );
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
    }
  };

  // Add empty project
  const addProject = () => {
    formik.setFieldValue("projects", [
      ...formik.values.projects,
      {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  // Remove project by index
  const removeProject = (indexToRemove) => {
    const filtered = formik.values.projects.filter(
      (_, idx) => idx !== indexToRemove
    );
    formik.setFieldValue("projects", filtered);
  };

  return (
    <>
      {editIcon ? (
        <StyledEditIcon
          className="hover:scale-125 transition-transform duration-300 ease-in-out ml-4"
          onClick={() => setShowEditPortfolio(true)}
        />
      ) : (
        <CustomButton onClick={() => setShowEditPortfolio(true)}>
          Add Portfolio
        </CustomButton>
      )}
      <ModalScrollbarGlobalStyles />
      <StyledModal
        open={showEditPortfolio}
        onOk={async () => {
          if (!user) {
            notify({
              type: "warning",
              message: "You're not authorised.",
              description: "Please, login for modify the portfolio..!",
            });
            setTimeout(() => {
              navigate("/login", { replace: true });
            }, 2000);
            return;
          }
          await formik.submitForm(); // await is required
          scrollToFirstError(); // will now detect errors correctly
          fetchData();
        }}
        okButtonProps={{ disabled: !formik.isValid }}
        title="Portfolio Details"
        onCancel={() => {
          setShowEditPortfolio(false);
          formik.resetForm();
        }}
        okText="Submit"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <FloatingLabelInput
            name="name"
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
            onBlur={formik.handleBlur}
            label="Name"
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "#e74c3c", fontSize: 12 }}>
              {formik.errors.name}
            </div>
          )}
          <FloatingLabelInput
            name="email"
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue("email", e.target.value)}
            onBlur={formik.handleBlur}
            label="Email"
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "#e74c3c", fontSize: 12 }}>
              {formik.errors.email}
            </div>
          )}

          <Label>Technical Skills</Label>
          <FloatingPlaceholderInput
            name="technicalSkills.frontend"
            value={formik.values.technicalSkills.frontend}
            onChange={(e) =>
              formik.setFieldValue("technicalSkills.frontend", e.target.value)
            }
            onError={getFieldError("technicalSkills.frontend")}
            onBlur={formik.handleBlur}
            placeholder="Frontend"
          />

          <FloatingPlaceholderInput
            name="technicalSkills.backend"
            value={formik.values.technicalSkills.backend}
            onChange={(e) =>
              formik.setFieldValue("technicalSkills.backend", e.target.value)
            }
            onError={getFieldError("technicalSkills.backend")}
            onBlur={formik.handleBlur}
            placeholder="Backend"
          />

          <FloatingPlaceholderInput
            name="technicalSkills.database"
            value={formik.values.technicalSkills.database}
            onChange={(e) =>
              formik.setFieldValue("technicalSkills.database", e.target.value)
            }
            onError={getFieldError("technicalSkills.database")}
            onBlur={formik.handleBlur}
            placeholder="Database"
          />

          <FloatingPlaceholderInput
            name="technicalSkills.verisonControl"
            value={formik.values.technicalSkills.verisonControl}
            onChange={(e) =>
              formik.setFieldValue(
                "technicalSkills.verisonControl",
                e.target.value
              )
            }
            onError={getFieldError("technicalSkills.verisonControl")}
            onBlur={formik.handleBlur}
            placeholder="Verison Control"
          />
          <FloatingPlaceholderInput
            name="technicalSkills.toolsAndUtilities"
            value={formik.values.technicalSkills.toolsAndUtilities}
            onChange={(e) =>
              formik.setFieldValue(
                "technicalSkills.toolsAndUtilities",
                e.target.value
              )
            }
            onError={getFieldError("technicalSkills.toolsAndUtilities")}
            onBlur={formik.handleBlur}
            placeholder="Tools & Utilities"
          />

          <FloatingLabelInput
            name="shortNote"
            value={formik.values.shortNote}
            onChange={(e) => formik.setFieldValue("shortNote", e.target.value)}
            onBlur={formik.handleBlur}
            label="Short Note"
            textarea
            autoSize={{ minRows: 2, maxRows: 8 }}
          />
          {formik.touched.shortNote && formik.errors.shortNote && (
            <div style={{ color: "#e74c3c", fontSize: 12 }}>
              {formik.errors.shortNote}
            </div>
          )}
          <FloatingLabelInput
            name="aboutMe"
            value={formik.values.aboutMe}
            onChange={(e) => formik.setFieldValue("aboutMe", e.target.value)}
            onBlur={formik.handleBlur}
            label="About Me"
            textarea
            autoSize={{ minRows: 2, maxRows: 8 }}
          />
          {formik.touched.aboutMe && formik.errors.aboutMe && (
            <div style={{ color: "#e74c3c", fontSize: 12 }}>
              {formik.errors.aboutMe}
            </div>
          )}

          <Divider orientation="left">Projects</Divider>

          {formik.values.projects &&
            formik.values.projects.length > 0 &&
            formik.values.projects?.map((project, index) => (
              <Space
                key={index}
                direction="vertical"
                style={{
                  width: "100%",
                  border: "1px solid #eee",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <Input
                  placeholder="Project Title"
                  name={`projects[${index}].title`}
                  value={project.title}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `projects[${index}].title`,
                      e.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.projects?.[index]?.title && (
                  <div style={{ color: "#e74c3c", fontSize: 12 }}>
                    {formik.errors.projects[index].title}
                  </div>
                )}

                <Input
                  placeholder="Project Description"
                  name={`projects[${index}].description`}
                  value={project.description}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `projects[${index}].description`,
                      e.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.projects?.[index]?.description && (
                  <div style={{ color: "#e74c3c", fontSize: 12 }}>
                    {formik.errors.projects[index].description}
                  </div>
                )}
                <Input
                  placeholder="Project Link"
                  name={`projects[${index}].link`}
                  value={project.link}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `projects[${index}].link`,
                      e.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.projects?.[index]?.link && (
                  <div style={{ color: "#e74c3c", fontSize: 12 }}>
                    {formik.errors.projects[index].link}
                  </div>
                )}

                {formik.values.projects.length > 1 && (
                  <Button danger onClick={() => removeProject(index)}>
                    Remove Project
                  </Button>
                )}
              </Space>
            ))}

          <Button onClick={addProject} type="dashed">
            + Add Another Project
          </Button>
        </Space>
      </StyledModal>
    </>
  );
};

export default EditPortfolio;
