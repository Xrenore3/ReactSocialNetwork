import React from "react";
import User from "./User/User";
import classes from "./Users.module.css";

let Users = (props) => {
  return (
    <div className={classes.grid}>
      {props.users.map((user) => (
        <User
          user={user}
          userFollowingProgress={props.userFollowingProgress}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  );
};
export default Users;
