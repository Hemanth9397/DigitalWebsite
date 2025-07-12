import { Card, Skeleton } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import DownloadPDFButton from "../../components/downloadPdfButton/DownloadPDFButton";
import withNotification from "../../utils/notification/withNotification";
import EditPortfolio from "./EditPortfolio";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const StyledGithubIcon = styled(GithubOutlined)`
  color: #f0f0f0 !important;
  filter: drop-shadow(0 0 2px #6e5494) drop-shadow(0 0 5px #6e5494);
`;
const StyledLinkedinIcon = styled(LinkedinOutlined)`
  color: #f0f0f0 !important;
  filter: drop-shadow(0 0 2px #0077b5) drop-shadow(0 0 5px #0077b5);
`;
const StyledMailIcon = styled(MailOutlined)`
  color: #f0f0f0 !important;
  filter: drop-shadow(0 0 2px #d93025) drop-shadow(0 0 5px #d93025);
`;

const StyledCard = styled(Card)`
  margin: 0 auto;
  border: none;
  color: #f0f0f0 !important;
  background-color: #161a20 !important;
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 100%;

  .ant-card-head-title {
    color: #f0f0f0 !important;
  }

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

const StyledSpan = styled.span`
  padding: 0.2em 0.8em;
  background-color: #161a20;
  border: none;
  color: #f0f0f0;
  border-radius: 1000px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0; /* replaces width/height + top/left */
    border-radius: inherit;
    background-image: linear-gradient(90deg, #ff4545, #ff7b54);
    z-index: -1;
    transform: scale(1.05); /* slight oversize */
  }
`;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.span`
  min-width: 70px;
  font-weight: 500;
  font-size: 24px;
  text-decoration: underline #ff4545;
  display: inline-block;
  margin-right: 8px;
