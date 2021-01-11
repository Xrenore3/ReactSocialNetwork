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
    <>
      <section className={`${classes.discriptionBlock} ${classes.grid}`}>
        <img
          alt="avatar"
          className={classes.avatar}
          src={props.profile.photos.large || noAvatart}
        />
        {props.isOwner && (
          <label className={classes.choosePhotoButton}>
            Choose a photo
            <input onChange={onMainPhotoChange} type="file" />
          </label>
        )}

        <div className={classes.aboutInfo}>
          <p className={classes.fullName}>{props.profile.fullName}</p>
          <ProfileStatusWithHooks
            status={props.status}
            updateStatus={props.updateStatus}
            isOwner={props.isOwner}
          />
        </div>
      </section>
      <section className={classes.informAboutUserWrapper}>
        <div className={classes.sectionHeader}>
          <img src={logoInformAboutUser} alt="logo inform about user" />
          <h3>User information</h3>
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
      </section>
    </>
  );
};

const ProfileData = (props) => {
  return (
    <section className={classes.profileInfoBlock}>
      <div className={classes.profileInfoRow}>
        <b>About me: </b>
        {props.profile.aboutMe || "Is empty"}
      </div>
      <div className={classes.profileInfoRow}>
        <b>Looking for a job: </b>
        {props.profile.lookingForAJob ? "Yes" : "No"}
      </div>
      <div className={classes.profileInfoRow}>
        <b>My professional skills: </b>
        {props.profile.lookingForAJobDescription || "Is empty"}
      </div>
      <div className={classes.profileInfoRow}>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map((key) => (
          <div key={key} className={classes.profileInfoContactsBlock}>
            <b>{key}: </b>
            {props.profile.contacts[key] || "Is empty"}
          </div>
        ))}
      </div>
      <div className={classes.buttonEdit} >
        {props.isOwner && (
          <button onClick={props.activateEditMode}>Edit</button>
        )}
      </div>
    </section>
  );
};

export default ProfileInfo;
