import { authApi, profileAPI, securityAPI } from "./api/api";
import { stopSubmit } from "redux-form";
import smallAvatar from "./../assets/images/smallAvatar.png";
const SET_USER_DATA = "auth-reducer/SET_USER_DATA";
const SET_CAPTCHA_URL = "auth-reducer/SET_CAPTCHA_URL";
const GET_AVATAR = "auth-reducer/GET_AVATAR";

let initialState = {
  id: null,
  email: null,
  login: null,
  isLogin: false,
  captchaUrl: null,
  logoAvatar: smallAvatar,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.payload };
    }
    case SET_CAPTCHA_URL: {
      return { ...state, ...action.payload };
    }
    case GET_AVATAR: {
      return { ...state, logoAvatar: action.logoAvatar };
    }
    default:
      return state;
  }
};
const setAuthUserData = (id, email, login, isLogin) => ({
  type: SET_USER_DATA,
  payload: { email, id, login, isLogin },
});

const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

const setAvatarLogo = (logoAvatar) => ({
  type: GET_AVATAR,
  logoAvatar,
});

export const getAuth = () => async (dispatch) => {
  let responseData = await authApi.setAuthData();
  if (responseData.resultCode === 0) {
    let { email, id, login } = responseData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  let response = await authApi.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuth());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrlSuccess());
    }
    let messageError =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: messageError }));
  }
};

export const logout = () => async (dispatch) => {
  let response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

const getCaptchaUrlSuccess = () => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  dispatch(setCaptchaUrl(response.data.url));
};

export const getAvatarLogo = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setAvatarLogo(response.photos.small));
};

export default authReducer;
