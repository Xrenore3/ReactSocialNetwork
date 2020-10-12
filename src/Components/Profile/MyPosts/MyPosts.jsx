import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm, reset } from "redux-form";
import {
  maxLengthCreator,
} from "../../../utils/validators/validators";
import { FormControls } from "../../common/FormControls/FormControls";
import deleteIcon from "./../../../assets/images/icon_delete.svg";
import { useDispatch } from "react-redux";
const maxLenght15 = maxLengthCreator(150);

const MyPosts = (props) => {
  const dispatch = useDispatch()

  let postsElements = [...props.posts].reverse().map((post) => (
    <div key={post.id}>
      <div className={classes.btnDeletePostBlock}>
        <button
          onClick={() => {
            onDeletePost(post.id);
          }}
          className={classes.btnDeletePost}
          type="submit"
        >
          <img src={deleteIcon}  alt='delete icon'/>
        </button>
      </div>
      <Post
        message={post.message}
        likesCount={post.likesCount}
        profile={props.profile}
      />
    </div>
  ));
  let onDeletePost = (postId) => {
    props.deletePost(postId);
  };
  let onAddPosts = (formData) => {
    props.addPost(formData.newPostBody);
    dispatch(reset('AddNewPost'))
  };
  return (
    <div className={classes.postsBlock}>
      <div className={classes.addPostBlock}>
        <h3> New post</h3>
        <AddNewPostReduxForm onSubmit={onAddPosts} />
      </div>
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
          validate={[maxLenght15]}
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
