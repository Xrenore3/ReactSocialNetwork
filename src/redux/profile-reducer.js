import { stopSubmit } from "redux-form";
import { userAPI, profileAPI } from "./api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
  posts: [
    { id: "1", message: "First Post", likesCount: 15 },
    { id: "2", message: "Second Post", likesCount: 13 },
    { id: "3", message: "Third Post", likesCount: 12 },
    { id: "4", message: "Four Post", likesCount: 15 },
  ],
  profile: null,
  status: " ",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      debugger;
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: 5,
            message: action.newPostBody,
            likesCount: 0,
          },
        ],
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.idPost),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      debugger;
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    default:
      return state;
  }
};

export const addPost = (newPostBody) => ({
  type: ADD_POST,
  newPostBody,
});

export const deletePost = (idPost) => ({
  type: DELETE_POST,
  idPost,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status: status,
});
export const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getProfile = (userId) => async (dispatch) => {
  let responseData = await userAPI.getProfile(userId);
  dispatch(setUserProfile(responseData));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (photo) => async (dispatch) => {
  let response = await profileAPI.savePhoto(photo);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfileChanges = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id;
  let response = await profileAPI.saveProfileChanges(profile);
  if (response.data.resultCode === 0) {
    
    dispatch(getProfile(userId));
  } else {
    debugger
    let messageError =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("changeProfileInfo", { _error: messageError }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
