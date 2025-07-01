import React from "react";
import { useState } from "react";
import CustomButton from "../../components/customButton/CustomButton";
import { Button, Divider, Input, Modal, notification, Space } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import styled from "styled-components";
import FloatingLabelInput from "../../components/customInput/FloatingLabelInput";
import { parseSkills } from "../../utils/parseSkills";
import * as Yup from "yup";

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
  skills: Yup.string()
    .required("At least one skill is required")
    .test("nonEmpty", "Please enter at least one skill", (value) => {
      return (
        Array.isArray(value?.split(",")) &&
        value.split(",").filter((s) => s.trim() !== "").length > 0
      );
    }),
  projects: Yup.array()
    .of(projectSchema)
    .min(1, "At least one project is required"),
});

const StyledModal = styled(Modal)`
  .ant-modal-content {
    filter: drop-shadow(0 0 8px #007bff);
    box-shadow: 0 4px 20px rgba(255, 69, 69, 0.4);
    border: 1px solid #007bff;
  }
`;

const initialValues = {
  name: "",
  email: "",
  shortNote: "",
  aboutMe: "",
  projects: [
    {
      title: "",
      description: "",
      link: "",
    },
  ],
  skills: "",
};

const EditPortfolio = () => {
  const [showEditPortfolio, setShowEditPortfolio] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: submitHandler,
    validateOnMount: true,
    validateOnBlur: true,
  });

  async function submitHandler(values) {
    const payload = {
      ...values,
      skills: parseSkills(values.skills),
    };

    try {
      await axios.post("https://localhost:5000/api/v1/portfolio", payload);
      notification({
        type: "success",
        message: "Portfolio Submitted",
        description: "Your portfolio has been saved to the database.",
      });
      setShowEditPortfolio(false);
      formik.resetForm();
    } catch (err) {
      notification({
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
      <CustomButton onClick={() => setShowEditPortfolio(true)}>
        Edit Portfolio
      </CustomButton>
      <StyledModal
        open={showEditPortfolio}
        onOk={async () => {
          await formik.submitForm(); // await is required
          scrollToFirstError(); // will now detect errors correctly
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
            //onBlur={() => formik.setFieldTouched("name", true)}
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
            //onBlur={() => formik.setFieldTouched("email", true)}
            label="Email"
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "#e74c3c", fontSize: 12 }}>
              {formik.errors.email}
            </div>
          )}
          <FloatingLabelInput
            name="skills"
            value={formik.values.skills}
            onChange={(e) => formik.setFieldValue("skills", e.target.value)}
            //onBlur={() => formik.setFieldTouched("skills", true)}
            label="Skills (comma-separated)"
          />
          {formik.touched.skills && formik.errors.skills && (
            <div style={{ color: "#e74c3c", fontSize: 12 }}>
              {formik.errors.skills}
            </div>
          )}
          <FloatingLabelInput
            name="shortNote"
            value={formik.values.shortNote}
            onChange={(e) => formik.setFieldValue("shortNote", e.target.value)}
            //onBlur={() => formik.setFieldTouched("shortNote", true)}
            label="Short Note"
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
            //onBlur={() => formik.setFieldTouched("aboutMe", true)}
            label="About Me"
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
                  //onBlur={() => formik.setFieldTouched(`projects[${index}].title`, true)}
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
                  //onBlur={() => formik.setFieldTouched(`projects[${index}].description`, true)}
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
                  //onBlur={() => formik.setFieldTouched(`projects[${index}].link`, true)}
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
