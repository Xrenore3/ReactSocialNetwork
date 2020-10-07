
import { getAuth } from "./auth-reducer";

const INITILIZED_SUCCESS = "INITILIZED_SUCCESS";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITILIZED_SUCCESS: {
      return { ...state, initialized: true };
    }
    default:
      return state;
  }
};
export const initializedSuccess = () => ({
  type: INITILIZED_SUCCESS,
});

export const initializeApp = () => {
  return (dispatch) => {
    let promise = dispatch(getAuth());

    Promise.all([promise]).then(() => {
      dispatch(initializedSuccess());
    });
  };
};

export default appReducer;
