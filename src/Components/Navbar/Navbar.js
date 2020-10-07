import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import LoginInfo from "./LoginInfo/LoginInfo";

const Navbar = (props) => {
  return (
    <nav className={classes.nav}>
      <NavLink activeClassName={classes.activeLink} to="/profile">
        <div className={classes.item}>Profile</div>{" "}
      </NavLink>
      <NavLink activeClassName={classes.activeLink} to="/dialogs">
        <div className={classes.item}>Messages</div>{" "}
      </NavLink>
      <NavLink activeClassName={classes.activeLink} to="/users">
        <div className={classes.item}>Users</div>{" "}
      </NavLink>
      <LoginInfo
        isLogin={props.isLogin}
        login={props.login}
        logout={props.logout}
        profile={props.profile}
      />
    </nav>
  );
};

let mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    login: state.auth.login,
    profile: state.profilePage.profile,
  };
};
export default connect(mapStateToProps, { logout })(Navbar);
