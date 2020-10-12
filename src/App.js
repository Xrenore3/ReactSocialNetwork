import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Switch, withRouter } from "react-router-dom";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { compose } from "redux";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./Components/common/Preloader/Preloader";
import { getAvatarLogo } from "./redux/auth-reducer";

class App extends React.Component {
  // catchAllUnhandledErros = () => {
  //   alert("Something goes wrong");
  // };
  componentDidMount() {
    this.props.initializeApp();
    // window.addEventListener("unhandledrejection", this.catchAllUnhandledErros);
  }
  // componentWillUnmount() {
  //   window.removeEventListener(
  //     "unhandledrejection",
  //     this.catchAllUnhandledErros
  //   );
  // }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <div className="sideBar"></div>
          <div className="mainContent">
            <Switch>
              <Route
                render={() => <ProfileContainer />}
                path={"/profile/:userId?"}
              />
              <Route render={() => <DialogsContainer />} path={"/dialogs"} />
              <Route render={() => <UsersContainer />} path={"/users"} />
              <Route render={() => <Login />} path={"/login"} />
              {/* <Route render={() => <div>Not found</div>} path={"/*"} /> */}
            </Switch>
          </div>
          <div className="sideBar"></div>
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
  connect(mapStateToProps, { initializeApp, getAvatarLogo })
)(App);
