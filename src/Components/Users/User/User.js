import React from "react";
import { NavLink } from "react-router-dom";
import smallAvatar from "./../../../assets/images/smallAvatar.png";
import classes from './User.module.css'
let User = ({ user, ...props }) => {
  return (
    <div className={classes.userBlock}>
      <div>
        <NavLink to={`/profile/${user.id}`}>
          <img
            alt="user avatar"
            src={user.photos.small != null ? user.photos.small : smallAvatar}
          />
        </NavLink>
      </div>
      <div className={classes.userName}>{user.name}</div>
      <div>
        {user.followed ? (
          <button
            disabled={props.userFollowingProgress.some((id) => id === user.id)}
            onClick={() => {
              props.unfollow(user.id);
            }}
          >
            UnFollow
          </button>
        ) : (
          <button
            disabled={props.userFollowingProgress.some((id) => id === user.id)}
            onClick={() => {
              props.follow(user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
export default User;
