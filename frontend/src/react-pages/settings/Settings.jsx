import { Card, Tabs } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import ThemeToggle from "../../components/Layout/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const Settings = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.user);

  const handleTabChange = (key) => {
    if (key === "portfolio") {
      navigate("/"); // go to Portfolio page
    }
    else if(key === "admin") {
        navigate("/admin")
    }
  };
  return (
    <div className="p-4">
      <Card
        title={
          <>
            <SettingOutlined /> Settings
          </>
        }
        style={{ maxWidth: 800, margin: "auto" }}
      >
        <Tabs defaultActiveKey="theme" onChange={handleTabChange}>
          <TabPane tab="Theme" key="theme">
            <ThemeToggle />
          </TabPane>
          <TabPane tab="Portfolio" key="portfolio"></TabPane>
          <TabPane tab="Admin" key="admin" disabled={!isLoggedIn}></TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;
