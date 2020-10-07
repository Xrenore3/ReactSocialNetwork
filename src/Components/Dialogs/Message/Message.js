import React from "react";
import { Route } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator } from "../../../utils/validators/validators";
import { FormControls } from "../../common/FormControls/FormControls";
import classes from "./Message.module.css";

const maxLenght15 = maxLengthCreator(100);

const Message = (props) => {
  const showAllMessages = props.messages.map((message) => (
    <div className={classes.message}>{message}</div>
  ));

  let onSubmit = (formData) => {
    debugger;
    props.addMessages(formData.newMessageBody, props.id);
  };
  return (
    <Route
      render={() => (
        <div classes={classes.messagesBlock}>
          {showAllMessages}
          <AddMessagesReduxForm onSubmit={onSubmit} />
        </div>
      )}
      path={`/dialogs/${props.id}`}
    />
  );
};

const AddMessagesForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.AddMessagesForm}>
      <div className={classes.addMessageBlock}>
        <Field
          component={FormControls}
          typefield="textarea"
          name="newMessageBody"
          placeholder="Write here, bitch"
          validate={[maxLenght15]}
        ></Field>
        <button>Send message</button>
      </div>
    </form>
  );
};
const AddMessagesReduxForm = reduxForm({ form: "addMessage" })(AddMessagesForm);

export default Message;
