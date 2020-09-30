import React from "react";
import { Route } from "react-router-dom";
import classes from "./../Dialogs.module.css";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { FormControls } from "../../common/FormControls/FormControls";

const maxLenght15 = maxLengthCreator(50);

const Message = (props) => {
  debugger;
  const showAllMessages = props.messages.map((message) => (
    <div className={classes.message}>{message}</div>
  ));

  let onSubmit = (formData) => {
    debugger;
    props.addMessages(formData.newMessageBody,props.id);
  };
  return (
    <Route
      render={() => (
        <div>
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
    <form onSubmit={props.handleSubmit} >
      <div>
        <Field
          component={FormControls}
          typefield="textarea"
          name="newMessageBody"
          placeholder="Write here, bitch"
          validate={[maxLenght15, required]}
        ></Field>
      </div>
      <div>
        <button>Send message</button>
      </div>
    </form>
  );
};
const AddMessagesReduxForm = reduxForm({ form: "addMessage" })(AddMessagesForm);

export default Message;
