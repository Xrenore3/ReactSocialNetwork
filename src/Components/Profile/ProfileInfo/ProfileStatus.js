// import React from "react";

// class ProfileStatus extends React.Component {
//   state = { editMade: false, status: this.props.status };

//   activateEditStatus = () => {
//     this.setState({
//       editMade: true,
//     });
//   };

//   deactivateEditStatus = () => {
//     this.setState({
//       editMade: false,
//     });

//     this.props.updateStatus(this.state.status);
//   };
//   onStatusChange = (e) => {
//     this.setState({
//       status: e.currentTarget.value,
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.status !== this.props.status) {
//       this.setState({
//         status: this.props.status,
//       });
//     }
//   }

//   render() {
//     return (
//       <div>
//         {this.state.editMade ? (
//           <div>
//             <input
//               onChange={this.onStatusChange}
//               value={this.state.status}
//               onBlur={this.deactivateEditStatus}
//               autoFocus={true}
//             ></input>
//           </div>
//         ) : (
//           <div>
//             <span onDoubleClick={this.activateEditStatus}>
//               {this.props.status || "No status"}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default ProfileStatus;
