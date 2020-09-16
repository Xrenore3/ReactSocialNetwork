import React from "react";
import { addNewMessageActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

// const DialogsContainer = (props) => {
//   let state = props.store.getState();
//   let addMessages = () => {
//     props.store.dispatch(addNewMessageActionCreator());
//   };
//   let messageUpdate = (text) => {
//     props.store.dispatch(updateNewMessageActionCreator(text));
//   };

//   return (
//     <Dialogs
//       dialogsData={state.dialogPage}
//       addMessages={addMessages}
//       messageUpdate={messageUpdate}
//     />
//   );
// };

let mapStateToProps = (state) => {
  return {
    dialogsData: state.dialogPage,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addMessages: (newMessageBody) => {
      dispatch(addNewMessageActionCreator(newMessageBody));
    },
  };
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AuthRedirectComponent);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
