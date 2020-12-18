import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavAuth extends Component {
  render() {
    return (
      <div>
        <Link to="/Profile" className="btn btn-dark">
          {this.props.name}
        </Link>
        <Link to="/messages" className="btn btn-dark">
          Messages
        </Link>
        <Link to="/scrum" className="btn btn-dark">
          Teams
        </Link>
        <button className="btn btn-dark">Sign Out</button>
      </div>
    );
  }
}

export default NavAuth;
