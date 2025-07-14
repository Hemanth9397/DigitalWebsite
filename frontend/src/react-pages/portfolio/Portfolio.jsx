import React, { useCallback, useEffect, useState } from "react";
import { Card, Skeleton } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import DownloadPDFButton from "../../components/downloadPdfButton/DownloadPDFButton";
import withNotification from "../../utils/notification/withNotification";
import EditPortfolio from "./EditPortfolio";
import _ from "lodash";
import axios from "axios";
import "./Portfolio.scss";

const Portfolio = ({ notify }) => {
  const [portfolioData, setPortfolioData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/api/v1/portfolio`,
        { withCredentials: true }
      );
      setPortfolioData(res?.data || {});
      setHasFetched(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setHasFetched(true);
      notify({
        type: "error",
        message: "Failed to Load Portfolio",
        description: "Unable to get portfolio details. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="space-y-12">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (hasFetched && error) {
    return (
      <div className="text-center p-8 text-red-400">
        <h2 className="text-2xl font-bold mb-4">Unable to load portfolio</h2>
        <p className="mb-4">{error}</p>
        <button
          className="bg-primaryColor hover:bg-accent text-white px-6 py-2 rounded-full transition"
          onClick={fetchData}
        >
          Retry
        </button>
      </div>
    );
  }

  if (hasFetched && _.isEmpty(portfolioData)) {
    return <EditPortfolio fetchData={fetchData} notify={notify} />;
  }

  return (
    <div style={{ padding: "2rem 1rem" }}>
      <section className="section">
        <h1 className="text-5xl font-extrabold text-center text-primaryColor mb-4">
          {portfolioData?.name}
          <EditPortfolio
            initialValues={portfolioData}
            fetchData={fetchData}
            notify={notify}
            editIcon
          />
        </h1>
        <p className="centered-text">{portfolioData?.shortNote}</p>

        <div className="social-icons-wrapper">
          <a
            href="https://github.com/Hemanth9397/DigitalWebsite"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ "--color": "#6e5494" }}
            className="styled-icon"
          >
            <GithubOutlined />
          </a>
          <a
            href="https://www.linkedin.com/in/hemanth-gidijala-34372b169/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ "--color": "#0077b5" }}
            className="styled-icon"
          >
            <LinkedinOutlined />
          </a>
          <a
            href="mailto:ghemanthkumar03@gmail.com"
            aria-label="Email"
            style={{ "--color": "#d93025" }}
            className="styled-icon"
          >
            <MailOutlined />
          </a>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">About Me</h2>
        <p className="centered-text">{portfolioData?.aboutMe}</p>
      </section>

      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData?.projects?.map((project, i) => (
            <Card
              key={i}
              title={project.title}
              extra={
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-text-shadow-purple"
                >
                  View on GitHub
                </a>
              }
              className="styled-card"
            >
              <p>{project.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Technical Skills</h2>
        <div className="technical-skills-grid">
          {[
            {
              label: "Frontend",
              skills: portfolioData?.technicalSkills?.frontend,
            },
            {
              label: "Backend",
              skills: portfolioData?.technicalSkills?.backend,
            },
            {
              label: "Database",
              skills: portfolioData?.technicalSkills?.database,
            },
            {
              label: "Version Control",
              skills: portfolioData?.technicalSkills?.versionControl,
            },
            {
              label: "Tools & Utilities",
              skills: portfolioData?.technicalSkills?.toolsAndUtilities,
            },
          ].map(({ label, skills }) => (
            <div key={label} className="technical-skill-category">
              <h3 className="technical-skill-title">{label}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {skills?.map((skill, idx) => (
                  <span key={idx} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section flex flex-col items-center gap-6">
        <h2 className="section-title">If you want a soft copy of my Resume</h2>
        <DownloadPDFButton notify={notify} />
      </section>

      <section className="section">
        <h2 className="section-title">Let's Connect</h2>
        <p className="centered-text">I'm open to new opportunities and collaborations.</p>

        <div className="button-group">
          <a
            href="tel:+966539217292"
            aria-label="Call Saudi Arabia Number"
            className="button-link"
          >
            Call Saudi 🇸🇦
          </a>
          <a
            href="tel:+919640777368"
            aria-label="Call India Number"
            className="button-link"
          >
            Call India 🇮🇳
          </a>
        </div>
      </section>
    </div>
  );
};

export default withNotification(Portfolio);
