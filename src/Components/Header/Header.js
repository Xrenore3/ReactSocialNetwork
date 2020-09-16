import React from "react";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import logo from './../../assets/images/logo.svg'

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logoBlock}>
        <img className={classes.logoImg} src={logo} />
        <span>MessageMe</span>
    </div>
      <div className={classes.loginBlock}>
        {props.isLogin ? (
          <div>
            <div>{props.login}</div>
            <div>
              <button onClick={props.logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <NavLink to={"/login"}> Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
