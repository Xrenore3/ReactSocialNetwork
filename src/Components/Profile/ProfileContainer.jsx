import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getProfile,
  getStatus,
  updateStatus,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = this.props.authId;
      if (!userId){
        this.props.history.push('/login')
      }
    }
    this.props.getProfile(userId);
    // userAPI.getProfile(userId).then((data) => {
    //   this.props.setUserProfile(data);
    // });

    this.props.getStatus(userId);
  }
  render() {
    // if (this.props.isLogin) {
    //   return <Redirect to={"/login"} />;
    // }
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} updateStatus={this.props.updateStatus} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authId: state.auth.id
});

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let withRouterUserProfile = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps, { getProfile })(withRouterUserProfile);

export default compose(
  connect(mapStateToProps, { getProfile, updateStatus, getStatus }),
  withRouter
)(ProfileContainer);
