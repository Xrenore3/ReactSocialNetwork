import React from "react";
import { connect } from "react-redux";
import {
  setCurrentPage,
  getUsers,
  follow,
  unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  requestUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getUserFollowingProgress,
} from "../../redux/selectors/users-selector";
import Paginator from "../common/Paginator/Paginator";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
    // this.props.toggleIsFetching(true);

    // userAPI
    //   .setUsersApi(this.props.currentPage, this.props.pageSize)
    //   .then((data) => {
    //     this.props.toggleIsFetching(false);
    //     this.props.setUsers(data.items);
    //     this.props.setTotalCount(data.totalCount);
    //   });
  }

  render() {
    let onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);

      this.props.getUsers(this.props.currentPage, this.props.pageSize);
    };
    if (this.props.isFetching) {
      return <Preloader />;
    }
    return (
      <>
        <Paginator
        currentPage={this.props.currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
      />
        <Users
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          toggleIsFetching={this.props.toggleIsFetching}
          userFollowingProgress={this.props.userFollowingProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: requestUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    userFollowingProgress: getUserFollowingProgress(state),
  };
};

// let AuthRedirectComponent = withAuthRedirect(UsersContainer);
// export default connect(mapStateToProps, {
//   follow,
//   unfollow,
//   setCurrentPage,
//   toggleFollowingProgress,
//   getUsers,
// })(AuthRedirectComponent);

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
  })
)(UsersContainer);
