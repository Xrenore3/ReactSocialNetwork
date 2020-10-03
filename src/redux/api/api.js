import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "e65ceddf-4a19-45aa-80c4-7330d9f88838",
  },
});

export const userAPI = {
  setUsersApi(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  unfollowUserAPI(id) {
    return instance.delete(`/follow/${id}`);
  },
  followUserAPI(id) {
    return instance.post(`/follow/${id}`);
  },
  setAuthData() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  getProfile(userId) {
    console.warn("Please use profileAPI object");
    return profileAPI.getProfile(userId);
  },
};

export const authApi = {
  setAuthData() {
    return instance.get(`auth/me`).then((response) => response.data);
  },

  login(email, password, rememberMe = false, captcha=null) {
    return instance.post(`auth/login`, { email, password, rememberMe,captcha });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/` + userId).then((response) => response.data);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(filePhoto) {
    var formData = new FormData();
    formData.append('image', filePhoto )
    return instance.put(`profile/photo`,formData, { headers: {
      'Content-Type': 'multipart/form-data'
    } });

  },
  saveProfileChanges(profile) {
    return instance.put(`profile`,  profile );
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
