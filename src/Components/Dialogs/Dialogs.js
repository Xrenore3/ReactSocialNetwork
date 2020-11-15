import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let messagesElements = props.dialogsData.dialogs.map((dialog) => (
    <Message
      key={dialog.id }
      messages={dialog.messages}
      id={dialog.id}
      addMessages={props.addMessages}
    />
  ));

  let dialogsElements = props.dialogsData.dialogs.map((dialog) => (
    <DialogItem key={dialog.id+dialog.name} name={dialog.name} id={dialog.id} />
  ));

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messagesItem}>
        <div>{messagesElements}</div>
      </div>
    </div>
  );
};

export default Dialogs;
