import React from "react";
import { addMessages, addNewMessageActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogsData: state.dialogPage,
  };
};


export default compose(
  connect(mapStateToProps, {addMessages}),
  withAuthRedirect
)(Dialogs);
