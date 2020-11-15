import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./DialogItem.module.css";
const DialogItem = (props) => {
  return (
    <NavLink
      to={`/dialogs/${props.id}`}
      activeClassName={classes.activeDialog}
      className={classes.dialogName}
    >
      <div>{props.name}</div>
    </NavLink>
  );
};

export default DialogItem;
