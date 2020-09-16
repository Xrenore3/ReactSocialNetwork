import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, withRouter } from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import Login from "./Components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./Components/common/Preloader/Preloader";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar store={this.props.store} />
        <div className="app-wrapper-content">
          <Route
            render={() => <ProfileContainer />}
            path={"/profile/:userId?"}
          />
          <Route render={() => <DialogsContainer />} path={"/dialogs"} />
          <Route render={() => <UsersContainer />} path={"/users"} />
          <Route render={() => <Login />} path={"/login"} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});
export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
