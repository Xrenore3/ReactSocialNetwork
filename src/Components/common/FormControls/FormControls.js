import React from "react";
import styles from './FormControls.module.css'
export const FormControls = ({input, meta, ...props}) => {
    
    let hasError = meta.touched && meta.error;
    let tagForm = props.typeField;
  return (
    <div className={styles.formControl}>
      <div>
        {tagForm==='textarea'? <textarea {...input} {...props} className={hasError && styles.error}/>:
         <input type={tagForm} {...input} {...props} className={hasError && styles.error}/>}
       
      </div>
     
     {hasError && <span >{meta.error}</span>}
    </div>
  );
};
