import React, { Component } from "react";
import Navbar from "../Navbar";
import { withUserContext, UserContext } from "../UserContext";
import NavNonAuth from "./NavNonAuth";
import NavAuth from "./NavAuth";
import { withStitch } from "../Stitch";

class NavbarAuthentication extends Component {
  state = { user: {} };
  //state = { user: null };
  /*componentDidUpdate(prevProps) {
    console.log("prev props");
    console.log(prevProps);
    console.log("current props");
    console.log(this.props);
    if (this.state.user != this.props.stitch.client) {
      console.log("updating user");
      this.setState({ user: this.props.stitch.client });
    }
  }*/
  componentDidUpdate() {
    console.log(this.state.user);
    console.log("navbar updated");
    if (this.props.user != this.state.user) {
      console.log("updating navbar");
      console.log(this.props.user);
      this.setState({ user: this.props.user });
    }
  }

  render() {
    // if (this.state.user != this.props.stitch.client) {
    //   this.setState({ user: this.props.stitch.client });
    // }
    console.log(this.props.stitch.client);
    //if (this.state.user == null || this.state.user == false) {
    if (this.props.stitch.client.auth.activeUserAuthInfo.userId) {
      return (
        <div>
          <NavAuth
            name={this.props.stitch.client.auth.currentUser.customData.name}
          />
        </div>
      );
    } else {
      return <NavNonAuth />;
    }
  }
}

export default withStitch(NavbarAuthentication);
