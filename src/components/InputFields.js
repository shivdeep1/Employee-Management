import React, { Component } from "react";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { withRouter, Redirect } from "react-router-dom";
import { Stitch } from "mongodb-stitch-browser-sdk";
class Profile extends Component {
  state = { ems: "", companyName: "", dob: "", designation: "", userName: "" };
  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };
  FieldHandler = async () => {
    let fieldsData = {
      companyName: this.state.companyName,
      ems: this.state.ems,
      dob: this.state.dob,
      designation: this.state.designation,
      userName: this.state.userName,
    };
    if (
      fieldsData.companyName.trim() === "" ||
      fieldsData.ems.trim() === "" ||
      fieldsData.designation.trim() === "" ||
      fieldsData.userName.trim() === ""
    ) {
      console.log("errror");
      return;
    }

    const client = Stitch.defaultAppClient;
    await client.callFunction("UpdateUserData", [fieldsData]).then((result) => {
      const userData = result.doc;
      console.log("user data" + userData);
      this.props.history.push("/Profile");
      if (userData.reqFields == true) {
        console.log("successfull");
      }
    });
  };
  render() {
    return (
      <div
        className="d-flex justify-content-center py-5 align-items-center "
        style={{ width: "100%", height: "100%" }}
      >
        <div className="main col-md-9 my-auto bg-light py-5 px-3">
          <div className="main-center">
            <h5 className="display-4" style={{ fontSize: "3vw" }}>
              Sign up once and watch any of our free demos.
            </h5>

            <div className="form-group">
              <label for="name">User Name</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user fa" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control shadow"
                  name="name"
                  id="name"
                  placeholder="Enter your Company's EMS ID"
                  onChange={(event) =>
                    this.inputChangeHandler(event, "userName")
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label for="name">Company EMS Id</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user fa" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control shadow"
                  name="name"
                  id="name"
                  placeholder="Enter your Company's EMS ID"
                  onChange={(event) => this.inputChangeHandler(event, "ems")}
                />
              </div>
            </div>

            <div className="form-group">
              <label for="name">Company Name</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user fa" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control shadow"
                  name="name"
                  id="name"
                  placeholder="Enter your Company Name"
                  onChange={(event) =>
                    this.inputChangeHandler(event, "companyName")
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label for="email">Your Designation</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-envelope fa" aria-hidden="true"></i>
                </span>
                <input
                  type="text"
                  className="form-control shadow"
                  name="email"
                  placeholder="Enter your Designation"
                  onChange={(event) =>
                    this.inputChangeHandler(event, "designation")
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label for="username">Date of Birth</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-users fa" aria-hidden="true"></i>
                </span>
                <input
                  type="date"
                  className="form-control shadow"
                  name="username"
                  placeholder="Enter your DOB"
                  onChange={(event) => this.inputChangeHandler(event, "dob")}
                />
              </div>
            </div>

            <div className="form-group">
              <label for="password">Password</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                </span>
                <input
                  type="password"
                  className="form-control shadow"
                  name="password"
                  placeholder="Enter your Password"
                />
              </div>
            </div>

            <div className="form-group">
              <label for="confirm">Confirm Password</label>
              <div className="input-group shadow">
                <span className="input-group-addon">
                  <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="confirm"
                  placeholder="Confirm your Password"
                />
              </div>
            </div>

            <button
              className="btn px-5 btn-dark"
              type="submit"
              onClick={() => this.FieldHandler()}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withStitch(withUserContext(Profile)));
