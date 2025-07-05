import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom";
import "./layout.scss";
import styled from "styled-components";
import ModeScroller from "../modeScroller/ModeScroller";
import Spinner from "../spinner/Spinner";
import CustomButton from "../customButton/CustomButton";
import { isLoggedIn } from "../../utils/auth/isLoggedIn";



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

const Layout = () => {

  const navigation = useNavigation();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (!isLoggedIn()) {
      navigate("/login");
    } else {
      alert("You are already logged in.");
      // or navigate to dashboard/profile
    }
  };
  return (
    <div>
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
            <li className="flex items-center" style={{marginRight: 0}}>
              <CustomButton onClick={handleAuthClick}>Authenticate</CustomButton>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
      <main className="page-container">
       {navigation.state === "loading" ? <Spinner/> : <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
