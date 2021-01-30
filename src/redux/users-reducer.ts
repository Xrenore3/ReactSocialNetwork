import { userAPI } from "./api/api";
import { updateObjectInArray } from "../utils/object-helper";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET USERS";
const SET_CURRENT_PAGE = "SET CURRENT PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

type PhotosType = {
  "small": string | null,
    "large": string | null
}
type UserType = {
  name: string
  id: number
  photos:PhotosType
  status: string | null
  followed: boolean
}
export type InitialStateType = typeof initialState
let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  portionNumber: 1,
  isFetching: true,
  userFollowingProgress: [] as Array<number> //id of users
};

const usersReducer = (state = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
        portionNumber: action.portionNumber,
      };
    }
    case SET_TOTAL_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        userFollowingProgress: action.isFetching
          ? [...state.userFollowingProgress, action.userId]
          : state.userFollowingProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

type followSuccessActionType = {
  type:typeof FOLLOW,
  userId:number
}
type unfollowSuccessActionType = {
  type:typeof UNFOLLOW,
  userId:number
}
type setUsersActionType = {
  type:typeof SET_USERS,
  users:Array<UserType>
}
type setCurrentPageActionType = {
  type:typeof SET_CURRENT_PAGE,
  currentPage:number
  portionNumber:number
}
type setTotalCountActionType = {
  type:typeof SET_TOTAL_COUNT,
  count:number
}
type toggleIsFetchingActionType = {
  type:typeof TOGGLE_IS_FETCHING,
  isFetching:boolean
}
type ToggleFollowingProgressActionType ={
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching:boolean
  userId:number
}

export const followSuccess = (userId:number):followSuccessActionType => ({
  type: FOLLOW,
  userId,
});
export const unfollowSuccess = (userId:number):unfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
});
export const setUsers = (users:Array<UserType>):setUsersActionType => ({
  type: SET_USERS,
  users,
});
export const setCurrentPage = (currentPage:number, portionNumber:number):setCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
  portionNumber,
});
export const setTotalCount = (count:number):setTotalCountActionType => ({
  type: SET_TOTAL_COUNT,
  count,
});
export const toggleIsFetching = (isFetching: boolean):toggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const getUsers = (currentPage:number, pageSize:number) => async (dispatch:any) => {
  dispatch(toggleIsFetching(true));

  let responseData = await userAPI.setUsersApi(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(responseData.items));
  dispatch(setTotalCount(responseData.totalCount));
};

export const follow = (userId:number) => async (dispatch:any) => {
  dispatch(toggleFollowingProgress(true, userId));

  let response = await userAPI.followUserAPI(userId);
  if (response.data.resultCode === 0) {
    dispatch(followSuccess(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const unfollow = (userId:number) => async (dispatch:any) => {
  dispatch(toggleFollowingProgress(true, userId));

  let response = await userAPI.unfollowUserAPI(userId);
  if (response.data.resultCode === 0) {
    dispatch(unfollowSuccess(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export default usersReducer;
