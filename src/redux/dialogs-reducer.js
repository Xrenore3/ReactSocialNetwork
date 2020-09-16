const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE";
export const addNewMessageActionCreator = (newMessageBody) => ({
  type: ADD_NEW_MESSAGE,
  newMessageBody
});


let initialState = {
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
};
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE: {
      // let newMessage = {
      //   id: 5,   
      //   message: state.newMessageText,
      // };
      // let stateCopy = { ...state };
      // stateCopy.messages = [...state.messages];
      // stateCopy.messages.push(newMessage);
      // stateCopy.newMessageText = " ";
      return {
        ...state,
        messages: [...state.messages, { id: 5, message: action.newMessageBody }],
      };
    }

    default:
      return state;
  }
};

export default dialogsReducer;
