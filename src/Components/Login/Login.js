import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormControls } from "../common/FormControls/FormControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { getAvatarLogo, login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import styles from "./../common/FormControls/FormControls.module.css";
import classes from "./../Login/Login.module.css";
import { getProfile } from "../../redux/profile-reducer";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
    props.getAvatarLogo(9488)
  };
  if (props.isLogin) {
    return <Redirect to="/profile" />;
  }
  return <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />;
};
const maxLenght15 = maxLengthCreator(30);

const LoginForm = (props) => {
  return (
    <div className={classes.wrapperLogin}>
      <form onSubmit={props.handleSubmit} className={classes.formSignin}>
        <h2 className={classes.formSigninHeading}>LOGIN</h2>
        <Field
          className={classes.formControl}
          placeholder="romanchaus519@gmail.com"
          name="email"
          component={FormControls}
          typefield="email"
          validate={[required, maxLenght15]}
        />
        <Field
          className={classes.formControl}
          placeholder="655831"
          component={FormControls}
          typefield="password"
          name="password"
          validate={[required, maxLenght15]}
        />
        <Field
          component={FormControls}
          typefield="checkbox"
          name="rememberMe"
        />
        <div className={classes.btnLoginBlock}>
          <span>remember me</span>
          <button className={classes.btnLogin}>Login</button>
        </div>

        {props.error && (
          <div className={styles.formSummaryError}>{props.error}</div>
        )}
        {props.captchaUrl && (
          <div>
            <img src={props.captchaUrl} alt={"captcha"} />
            <Field
              component={FormControls}
              typefield="text"
              name="captcha"
              validate={[required]}
            />
          </div>
        )}
      </form>
      romanchaus519@gmail.com<br/>
      655831 <br/>
      If you write a wrong password you'll see working captcha

    </div>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    id: state.auth.id,
    captchaUrl: state.auth.captchaUrl,
  };
};

export default connect(mapStateToProps, { login,getAvatarLogo })(Login);