`;


const Portfolio = ({ notify }) => {
  const [{ portfolioData, isLoading, hasFetched }, setPortfolioData] = useState({
    portfolioData: {},
    isLoading: false,
    hasFetched: false
  });

  const fetchData = useCallback(async()=>{
    setPortfolioData((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const res = await axios.get(process.env.REACT_APP_BACKEND_URL + `/portfolio`, {withCredentials: true});
      setPortfolioData((prevState) => ({
        ...prevState,
        portfolioData: res?.data || {},
        isLoading: false,
        hasFetched: true
      }));
    } catch (err) {
      setPortfolioData((prevState) => ({ ...prevState, isLoading: false,  hasFetched: true}));
      notify({
        type: "error",
        message: err.message,
        description: "Unable to get the portfolio details. Try later",
      });
    }
  },[setPortfolioData, notify]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return isLoading ? (
    <div className="space-y-12">
      {/* Header section skeleton */}
      <Skeleton
        active
        title={{ width: 200 }}
        paragraph={{ rows: 2, width: ["60%", "80%"] }}
      />

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mt-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton.Avatar key={index} active shape="circle" size="large" />
        ))}
      </div>

      {/* About Me section skeleton */}
      <div>
        <Skeleton active title={{ width: 150 }} paragraph={{ rows: 3 }} />
      </div>

      {/* Projects section skeleton */}
      <div>
        <Skeleton active title={{ width: 150 }} />
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {[...Array(2)].map((_, index) => (
            <Skeleton.Input key={index} active style={{ height: 120 }} block />
          ))}
        </div>
      </div>

      {/* Skills section skeleton */}
      <div>
        <Skeleton active title={{ width: 150 }} paragraph={false} />
        <div className="flex flex-wrap gap-2 mt-4">
          {[...Array(8)].map((_, index) => (
            <Skeleton.Button key={index} active size="small" shape="round" />
          ))}
        </div>
      </div>

      {/* Resume button */}
      <div className="flex gap-4 items-center">
        <Skeleton.Input active style={{ width: 300 }} />
        <Skeleton.Button active shape="round" />
      </div>

      {/* Contact section */}
      <Skeleton
        active
        title={{ width: 150 }}
        paragraph={{ rows: 2, width: ["70%", "50%"] }}
      />
      <div className="text-center">
        <Skeleton.Button
          active
          style={{ width: 160, height: 48 }}
          shape="round"
        />
      </div>
    </div>
  ) : hasFetched && !_.isEmpty(portfolioData) ? (
    <div>
      <section className="text-center mb-12">
        <span>
          <h1
            style={{ display: "inline" }}
            className="text-4xl font-bold text-primaryColor"
          >
            {portfolioData?.name}
          </h1>
          <EditPortfolio
            initialValues={portfolioData}
            fetchData={fetchData}
            notify={notify}
            editIcon
          />
        </span>
        <p className="text-text-secondary max-w-2xl mx-auto mt-4">
          {portfolioData?.shortNote}
        </p>
        <div className="flex justify-center gap-6 mt-4 text-2xl">
          <a
            href="https://github.com/Hemanth9397/DigitalWebsite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledGithubIcon className="hover:scale-125 transition-transform duration-300 ease-in-out" />
          </a>
          <a
            href="https://www.linkedin.com/in/hemanth-gidijala-34372b169/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledLinkedinIcon className="hover:scale-125 transition-transform duration-300 ease-in-out" />
          </a>
          <a href="mailto:ghemanthkumar03@gmail.com">
            <StyledMailIcon className="hover:scale-125 transition-transform duration-300 ease-in-out" />
          </a>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-6">
          About Me
        </h2>
        <p>{portfolioData?.aboutMe}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-6">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData?.projects.map((project, index) => (
            <StyledCard
              key={index}
              title={project.title}
              extra={
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-text-shadow-purple"
                >
                  view on GitHub
                </a>
              }
            >
              <p>{project.description}</p>
            </StyledCard>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-4">
          Technical Skills
        </h2>
      <Wrapper>
        <Label>Frontend</Label> {" :"}
        <div className="flex flex-wrap gap-2 ml-2">
          {portfolioData?.technicalSkills?.frontend.map((skill, index) => (
            <StyledSpan key={index}>{skill}</StyledSpan>
          ))}
        </div>
        </Wrapper>
        <Wrapper>
        <Label>Backend</Label> {" :"}
        <div className="flex flex-wrap gap-2 ml-2">
          {portfolioData?.technicalSkills?.backend.map((skill, index) => (
            <StyledSpan key={index}>{skill}</StyledSpan>
          ))}
        </div>
        </Wrapper>
        <Wrapper>
        <Label>Database</Label> {" :"}
        <div className="flex flex-wrap gap-2 ml-2">
          {portfolioData?.technicalSkills?.database.map((skill, index) => (
            <StyledSpan key={index}>{skill}</StyledSpan>
          ))}
        </div>
        </Wrapper>
        <Wrapper>
        <Label>Verison Control</Label> {" :"}
        <div className="flex flex-wrap gap-2 ml-2">
          {portfolioData?.technicalSkills?.verisonControl.map((skill, index) => (
            <StyledSpan key={index}>{skill}</StyledSpan>
          ))}
        </div>
        </Wrapper>
        <Wrapper>
        <Label>Tools & Utilities</Label> {" :"}
        <div className="flex flex-wrap gap-2 ml-2">
          {portfolioData?.technicalSkills?.toolsAndUtilities.map((skill, index) => (
            <StyledSpan key={index}>{skill}</StyledSpan>
          ))}
        </div>
        </Wrapper>
      </section>

      <section className="mb-12 flex items-center gap-8">
        <h2 className="text-2xl font-semibold text-primaryColor">
          If you want the Soft copy of Resume.? (Please click on the Download
          PDF...📥📑)
        </h2>
        <DownloadPDFButton notify={notify} />
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-primaryColor mb-4">
          Let's Connect
        </h2>
        <p className="text-text-secondary mb-2">
          I'm open to new opportunities and collaborations.
        </p>
        <a
          href="mailto:ghemanthkumar03@gmail.com"
          className="inline-block mt-2 px-6 py-3 bg-primaryColor text-white rounded-full hover:bg-accent transition"
        >
          Contact Me
        </a>
      </section>
    </div>
  ) : hasFetched && _.isEmpty(portfolioData) ? (
    <EditPortfolio fetchData={fetchData} notify={notify} />
  ) : null;
};

export default withNotification(Portfolio);
