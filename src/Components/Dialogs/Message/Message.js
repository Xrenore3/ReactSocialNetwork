import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { Field, reduxForm, reset } from "redux-form";
import { maxLengthCreator } from "../../../utils/validators/validators";
import { FormControls } from "../../common/FormControls/FormControls";
import classes from "./Message.module.css";

const maxLenght15 = maxLengthCreator(100);

const Message = (props) => {
  const showAllMessages = props.messages.map((message) => (
    <div key={Math.random()*100} className={classes.message}>{message}</div>
  ));
  const dispatch = useDispatch()

  let onSubmit = (formData) => {
    props.addMessages(formData.newMessageBody, props.id);
    dispatch(reset('addMessage'))
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
          placeholder="Write here"
          validate={[maxLenght15]}
        ></Field>
        <button>Send message</button>
      </div>
    </form>
  );
};
const AddMessagesReduxForm = reduxForm({ form: "addMessage" })(AddMessagesForm);

export default Message;
