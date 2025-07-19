import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slicers/theme/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <Switch
      checkedChildren="🌙"
      unCheckedChildren="☀️"
      checked={isDark}
      onChange={() => dispatch(toggleTheme())}
    />
  );
};

export default ThemeToggle;
