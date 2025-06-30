import React from "react";
import { useState } from "react";
import CustomButton from "../../components/customButton/CustomButton";
import { Button, Divider, Input, Modal, notification, Space } from "antd";
import { useFormik } from "formik";
import axios from "axios";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  margin: 0 auto;
  border: none;
  color: #f0f0f0 !important;
  background-color: #161a20 !important;
  border-radius: 10px;
  position: relative;
  width: 100%;

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 102%;
    width: 101%;
    background-image: linear-gradient(#ff4545);
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: -1;
    padding: 0px;
    border-radius: 10px;
  }

  &::before {
    filter: blur(0.5rem);
    opacity: 0.5;
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
    onSubmit: submitHandler,
  });

  async function submitHandler(values) {
    const payload = {
      name: values.name,
      email: values.email,
      shortNote: values.shortNote,
      aboutMe: values.aboutMe,
      projects: values.projects,
      skills: [],
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
        onOk={formik.handleSubmit}
        title="Portfolio Details"
        onCancel={() => setShowEditPortfolio(false)}
        okText="Submit"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input {...formik.getFieldProps("name")} placeholder="Name" />
          <Input {...formik.getFieldProps("email")} placeholder="Email" />
          <Input
            {...formik.getFieldProps("skills")}
            placeholder="Skills (comma-separated)"
          />

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
                  value={project.title}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `projects[${index}].title`,
                      e.target.value
                    )
                  }
                />

                <Input
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `projects[${index}].description`,
                      e.target.value
                    )
                  }
                />

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
