import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  
  return (
    <div>
      <div className={classes.discriptionBlock}>
        <img src={props.profile.photos.large} />
      </div>
      <div className={classes.aboutInfo}>
        <p className={classes.fullName}>{props.profile.fullName}</p>
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
  );
};
export default ProfileInfo;
