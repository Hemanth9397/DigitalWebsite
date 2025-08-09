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
import { useSelector } from "react-redux";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useTransform,
} from "framer-motion";
import "./Portfolio.scss";

const Portfolio = ({ notify }) => {
  const [portfolioData, setPortfolioData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const isDark = useSelector((state) => state.theme.isDark);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 0.5], [0, 0]);

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
    <div className="portfolio-container pt-2 px-4 space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center">
        <div className="mx-auto h-8 w-2/3 bg-gray-300 rounded-md mb-2"></div>
        <div className="mx-auto h-4 w-1/3 bg-gray-300 rounded-md"></div>
      </div>

      {/* Social Icons Skeleton */}
      <div className="flex justify-center gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-10 w-10 bg-gray-300 rounded-full"
          ></div>
        ))}
      </div>

      {/* About Me Skeleton */}
      <div>
        <div className="h-6 w-40 bg-gray-300 rounded-md mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 rounded-md"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Projects Skeleton */}
      <div>
        <div className="h-6 w-40 bg-gray-300 rounded-md mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="p-4 space-y-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
              <div className="h-3 w-full bg-gray-300 rounded-md"></div>
              <div className="h-3 w-5/6 bg-gray-300 rounded-md"></div>
              <div className="h-3 w-1/2 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Skills Skeleton */}
      <div>
        <div className="h-6 w-40 bg-gray-300 rounded-md mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-32 bg-gray-300 rounded-md mb-2"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-6 w-20 bg-gray-300 rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume + Contact Buttons Skeleton */}
      <div className="text-center space-y-4">
        <div className="h-6 w-60 bg-gray-300 rounded-md mx-auto"></div>
        <div className="flex justify-center gap-4">
          <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}


  if (hasFetched && error) {
    return (
      <motion.div
        className="text-center p-8 text-red-400 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Unable to load portfolio</h2>
        <p className="mb-4">{error}</p>
        <button
          className="bg-primaryColor hover:bg-accent text-white px-6 py-2 rounded-full transition"
          onClick={fetchData}
        >
          Retry
        </button>
      </motion.div>
    );
  }

  if (hasFetched && _.isEmpty(portfolioData)) {
    return <EditPortfolio fetchData={fetchData} notify={notify} />;
  }

  return (
    <motion.div
      className={`portfolio-container pt-1.5 px-4 sm:px-8 ${
        isDark ? "theme-dark" : "theme-light"
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <LayoutGroup>
        <motion.section
          className="section"
          style={{ y: yParallax }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
            {[
              {
                href: "https://github.com/Hemanth9397/DigitalWebsite",
                icon: <GithubOutlined />,
                color: "#6e5494",
              },
              {
                href: "https://www.linkedin.com/in/hemanth-gidijala-34372b169/",
                icon: <LinkedinOutlined />,
                color: "#0077b5",
              },
              {
                href: "mailto:ghemanthkumar03@gmail.com",
                icon: <MailOutlined />,
                color: "#d93025",
              },
            ].map(({ href, icon, color }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social Link"
                style={{ "--color": color }}
                className="styled-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.section>

        <AnimatePresence mode="wait">
          {!isEditing && (
            <motion.section
              className="section"
              key="about"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="section-title">About Me</h2>
              <p className="centered-text">{portfolioData?.aboutMe}</p>
            </motion.section>
          )}
        </AnimatePresence>

        <motion.section
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <h2 className="section-title">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {portfolioData?.projects?.map((project, i) => (
              <motion.div
                key={i}
                className="w-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  title={project.title}
                  // extra={
                  //   <a
                  //     href={project.link}
                  //     target="_blank"
                  //     rel="noreferrer"
                  //     className="hover-text-shadow-purple"
                  //     style={{ color: isDark ? "#66ccff" : "#0077b5" }}
                  //   >
                  //     View on GitHub
                  //   </a>
                  // }
                  className="styled-card"
                  style={{
                    width: "100%",
                    backgroundColor: isDark ? "#1e2633" : "#ffffff",
                    color: isDark ? "#ffffff" : "#000000",
                  }}
                >
                  <p>{project.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">Technical Skills</h2>
          <div className="technical-skills-grid">
            {[
              "frontend",
              "backend",
              "database",
              "versionControl",
              "toolsAndUtilities",
            ].map((key) => (
              <div key={key} className="technical-skill-category">
                <h3 className="technical-skill-title">
                  {key.replace(/([A-Z])/g, " $1")}
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {portfolioData?.technicalSkills?.[key]?.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      className="skill-pill"
                      whileHover={{ scale: 1.1, rotate: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">If you want a soft copy of my Resume</h2>
          <DownloadPDFButton notify={notify} />
        </motion.section>

        <motion.section
          className="section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Let's Connect</h2>
          <p className="centered-text">
            I'm open to new opportunities and collaborations.
          </p>
          <div className="button-group">
            {[
              { label: "Call Saudi 🇸🇦", href: "tel:+966539217292" },
              { label: "Call India 🇮🇳", href: "tel:+919640777368" },
            ].map(({ label, href }, i) => (
              <motion.a
                key={i}
                href={href}
                className="button-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.section>
      </LayoutGroup>
    </motion.div>
  );
};

export default withNotification(Portfolio);
