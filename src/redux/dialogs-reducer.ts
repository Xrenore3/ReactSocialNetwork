const ADD_NEW_MESSAGE = "ADD-NEW-MESSAGE";



type DialogsType = {
  id: number,
  name:string,
  messages: Array<string>
}

let initialState = {
  dialogs: [
    {
      id: 1,
      name: "Sasha",
      messages: [
        "How are you?",
        `Your reducer function's returned value is assigned to the accumulator, whose value is remembered across each iteration throughout the array, and ultimately becomes the final, single resulting value.`,
      ],
    },
    {
      id: 2,
      name: "Maria",
      messages: [
        "I hate you",
        "Hi",
        "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.",
      ],
    },
    {
      id: 3,
      name: "Ivan",
      messages: [
        "HI",
        "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class",
      ],
    },
    {
      id: 4,
      name: "Sergiy",
      messages: [
        "How are you?",
        "Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.",
      ],
    },
  ] as Array<DialogsType>
};

export type InitialStateType = typeof initialState  

const dialogsReducer = (state = initialState, action:any):InitialStateType => {
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
type AddMessagesActionType = {
  type: typeof ADD_NEW_MESSAGE,
  newMessageBody:string,
  id:number
}
export const addMessages = (newMessageBody:string, id:number):AddMessagesActionType => ({
  type: ADD_NEW_MESSAGE,
  newMessageBody,
  id,
});

export default dialogsReducer;
