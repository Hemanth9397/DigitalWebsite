import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import "./layout.scss";
import ModeScroller from "../modeScroller/ModeScroller";
import Spinner from "../spinner/Spinner";
import CustomButton from "../customButton/CustomButton";
import withNotification from "../../utils/notification/withNotification";
import axios from "axios";
import useAutoLogout from "../../hooks/useAutoLogout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slicers/auth/authSlice";
import useAuthInitializer from "../../hooks/useAuthInitializer";

import {
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  LockOutlined,
  UnlockOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const modes = ["portfolio"];

const StyledNavLink = styled(NavLink)`
  text-decoration: none;

  &.active label {
    color: var(--text-primary);
    text-shadow: 0 0 10px #007bff, 0 0 20px #007bff, 0 0 30px #007bff;
  }
`;

const LinkContent = styled.label`
  position: relative;
  font-size: clamp(0.9rem, 1vw + 0.5rem, 1.2rem);
  padding: 0.75rem 0.5rem;
  color: var(--nav-label-color);
  transition: color 0.4s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 50%;
    height: 2px;
    width: 0;
    background-color: var(--nav-active-color);
    transform: translateX(-50%);
    transition: width 0.4s ease;
  }

  ${StyledNavLink}:hover &::after,
  ${StyledNavLink}.active &::after {
    width: 70%;
  }
`;

const Layout = ({ notify }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useAuthInitializer();
  useAutoLogout(user);

  const handleAuthClick = () => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      notify({
        type: "warning",
        message: "Already authenticated",
        description: "You're already logged in.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      notify({
        type: "success",
        message: "Logout Successful!",
        description: "You have successfully logged out.",
      });
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="root-container">
      <header className="header">
        <div className="left-header">
          <StyledNavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
            aria-label="Settings"
          >
            <LinkContent>
              <SettingOutlined className="nav-icon" />
            </LinkContent>
          </StyledNavLink>

          <ModeScroller modes={modes} />
        </div>

        <nav
          className="nav-bar"
          role="navigation"
          aria-label="Primary Navigation"
        >
          <ul>
            <li>
              <StyledNavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <LinkContent>
                  <HomeOutlined className="nav-icon" />
                  <span className="nav-label-text">Home</span>
                </LinkContent>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <LinkContent>
                  <InfoCircleOutlined className="nav-icon" />
                  <span className="nav-label-text">About</span>
                </LinkContent>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <LinkContent>
                  <PhoneOutlined className="nav-icon" />
                  <span className="nav-label-text">Contact</span>
                </LinkContent>
              </StyledNavLink>
            </li>
          </ul>

          <div className="auth-btn">
            {user ? (
              <CustomButton onClick={handleLogout}>
                <UnlockOutlined className="nav-icon" />
                <span className="nav-label-text">Logout</span>
              </CustomButton>
            ) : (
              <CustomButton onClick={handleAuthClick}>
                <LockOutlined className="nav-icon" />
                <span className="nav-label-text">Authenticate</span>
              </CustomButton>
            )}
          </div>
        </nav>
      </header>

      <main className="page-container" role="main">
        {navigation.state === "loading" ? (
          <div className="spinner-wrapper" aria-busy="true" aria-live="polite">
            <Spinner />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default withNotification(Layout);
