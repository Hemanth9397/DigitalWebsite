// import React from "react";
// import { Card, Button, Form, Input } from "antd";

// const projects = [ { title: "MERN Ecommerce", description: "Full-featured eCommerce site using MongoDB, Express, React, Node.js.", link: "https://github.com/yourname/mern-ecommerce" }, { title: "Blog App", description: "Blog platform with user authentication, CRUD and rich text editor.", link: "https://github.com/yourname/blog-app" } ];

// const skills = [ "JavaScript", "React", "Redux", "Tailwind CSS", "Node.js", "MongoDB", "Ant Design", "Git", "REST APIs" ];

// const PortfolioPage = () => { return ( <div className="max-w-6xl mx-auto px-4 py-8"> {/* Intro */} <section className="text-center mb-12"> <h1 className="text-4xl font-bold mb-2">Hi, I'm Hemanth Gidijala</h1> <p className="text-secondaryColor text--600">Full Stack Developer | MERN | React | Tailwind CSS | Ant Design</p> </section>

// {/* About */}
//   <section className="mb-12">
//     <h2 className="text-2xl font-semibold mb-4">About Me</h2>
//     <p className="text-primaryColor">
//       Passionate developer with experience building responsive and scalable web apps. I love solving complex problems and working with modern JavaScript frameworks.
//     </p>
//   </section>

//   {/* Skills */}
//   <section className="mb-12">
//     <h2 className="text-2xl font-semibold mb-4">Skills</h2>
//     <div className="flex flex-wrap gap-2">
//       {skills.map((skill, index) => (
//         <span
//           key={index}
//           className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
//         >
//           {skill}
//         </span>
//       ))}
//     </div>
//   </section>

//   {/* Projects */}
//   <section className="mb-12">
//     <h2 className="text-2xl font-semibold mb-4">Projects</h2>
//     <div className="grid md:grid-cols-2 gap-6">
//       {projects.map((project, index) => (
//         <Card
//           key={index}
//           title={project.title}
//           bordered={false}
//           extra={<a href={project.link} target="_blank" rel="noreferrer">GitHub</a>}
//         >
//           <p>{project.description}</p>
//         </Card>
//       ))}
//     </div>
//   </section>

//   {/* Contact */}
//   <section className="mb-12">
//     <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
//     <Form
//       layout="vertical"
//       className="max-w-xl"
//       onFinish={(values) => console.log("Form Data:", values)}
//     >
//       <Form.Item name="name" label="Name" rules={[{ required: true }]}> <Input /> </Form.Item>
//       <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}> <Input /> </Form.Item>
//       <Form.Item name="message" label="Message" rules={[{ required: true }]}> <Input.TextArea rows={4} /> </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">Send</Button>
//       </Form.Item>
//     </Form>
//   </section>
// </div>

// ); };

// export default PortfolioPage;

import React from "react";
import { Card } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const projects = [
  {
    title: "MERN Ecommerce",
    description:
      "Full-featured eCommerce site using MongoDB, Express, React, Node.js.",
    link: "https://github.com/Hemanth9397/DigitalWebsite",
  },
  {
    title: "Blog App",
    description:
      "Blog platform with user authentication, CRUD and rich text editor.",
    link: "https://github.com/Hemanth9397/DigitalWebsite",
  },
];

const skills = [
  "JavaScript",
  "React",
  "Redux",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Ant Design",
  "Git",
  "REST APIs",
];

const StyledGithubIcon = styled(GithubOutlined)`
  filter: drop-shadow(0 0 2px #6e5494) drop-shadow(0 0 5px #6e5494);
`;
const StyledLinkedinIcon = styled(LinkedinOutlined)`
  filter: drop-shadow(0 0 2px #0077b5) drop-shadow(0 0 5px #0077b5);
`;
const StyledMailIcon = styled(MailOutlined)`
  filter: drop-shadow(0 0 2px #d93025) drop-shadow(0 0 5px #d93025);
`;

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background-dark text-text-primaryColor p-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primaryColor mb-4">
          Hemanth Gidijala
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Full Stack Developer passionate about building modern web applications
          with React, Node.js, and AWS.
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
          I have 5+ years of experience in software development. I specialize in
          building scalable web applications and have strong experience in both
          frontend and backend technologies including React, Redux, Node.js,
          Express, MongoDB, PostgreSQL, and AWS services like S3, Lambda, and
          CloudFront.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-6">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              title={project.title}
              bordered={false}
              extra={
                <a href={project.link} target="_blank" rel="noreferrer">
                  view on GitHub
                </a>
              }
            >
              <p>{project.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-6">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-text-secondary">
          <span>React / Redux</span>
          <span>Node.js / Express</span>
          <span>MongoDB / PostgreSQL</span>
          <span>TypeScript</span>
          <span>Tailwind CSS</span>
          <span>AWS (Lambda, S3, CloudFront)</span>
        </div>
      </section> */}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-primaryColor mb-4">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
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

export default Portfolio;
