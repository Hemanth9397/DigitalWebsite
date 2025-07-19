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
import ThemeToggle from "./ThemeToggle";
import useAuthInitializer from "../../hooks/useAuthInitializer";

const modes = ["portfolio"];

const StyledNavLink = styled(NavLink)`
  text-decoration: none;

  &.active label {
    color: var(--text-primary);
    text-shadow: 0px 0px 10px #007bff, 0px 0px 20px #007bff,
      0px 0px 30px #007bff, 0px 0px 40px #007bff;
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
        <span style={{display: "inline-flex", gap: "1.2rem", alignItems: "center"}}>
          <ThemeToggle />
          <ModeScroller modes={modes} />
        </span>
        <nav className="nav-bar">
          <ul>
            {["home", "about", "contact"].map((route) => (
              <li key={route}>
                <StyledNavLink
                  to={route}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <LinkContent>
                    <span className="nav-icon">
                      {route === "home" && String.fromCodePoint(0x1f3e0)}
                      {route === "about" && String.fromCodePoint(0x2139)}
                      {route === "contact" && String.fromCodePoint(0x1f4de)}
                    </span>
                    <span className="nav-label-text">
                      {route.charAt(0).toUpperCase() + route.slice(1)}
                    </span>
                  </LinkContent>
                </StyledNavLink>
              </li>
            ))}
          </ul>
          <div className="auth-btn">
            {user ? (
              <CustomButton onClick={handleLogout}>
                <span className="nav-icon">
                  {String.fromCodePoint(0x1f513)}
                </span>
                <span className="nav-label-text">Logout</span>
              </CustomButton>
            ) : (
              <CustomButton onClick={handleAuthClick}>
                <span className="nav-icon">
                  {String.fromCodePoint(0x1f512)}
                </span>
                <span className="nav-label-text">Authenticate</span>
              </CustomButton>
            )}
          </div>
        </nav>
      </header>

      <main className="page-container">
        {navigation.state === "loading" ? (
          <div className="spinner-wrapper">
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
