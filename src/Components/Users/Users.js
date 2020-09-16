import React from "react";
import classes from "./Users.module.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {
  return (
    <div>
      
      {props.users.map((user) => (
      <User user={user}
            userFollowingProgress={props.userFollowingProgress}
            unfollow={props.unfollow}
            follow={props.follow}

            />))}
    </div>
  );
};
export default Users;
