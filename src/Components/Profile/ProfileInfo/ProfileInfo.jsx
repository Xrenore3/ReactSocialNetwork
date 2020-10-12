import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import noAvatart from "./../../../assets/images/smallAvatar.png";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import logoInformAboutUser from "./../../../assets/images/icon_information__about_user.png";

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
    <div>
      <div className={classes.discriptionBlock}>
        <img
          alt="avatar"
          className={classes.avatar}
          src={props.profile.photos.large || noAvatart}
        />
        <div>
          {props.isOwner && (
            <label className={classes.choosePhotoButton}>
              Choose a photo
              <input onChange={onMainPhotoChange} type="file" />
            </label>
          )}
        </div>

        <div className={classes.aboutInfo}>
          <p className={classes.fullName}>{props.profile.fullName}</p>
          <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus}
            isOwner={props.isOwner}
          />
        </div>
      </div>
      <div className={classes.logoInformAboutUser}>
        <img src={logoInformAboutUser} alt="logo inform about user" />
        <p>User information</p>
      </div>
      {!editMode ? (
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
    <div className={classes.profileInfoBlock}>
      <div className={classes.profileInfoRow}>
        <b>About me: </b>
        {props.profile.aboutMe}
      </div>
      <div className={classes.profileInfoRow}>
        <b>Looking for a job: </b>
        {props.profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div className={classes.profileInfoRow}>
        <b>My professional skills: </b>
        {props.profile.lookingForAJobDescription}
      </div>
      <div className={classes.profileInfoRow}>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map((key) => (
          <div key={key} className={classes.profileInfoContactsBlock}>
            <b>{key}: </b>
            {props.profile.contacts[key]}
          </div>
        ))}
      </div>
      <div className={classes.buttonBlock}>
        {props.isOwner && (
          <button onClick={props.activateEditMode}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
