import { Card } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import DownloadPDFButton from "../../utils/downloadPdfButton/DownloadPDFButton";

const StyledGithubIcon = styled(GithubOutlined)`
  filter: drop-shadow(0 0 2px #6e5494) drop-shadow(0 0 5px #6e5494);
`;
const StyledLinkedinIcon = styled(LinkedinOutlined)`
  filter: drop-shadow(0 0 2px #0077b5) drop-shadow(0 0 5px #0077b5);
`;
const StyledMailIcon = styled(MailOutlined)`
  filter: drop-shadow(0 0 2px #d93025) drop-shadow(0 0 5px #d93025);
`;

const Portifolio = () => {

  const portifolioData = useLoaderData();
  console.log("portifolioData: ", portifolioData);
  return (
    <div className="min-h-screen bg-background-dark text-text-primaryColor p-6">
           <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primaryColor mb-4">
          {portifolioData?.name}
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          {portifolioData?.shortNote}
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
        <p>
         {portifolioData?.aboutMe}
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-6">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {portifolioData?.projects.map((project, index) => (
            <Card 
              className="bg-blue-100 text-blue-800 text-sm font-medium"
              key={index}
              title={project.title}
              extra={
                <a href={project.link} target="_blank" rel="noreferrer" className="hover-text-shadow-purple" >
                  view on GitHub
                </a>
              }
            >
              <p>{project.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {portifolioData?.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12 flex items-center gap-8">
        <h2 className="text-2xl font-semibold text-primaryColor">
          If you want the Soft copy of Resume.? (Please click on the Download PDF Button...📥📑)
        </h2>
        <DownloadPDFButton/>
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
  );
};

export default Portifolio;
