import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { FormControls } from "../../common/FormControls/FormControls";
const maxLenght15 = maxLengthCreator(15);

const MyPosts = (props) => {
  let postsElements = [...props.posts].reverse().map((post) => (
    <div key={post.id}>
      <Post message={post.message} likesCount={post.likesCount} />
      <button
        onClick={() => {
          onDeletePost(post.id);
        }}
      >
        delete
      </button>
    </div>
  ));
  let onDeletePost = (postId) => {
    props.deletePost(postId);
  };
  let onAddPosts = (formData) => {
    props.addPost(formData.newPostBody);
  };
  return (
    <div className={classes.postsBlock}>
      <div></div>
      <div className={classes.addPostBlock}>
        <h3> My post</h3>
        <AddNewPostReduxForm onSubmit={onAddPosts} />
      </div>
      <div>New post</div>
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

const AddNewPostForm = (props) => {
  return (
    <form className={classes.formBlock} onSubmit={props.handleSubmit}>
      <div>
        <Field
          typefield="textarea"
          component={FormControls}
          name="newPostBody"
          placeholder="Write here"
          validate={[maxLenght15, required]}
        ></Field>
      </div>
      <div className={classes.btnAddPostBlock}>
        <button className={classes.btnAddPost}>Add posts</button>
      </div>
    </form>
  );
};

const AddNewPostReduxForm = reduxForm({ form: "AddNewPost" })(AddNewPostForm);
export default MyPosts;
