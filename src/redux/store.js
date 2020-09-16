import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: "1", message: "First Post", likesCount: 15 },
        { id: "2", message: "Second Post", likesCount: 13 },
        { id: "3", message: "Third Post", likesCount: 12 },
        { id: "4", message: "Four Post", likesCount: 15 },
      ],
      newPostText: "English motherfucker, do you speak it?",
    },
    dialogPage: {
      dialogs: [
        { id: 1, name: "Sasha" },
        { id: 2, name: "Maria" },
        { id: 3, name: "Ivan" },
        { id: 4, name: "Sergiy" },
        { id: 5, name: "Valera" },
      ],

      messages: [
        { id: 1, message: "How are you?" },
        { id: 2, message: "Yo" },
        { id: 3, message: "HI" },
        { id: 4, message: "How are you?" },
      ],
      newMessageText: "Write here",
    },
  },
  _callSubcriber() {
    console.log("dfd");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubcriber = observer;
  },

  dispatch(action) {
    profileReducer(this._state.profilePage, action);
    dialogsReducer(this._state.dialogPage, action);

    this._callSubcriber(this._state)
  },
};

window.store = store;

export default store;
