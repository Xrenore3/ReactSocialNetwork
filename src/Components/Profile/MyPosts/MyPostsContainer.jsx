import React from "react";
import { addPost,deletePost } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = (state) => {

  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};


const MyPostsContainer = connect(mapStateToProps, {addPost,deletePost})(MyPosts);
export default MyPostsContainer;
