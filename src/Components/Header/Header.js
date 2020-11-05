import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { GiCyberEye } from "react-icons/gi";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <NavLink activeClassName={classes.activeLink} to="/profile">
        <GiCyberEye className={classes.logoSVG} />
        <p>MessageStar</p>
      </NavLink>
    </header>
  );
};

export default Header;
