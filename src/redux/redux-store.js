import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMidleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";


let reducers = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMidleware)
  ));


window.store = store;

export default store;
