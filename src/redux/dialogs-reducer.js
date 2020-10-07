
const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE";

export const addMessages = (newMessageBody, id) => ({
  type: ADD_NEW_MESSAGE,
  newMessageBody,
  id,
});

let initialState = {
  dialogs: [
    {
      id: 1,
      name: "Sasha",
      messages: ["How are you?"],
    },
    {
      id: 2,
      name: "Maria",
      messages: ["I hate you", "Hi"],
    },
    {
      id: 3,
      name: "Ivan",
      messages: ["HI"],
    },
    {
      id: 4,
      name: "Sergiy",
      messages: ["How are you?"],
    },
  ]
};
const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_MESSAGE: {
      return {
    
        ...state,
        dialogs: [
          ...state.dialogs.map((dialog) =>
            dialog.id === action.id
              ? {
                  ...dialog,
                  messages: [...dialog.messages, action.newMessageBody],
                }
              : dialog
          ),
        ],
      };
    }

    default:
      return state;
  }
};

export default dialogsReducer;
