import React from "react";
import classes from './Header.module.css';
import logo from "./../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <NavLink activeClassName={classes.activeLink} to="/profile">
      <div >
        <img className={classes.logoImg} src={logo} alt='Logo'/>
        <div >BOOMERANGmassege</div>
      </div>
      </NavLink>
      
      
    </header>
  );
};

export default Header