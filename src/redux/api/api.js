import axios from "axios";
import { setUserProfile } from "../profile-reducer";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "c280aa1a-aa09-4069-9887-55caedb8a3ae",
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

  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
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
};
