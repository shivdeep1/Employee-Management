import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarAuthentication from "./NavbarAuthentication";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="flex-grow-1">
            <Link className="navbar-brand flex-grow-1" to="/">
              EMS
            </Link>
            {/* <button className="btn btn-dark btn-sm">console.log(user)</button> */}
          </div>
          <div className="col-4"></div>
          <NavbarAuthentication />
        </nav>
      </div>
    );
  }
}

export default Navbar;
