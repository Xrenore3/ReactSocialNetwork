import React, { useEffect } from "react";
import classes from "./LoginInfo.module.css";
import { NavLink } from "react-router-dom";

const LoginInfo = (props) => {
  useEffect(()=> {
    props.getAvatarLogo(props.id)})
  

  return (
    <div className={classes.loginBlock}>
      {props.isLogin ? (
        <div>
          <div>{props.login}</div>
          <img onClick={props.getAvatarLogo(9488)} className={classes.avatar} alt="avatar" src={props.logoAvatar} />
          <div>
            <button className={classes.logoutButton} onClick={props.logout}>
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <NavLink to={"/login"}>
          <button className={classes.logoutButton}>Login</button>
        </NavLink>
      )}
    </div>
  );
};
export default LoginInfo;
