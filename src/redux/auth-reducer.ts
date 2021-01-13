import { authApi, profileAPI, securityAPI } from "./api/api";
import { stopSubmit } from "redux-form";
import smallAvatar from "./../assets/images/smallAvatar.png";
const SET_USER_DATA = "auth-reducer/SET_USER_DATA";
const SET_CAPTCHA_URL = "auth-reducer/SET_CAPTCHA_URL";
const GET_AVATAR = "auth-reducer/GET_AVATAR";

export type initialStateType = {
  id: number | null,
  email: string | null,
  login: string | null,
  isLogin: boolean | null,
  captchaUrl: string | null,
  logoAvatar: any
};

let initialState = {
  id: null,
  email: null,
  login: null,
  isLogin: false,
  captchaUrl: null,
  logoAvatar: smallAvatar,
};

const authReducer = (state = initialState, action: any) => {
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

type setAuthUserDataActionTypePlayloadType = {
  email: string | null,
  id: number | null,
  login: string | null,
  isLogin: boolean | null

}
type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload:setAuthUserDataActionTypePlayloadType
}
const setAuthUserData = (id:number | null, email:string | null, login:string | null, isLogin:boolean | null):setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { email, id, login, isLogin },
});

type setCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL,
  payload: { captchaUrl: string },

}
const setCaptchaUrl = (captchaUrl: string):setCaptchaUrlActionType => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

type setAvatarLogoActionType = {
  type:typeof GET_AVATAR,
  logoAvatar:any
}
const setAvatarLogo = (logoAvatar: any):setAvatarLogoActionType => ({
  type: GET_AVATAR,
  logoAvatar,
});

export const getAuth = () => async (dispatch: any) => {
  let responseData = await authApi.setAuthData();
  if (responseData.resultCode === 0) {
    let { email, id, login } = responseData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (
  dispatch: any
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

export const logout = () => async (dispatch: any) => {
  let response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

const getCaptchaUrlSuccess = () => async (dispatch: any) => {
  let response = await securityAPI.getCaptchaUrl();
  dispatch(setCaptchaUrl(response.data.url));
};

export const getAvatarLogo = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setAvatarLogo(response.photos.small));
};

export default authReducer;
