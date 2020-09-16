import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { setAuthUserData, getAuth, logout } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
 
  render() {
    return <Header {...this.props.authData} logout={this.props.logout} />;
  }
}
let mapStateToProps = (state) => {
  return { authData: state.auth };
};

export default connect(mapStateToProps, {
  setAuthUserData,
  getAuth,
  logout
})(HeaderContainer);
