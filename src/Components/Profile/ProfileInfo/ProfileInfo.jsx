import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import avatart from "./../../../assets/images/avatar.jpeg";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }
  const onMainPhotoChange = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData) => {
    props.saveProfileChanges(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={classes.profileBlock}>
      <div className={classes.discriptionBlock}>
        <img
          className={classes.avatar}
          src={props.profile.photos.large || avatart}
        />
        <div>
          {props.isOwner && <input onChange={onMainPhotoChange} type="file" />}
        </div>
      </div>
      <div className={classes.aboutInfo}>
        <p className={classes.fullName}>{props.profile.fullName}</p>
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
      {!editMode ? ( props.isOwner && 
        <ProfileData {...props} activateEditMode={() => setEditMode(true)} />
      ) : (
        <ProfileDataForm
          profile={props.profile}
          initialValues={props.profile}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

const ProfileData = (props) => {
  return (
    <div>
      <button onClick={props.activateEditMode}>Edit</button>
      <div>
        <b>Full name: </b>
        {props.profile.fullName}
      </div>
      <div>
        <b>About me: </b>
        {props.profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job: </b>
        {props.profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div>
        <b>My professional skills: </b>
        {props.profile.lookingForAJobDescription}
      </div>
      <div className={classes.profileContactsBlock}>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map((key) => (
          <div key={key}>
            <div>
              <b>{key}: </b>
              {props.profile.contacts[key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfo;
