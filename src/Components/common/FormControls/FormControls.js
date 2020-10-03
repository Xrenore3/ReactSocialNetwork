import React from "react";
import styles from "./FormControls.module.css";
import classesLogin from "./../../Login/Login.module.css";
export const FormControls = ({ input, meta, ...props }) => {
  let hasError = meta.touched && meta.error;
  let tagForm = props.typefield;
  return (
    <div className={styles.formControl}>
      {tagForm === "textarea" ? (
        <textarea {...input} {...props} className={hasError && styles.error} />
      ) : (
        <input
          type={tagForm}
          {...input}
          {...props}
          className={hasError ? styles.error : styles.formControlInput}
        />
      )}

      {hasError && <span>{meta.error}</span>}
    </div>
  );
};
