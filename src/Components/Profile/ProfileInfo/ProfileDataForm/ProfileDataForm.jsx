import React from "react";
import stylesFromControl from "./../../../common/FormControls/FormControls.module.css";
import { Field, reduxForm } from "redux-form";
import { FormControls } from "../../../common/FormControls/FormControls";
import {
  maxLengthCreator,
  required,
} from "../../../../utils/validators/validators";
import classes from "./ProfileDataForm.module.css";

const maxLenght30 = maxLengthCreator(30);

const ProfileDataForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.profileInfoBlock}>
      <div>
        <b>Full name: </b>
        <Field
          name="fullName"
          component={FormControls}
          typefield="text"
          validate={[required, maxLenght30]}
        />
      </div>
      <div>
        <b>About me: </b>
        <Field
          name="aboutMe"
          component={FormControls}
          typefield="text"
          validate={[required, maxLenght30]}
        />
      </div>
      <div>
        <b>Looking for a job: </b>
        <Field
          name="lookingForAJob"
          component={FormControls}
          typefield="checkbox"
        />
      </div>
      <div>
        <b>My professional skills: </b>
        <Field
          name="lookingForAJobDescription"
          component={FormControls}
          typefield="textarea"
          validate={[required, maxLenght30]}
        />
      </div>
      <div>
        <b>Contacts:</b>
        <div className={classes.contactsBlock}>
          {Object.keys(props.profile.contacts).map((key) => (
            <div key={key}>
              <div>
                <b>{key}: </b>
                <Field
                  name={"contacts." + key}
                  component={FormControls}
                  typefield="text"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.buttonSave}>
        <button>Save</button>
      </div>

      {props.error && (
        <div className={stylesFromControl.formSummaryError}>{props.error}</div>
      )}
    </form>
  );
};

export default reduxForm({ form: "changeProfileInfo" })(ProfileDataForm);
