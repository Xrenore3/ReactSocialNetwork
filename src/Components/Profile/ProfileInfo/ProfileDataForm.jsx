import React from "react";
import classes from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { FormControls } from "../../common/FormControls/FormControls";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";

const maxLenght30 = maxLengthCreator(30);

const ProfileDataForm = (props) => {
  return (
    <form>
      <div>
        <b>About me: </b>
        <Field
          placeholder="write here"
          name="aboutMe"
          component={FormControls}
          typefield="text"
          validate={[required, maxLenght30]}
        />
      </div>
    </form>
  );
};

export default reduxForm({ form: "changeProfileInfo" })(ProfileDataForm);
