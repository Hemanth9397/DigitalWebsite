import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./NavBar.scss";
import styled from "styled-components";
import { Button, Typography } from "antd";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: var(--secondary-color);

  & .title {
    margin: 0 0.4rem;
    display: grid;
    place-items: center;
  }

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
  padding: 1rem 0.5rem;
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
        <Typography.Title level={4} className="title">Digital-Blogger-Page</Typography.Title>
        <ul>
          <li>
            <StyledNavLink
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              <LinkContent title="Home">Home</LinkContent>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/about"
            >
              <LinkContent title="About">About</LinkContent>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/contact"
            >
              <LinkContent title="Contact">Contact</LinkContent>
            </StyledNavLink>
          </li>
          <li>
            <Button>Login</Button>
          </li>
        </ul>
      </StyledNav>
      <hr />
      <Outlet />
    </div>
  );
};

export default NavBar;
