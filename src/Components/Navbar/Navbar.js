import React from "react";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getAvatarLogo, logout } from "../../redux/auth-reducer";
import LoginInfo from "./LoginInfo/LoginInfo";
import { CgProfile } from "react-icons/cg";
import { SiGooglemessages } from "react-icons/si";
import { ImUsers } from "react-icons/im";
import Header from "../Header/Header";

const Navbar = (props) => {
  return (
    <nav className={classes.nav}>
      <div className={classes.header}>
        <Header />
      </div>
      <div className={classes.navItem}>
        <NavLink activeClassName={classes.activeLink} to="/profile">
          <CgProfile className={classes.iconSvg} />
          <p>Profile</p>
        </NavLink>
        <NavLink activeClassName={classes.activeLink} to="/dialogs">
          <SiGooglemessages className={classes.iconSvg} />
          <p>Message</p>
        </NavLink>
        <NavLink activeClassName={classes.activeLink} to="/users">
          <ImUsers className={classes.iconSvg} />
          <p>Users</p>
        </NavLink>
      </div>
      <div className={classes.loginInfo}>
        <LoginInfo
          isLogin={props.isLogin}
          login={props.login}
          logout={props.logout}
          logoAvatar={props.logoAvatar}
          getAvatarLogo={props.getAvatarLogo}
          id={props.id}
        />
      </div>
    </nav>
  );
};

let mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    login: state.auth.login,
    logoAvatar: state.auth.logoAvatar,
    id: state.auth.id,
  };
};
export default connect(mapStateToProps, { logout, getAvatarLogo })(Navbar);
