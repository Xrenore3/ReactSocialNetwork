import React from "react";
import classes from "./Users.module.css";
import { NavLink } from "react-router-dom";

let User = ({user,...props}) => {
  return (
    <div className={classes.userBlock}>
      <span>
        <div>
          <NavLink to={`/profile/${user.id}`}>
            <img alt='user avatar'
              src={
                user.photos.small != null
                  ? user.photos.small
                  : "data:image/jpeg;base64,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"
              }
            />
          </NavLink>
        </div>
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
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div> {user.status}</div>
        </span>
      </span>
    </div>
  );
};
export default User;
