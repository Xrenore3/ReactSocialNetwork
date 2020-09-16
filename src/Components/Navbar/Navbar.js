import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink activeClassName={classes.activeLink} to="/profile">
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink activeClassName={classes.activeLink} to="/dialogs">
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink activeClassName={classes.activeLink} to="/users">
          Users
        </NavLink>
      </div>
      {/* <div className={classes.item}>
        <a>Music</a>
      </div>
      <div className={classes.item}>
        <a>Setting</a>
      </div> */}

    </nav>
  );
};
export default Navbar;
