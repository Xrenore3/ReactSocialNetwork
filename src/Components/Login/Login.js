import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormControls } from "../common/FormControls/FormControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import styles from './../common/FormControls/FormControls.module.css'

const Login = (props) => {
  const onSubmit = (formData) => {
    console.log(formData);
    props.login(formData.email, formData.password, formData.rememberMe);
  };
if (props.isLogin) { return <Redirect to='/profile' />}
return  (
    <div>
      <h1>LOGIN  romanchaus519@gmail.com</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};
const maxLenght15 = maxLengthCreator(30);

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Email"
          name="email"
          component={FormControls}
          typeField="email"
          validate={[required, maxLenght15]}
        />
      </div>
      <div>
        <Field
          placeholder="Pasaword"
          component={FormControls}
          typeField="password"
          name="password"
          validate={[required, maxLenght15]}
        />
      </div>
      <div>
        <Field
          component={FormControls}
          typeField="checkbox"
          name="rememberMe"
        />
        remember me
      </div>
      <div>
        <button>Login</button>
      </div>
  {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
  };
};
export default connect(mapStateToProps, { login })(Login);
