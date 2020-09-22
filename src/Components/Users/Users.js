import React from "react";
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
