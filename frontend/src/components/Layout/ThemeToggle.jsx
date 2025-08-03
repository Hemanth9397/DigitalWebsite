import { Switch, Tooltip, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slicers/theme/themeSlice";

const { Text } = Typography;

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);
  const isLoggedIn = useSelector((state) => state.auth.user)

  const tooltipMessage = isLoggedIn
    ? null
    : "You're not authorized to change the theme";

  return (
    
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Tooltip title={tooltipMessage} placement="top">
      <Switch
        disabled={!isLoggedIn}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
        checked={isDark}
        onChange={() => dispatch(toggleTheme())}
      />
      </Tooltip>
      <Text type="secondary" style={{ fontSize: "1rem" }}>
        {isDark ? "Dark Theme" : "Light Theme"}
      </Text>
    </div>
  );
};

export default ThemeToggle;
