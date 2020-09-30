import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { FormControls } from "../common/FormControls/FormControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";
// const maxLenght15 = maxLengthCreator(15);

const Dialogs = (props) => {
  // let messagesElements = props.dialogsData.messages.map((message) => (
  //   <Message message={message.message} id={message.id}/>
  // ));

  let messagesElements = props.dialogsData.dialogs.map((dialog) => (
    
    <Message messages={dialog.messages} id={dialog.id} addMessages={props.addMessages}/>
  ));

  let dialogsElements = props.dialogsData.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  // let onSubmit = (formData) => {
  //   debugger;
  //   props.addMessages(formData.newMessageBody);
  // };
debugger
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        <div>{messagesElements}</div>
        {/* <AddMessagesReduxForm onSubmit={onSubmit} /> */}
      </div>
    </div>
  );
};

// const AddMessagesForm = (props) => {
//   return (
//     <form onSubmit={props.handleSubmit}>
//       <div>
//         <Field
//           component={FormControls}
//           typefield="textarea"
//           name="newMessageBody"
//           placeholder="Write here, bitch"
//           validate={[maxLenght15, required]}
//         ></Field>
//       </div>
//       <div>
//         <button>Send message</button>
//       </div>
//     </form>
//   );
// };

// const AddMessagesReduxForm = reduxForm({ form: "addMessage" })(AddMessagesForm);
export default Dialogs;
