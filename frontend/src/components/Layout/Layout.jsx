import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom";
import "./layout.scss";
import styled from "styled-components";
import ModeScroller from "../modeScroller/ModeScroller";
import Spinner from "../spinner/Spinner";
import CustomButton from "../customButton/CustomButton";
import withNotification from "../../utils/notification/withNotification";
import axios from "axios";
import useAutoLogout from "../../hooks/useAutoLogout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slicers/auth/authSlice";

const modes = ["blogger", "shopping", "portfolio"];

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const LinkContent = styled.label`
  position: relative;
  font-size: 1.2rem;
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

  ${StyledNavLink}.active &::after,
  &:hover::after {
    width: 70%;
  }
`;

const Layout = ({ notify }) => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useAutoLogout(user);

  const handleAuthClick = () => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      notify({
        type: "warning",
        message: "Already authenticated",
        description: "No need to authenticate. Because, You're already logged!",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_BACKEND_URL + `/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      notify({
        type: "success",
        message: "Logout Successfully!",
        description: "You have successfully logged out.",
      });
      //navigate('/login', { replace: true });
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="root-container">
      <header className="header">
        <ModeScroller modes={modes} />
        <nav className="nav-bar">
          <ul>
            <li>
              <StyledNavLink
                to="api/v1/home"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <LinkContent>Home</LinkContent>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink
                to="api/v1/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <LinkContent>About</LinkContent>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink
                to="api/v1/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <LinkContent>Contact</LinkContent>
              </StyledNavLink>
            </li>
            <li className="flex items-center" style={{ marginRight: 0 }}>
              {user ? (
                <CustomButton onClick={handleLogout}>Logout</CustomButton>
              ) : (
                <CustomButton onClick={handleAuthClick}>
                  Authenticate
                </CustomButton>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <hr />
      <main className="page-container">
        {navigation.state === "loading" ? (
          <div
            style={{
              minHeight: "300px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Spinner />{" "}
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default withNotification(Layout);
