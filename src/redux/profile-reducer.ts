import { stopSubmit } from "redux-form";
import { userAPI, profileAPI } from "./api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

type PostType = {
  id: number
  message: string
  likesCount: number
}

type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ProfileContactsType
  photos: ProfilePhotosType
}

type ProfileContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

type ProfilePhotosType = {
  small: null | string
  large: null | string
}

export type InitialStateType = typeof initialState

let initialState = {
  posts: [
    { id: 1, message: "First Post", likesCount: 15 },
    { id: 2, message: "Second Post", likesCount: 13 },
    { id: 3, message: "Third Post", likesCount: 12 },
    { id: 4, message: "Four Post", likesCount: 15 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: " "
};

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type AddPostActionType = {
  type: typeof ADD_POST
  newPostBody: string
}
export const addPost = (newPostBody: string):AddPostActionType => ({
  type: ADD_POST,
  newPostBody,
});

type DeletePostActionType = {
  type: typeof DELETE_POST
  idPost: number
}
export const deletePost = (idPost: number):DeletePostActionType => ({
  type: DELETE_POST,
  idPost,
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusACtionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string):SetStatusACtionType => ({
  type: SET_STATUS,
  status: status,
});

type SavePhotoSuccessACtionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: ProfilePhotosType
}
export const savePhotoSuccess = (photos: ProfilePhotosType):SavePhotoSuccessACtionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getProfile = (userId: number) => async (dispatch: any) => {
  let responseData = await userAPI.getProfile(userId);
  dispatch(setUserProfile(responseData));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (photo: string) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(photo);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfileChanges = (profile: ProfileType) => async (dispatch: any, getState: any) => {
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
