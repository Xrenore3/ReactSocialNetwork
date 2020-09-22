import React from "react";
import classes from "./LoginInfo.module.css";
import { NavLink } from "react-router-dom";

const LoginInfo = (props) => {
  return (
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
  );
};
export default LoginInfo;
