import React from "react";
import classes from './Header.module.css';
import logo from "./../../assets/images/logo.svg";

const Header = (props) => {
  return (
    <header className={classes.header}>
      
      <div className={classes.logoBlock}>
        <img className={classes.logoImg} src={logo} />
        <span>MessageMe</span>
      </div>
      
    </header>
  );
};

export default Header