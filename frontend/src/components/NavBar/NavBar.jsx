import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./NavBar.scss";
import styled from "styled-components";

const StyledNav = styled.nav`
  display: flex;
  justify-content: end;
  background-color: var(--secondary-color);
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: inline-block;
    margin-right: 1rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const LinkContent = styled.label`
  position: relative;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  display: inline-block;
  text-align: center;
  color: var(--text-primary);
  transition: color 0.4s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 13px;
    left: 50%;
    height: 2px;
    width: 0;
    background-color: var(--primary-color);
    transform: translateX(-50%);
    transition: width 0.4s ease, left 0.4s ease;
  }

  ${StyledNavLink}.active &::after,
  &:hover::after {
    width: 70%;
  }
`;

const NavBar = () => {
  return (
    <div>
      <StyledNav>
        <ul>
          <li>
            <StyledNavLink end
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              <LinkContent title="Home">Home</LinkContent>
            </StyledNavLink>
          </li>
        </ul>
        <ul>
          <li>
            <StyledNavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/about"
            >
              <LinkContent title="About">About</LinkContent>
            </StyledNavLink>
          </li>
        </ul>
        <ul>
          <li>
            <StyledNavLink
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/contact"
            >
              <LinkContent title="Contact">Contact</LinkContent>
            </StyledNavLink>
          </li>
        </ul>
      </StyledNav>
      <hr />
      <Outlet />
    </div>
  );
};

export default NavBar;
