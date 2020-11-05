import React, { useEffect } from "react";
import classes from "./LoginInfo.module.css";
import { NavLink } from "react-router-dom";

const LoginInfo = (props) => {
  useEffect(() => {
    props.getAvatarLogo(props.id);
  });

  return (
    <div>
      {props.isLogin ? (
        <div className={classes.loginBlock}>
          <p>{props.login}</p>
          <img
            className={classes.avatar}
            alt="avatar"
            src={props.logoAvatar}
          />
          <button className={classes.logoutButton} onClick={() => props.logout()}>
            Log Out
          </button>
        </div>
      ) : (
        <NavLink to={"/login"}>
          <button className={classes.loginButton}>Login</button>
        </NavLink>
      )}
    </div>
  );
};
export default LoginInfo;
