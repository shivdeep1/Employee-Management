import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStitch } from "./Stitch";

class FirstLoginData extends Component {
  componentDidUpdate() {
    console.log(this.props.stitch);
  }
  state = {
    companyName: "",
    dob: "",
    skills: "",
    designation: "",
    Street: "",
    City: "",
    Country: "",
    Founded: "",
    Website: "",
  };
  componentDidMount() {
    console.log(this.props);
  }
  UpdateData = async () => {
    var fieldsData = {};
    if (
      this.props.stitch.client.auth.currentUser.customData.accountType == "User"
    ) {
      fieldsData = {
        accountType: "User",
        Street: this.state.Street,
        City: this.state.City,
        State: this.state.State,
        Country: this.state.Country,

        dob: this.state.dob,
      };
      if (
        fieldsData.Street.trim() === "" ||
        fieldsData.City.trim() === "" ||
        fieldsData.State.trim() === "" ||
        fieldsData.Country.trim() === "" ||
        fieldsData.dob.trim() == ""
      ) {
        console.log("error");
        return;
      }
    } else {
      fieldsData = {
        accountType: "Organisation",
        Street: this.state.Street,
        City: this.state.City,
        State: this.state.State,
        Country: this.state.Country,

        Website: this.state.Website,
        Founded: this.state.Founded,
      };
      if (
        fieldsData.Street.trim() === "" ||
        fieldsData.City.trim() === "" ||
        fieldsData.State.trim() === "" ||
        fieldsData.Country.trim() === "" ||
        fieldsData.Website.trim() === "" ||
        fieldsData.Founded.trim() === ""
      ) {
        console.log("error");
        return;
      }
    }

    await this.props.stitch.client
      .callFunction("UpdateUserData", [fieldsData])
      .then((result) => {
        const userData = result.doc;
        console.log("user data" + userData);
        if (userData.reqFields == true) {
          console.log("successfull");
        }
        this.props.history.push("/Profile");
      });
  };
  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };
  render() {
    if (
      this.props.stitch.client &&
      this.props.stitch.client.auth &&
      this.props.stitch.client.auth.currentUser &&
      this.props.stitch.client.auth.currentUser.customData
    ) {
      if (
        this.props.stitch.client.auth.currentUser.customData.accountType ==
        "User"
      ) {
        return (
          <main className="d-flex m-5 justify-content-center">
            <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
              <div className="col-12 text-center display-4">
                New User Account
              </div>
              <div className="col-12">Address</div>
              <input
                className="col-12 m-1 form-control shadow"
                label="Street"
                config={{ type: "Street" }}
                placeholder="Street"
                onChange={(event) => this.inputChangeHandler(event, "Street")}
              />
              <input
                className="col-12 m-1 form-control shadow"
                label="E-Mail"
                config={{ type: "City" }}
                placeholder="City"
                onChange={(event) => this.inputChangeHandler(event, "City")}
              />
              <input
                className="col-12 m-1 form-control shadow"
                label="State"
                config={{ type: "State" }}
                placeholder="State"
                onChange={(event) => this.inputChangeHandler(event, "State")}
              />
              <input
                className="col-12 m-1 form-control shadow"
                label="Country"
                config={{ type: "Country" }}
                placeholder="Country"
                onChange={(event) => this.inputChangeHandler(event, "Country")}
              />
              <div className="col-12">Date of Birth</div>
              <input
                className="col-12 m-1 form-control shadow"
                type="date"
                label="dob"
                config={{ type: "dob" }}
                placeholder="Date of Birth"
                onChange={(event) => this.inputChangeHandler(event, "dob")}
              />
              <button
                className="btn btn-dark"
                onClick={() => this.UpdateData()}
              >
                Save Details
              </button>
            </div>
          </main>
        );
      } else
        return (
          <main className="d-flex m-5 justify-content-center">
            <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
              <div className="col-12 text-center display-4">
                New Company Account
              </div>
              <div className="col-12">Website</div>
              <input
                className="col-12 m-1 form-control shadow"
                label="Website"
                config={{ type: "Website" }}
                placeholder="Website"
                onChange={(event) => this.inputChangeHandler(event, "Website")}
              />
              <div className="col-12">Address</div>
              <input
                className="col-12 m-1 form-control shadow"
                label="Street"
                config={{ type: "Street" }}
                placeholder="Street"
                onChange={(event) => this.inputChangeHandler(event, "Street")}
              />
              <input
                className="col-12 m-1 form-control shadow"
                label="City"
                config={{ type: "City" }}
                placeholder="City"
                onChange={(event) => this.inputChangeHandler(event, "City")}
              />
              <input
                className="col-12 m-1 form-control shadow"
                label="E-Mail"
                config={{ type: "State" }}
                placeholder="State"
                onChange={(event) => this.inputChangeHandler(event, "State")}
              />
              <input
                className="col-12 m-1 form-control shadow"
                label="Country"
                config={{ type: "Country" }}
                placeholder="Country"
                onChange={(event) => this.inputChangeHandler(event, "Country")}
              />
              <div className="col-12">Founded</div>
              <input
                className="col-12 m-1 form-control shadow"
                type="date"
                label="Founded"
                config={{ type: "Founded" }}
                placeholder="Founded"
                onChange={(event) => this.inputChangeHandler(event, "Founded")}
              />
              <button
                className="btn btn-dark"
                onClick={() => this.UpdateData()}
              >
                Save Details
              </button>
            </div>
          </main>
        );
    } else {
      return (
        <main className="d-flex m-5 justify-content-center">
          <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
            <div className="col-12 text-center display-4">Loading</div>
          </div>
        </main>
      );
    }
  }
}

export default withRouter(withStitch(FirstLoginData));
