
import { getAuth } from "./auth-reducer";

const INITILIZED_SUCCESS: string = "INITILIZED_SUCCESS";

export type initialStateType = {
  initialized: boolean
};

let initialState: initialStateType = {
  initialized: false
};

const appReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case INITILIZED_SUCCESS: {
      return { ...state, initialized: true };
    }
    default:
      return state;
  }
};

type initializedSuccessActionType = {
  type: typeof INITILIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({
  type: INITILIZED_SUCCESS,
});

export const initializeApp = () => {
  return (dispatch: any) => {
    let promise = dispatch(getAuth());

    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};

export default appReducer;
