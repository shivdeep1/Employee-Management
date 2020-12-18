import React, { Component } from "react";
import { withUserContext } from "../UserContext";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import { Link } from "react-router-dom";

class NavNonAuth extends Component {
  render() {
    return (
      <div>
        <Link to="/SignUp" className="btn btn-dark my-2 my-sm-0">
          Sign Up
        </Link>
        <Link to="/SignIn" className="btn btn-dark my-2 my-sm-0">
          Sign In
        </Link>
      </div>
    );
  }
}

export default withUserContext(NavNonAuth);
