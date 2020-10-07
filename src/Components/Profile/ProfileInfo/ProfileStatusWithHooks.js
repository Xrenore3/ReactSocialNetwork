import React, { useState, useEffect } from "react";
import classes from "./ProfileInfo.module.css";


const ProfileStatusWithHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };
  return (
    <div className={classes.status}>
      {!editMode && (
        <div>
          <span onDoubleClick={props.isOwner && activateEditMode}>
            {props.status || "No status"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            value={status}
            onBlur={deactivateEditMode}
            autoFocus={true}
          ></input>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
