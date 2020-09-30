import { authApi, securityAPI } from "./api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let initialState = {
  id: null,
  email: null,
  login: null,
  isLogin: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.payload };
    }
    case SET_CAPTCHA_URL: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
export const setAuthUserData = (id, email, login, isLogin) => ({
  type: SET_USER_DATA,
  payload: { email, id, login, isLogin },
});

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});
export const getAuth = () => async (dispatch) => {
  let responseData = await authApi.setAuthData();
  if (responseData.resultCode === 0) {
    let { email, id, login } = responseData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authApi.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuth());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrlSuccess())
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

export default authReducer;
