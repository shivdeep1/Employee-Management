import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStitch } from "../Stitch";
class CompanyProfile extends Component {
  state = {
    user: null,
    selectedTab: "Overview",
    editDescription: false,
    changedDescription: "",
  };
  componentDidMount() {
    if (this.state.user != this.props.user)
      this.setState({ user: this.props.user });
  }
  componentDidUpdate() {
    if (this.state.user != this.props.user) {
      this.setState({ user: this.props.user });
    }
  }
  DisplayCompanyDescription = () => {
    if (this.state.user.Description) {
      if (this.state.editDescription) {
        return (
          <div>
            <textarea
              className="col-12 form-control"
              onChange={(event) => {
                this.setState({ changedDescription: event.target.value });
              }}
            ></textarea>
            <button
              className="btn btn-dark py-0"
              style={{ height: "24px", fontSize: "10px" }}
              onClick={() => {
                this.saveDescritptionChages();
              }}
            >
              Save changes...
            </button>
          </div>
        );
      } else {
        return (
          <div>
            {this.props.user.description}
            <button
              onClick={() => {
                this.setState({
                  changedDescription: this.state.user.description,
                });
              }}
            >
              Edit Description
            </button>
          </div>
        );
      }
    } else {
      if (this.state.editDescription) {
        return (
          <div>
            <textarea
              className="col-12 form-control"
              onChange={(event) => {
                this.setState({ changedDescription: event.target.value });
              }}
            ></textarea>
            <button
              className="btn btn-dark py-0"
              style={{ height: "24px", fontSize: "10px" }}
              onClick={() => {
                this.saveDescritptionChages();
              }}
            >
              Save changes...
            </button>
          </div>
        );
      } else {
        return (
          <button
            className="btn btn-dark py-0"
            style={{ height: "24px", fontSize: "10px" }}
            onClick={() => {
              this.setState({ editDescription: true });
            }}
          >
            Add Description...
          </button>
        );
      }
    }
  };
  Overview = () => {
    return (
      <div className="col-12 row">
        <div className="col-3 font-weight-bold pr-2">About:</div>
        <div className="col-9">{this.DisplayCompanyDescription()}</div>
        <div className="col-3 font-weight-bold pr-2">Website:</div>
        <div className="col-9">
          <a href={this.state.user.Website} className="col-12 pl-0">
            {this.state.user.Website}
          </a>
          <button
            className="btn btn-secondary py-0 disabled"
            style={{ height: "24px", fontSize: "10px" }}
          >
            edit
          </button>
        </div>
        <div className="col-3 font-weight-bold pr-2">Location:</div>
        <div className="col-9">
          <div className="col-12 pl-0">
            {this.state.user.Street},
            <button
              className="btn btn-secondary py-0 disabled"
              style={{ height: "24px", fontSize: "10px" }}
            >
              edit
            </button>
          </div>
          <div className="col-12 pl-0">{this.state.user.City},</div>
          <div className="col-12 pl-0 ">{this.state.user.State},</div>
          <div className="col-12 pl-0">{this.state.user.Country}</div>
        </div>
      </div>
    );
  };
  Employees = () => {
    return (
      <div>
        <div className="col-3 font-weight-bold pr-2">Employees:</div>
        {this.state.user.employees.map((obj, id) => (
          <Link className="col-12 btn btn-dark pl-0">{obj.name}</Link>
        ))}
        <div className="col-3 font-weight-bold pr-2">Requests:</div>
      </div>
    );
  };
  showTeams = () => {
    console.log(this.state.user);
    if (Object.keys(this.state.user.teams).length == 0)
      return <div>No Teams (Add a new team to start)</div>;
    else
      return (
        <div className="col-12">
          {Object.keys(this.state.user.teams).map((teamId) => (
            <Link
              to="/team/"
              className="btn btn-secondary col-12 my-1 mx-0"
              key={teamId}
            >
              {this.state.user.teams[teamId]}-
              {teamId.substring(teamId.length - 4, teamId.length)}
            </Link>
          ))}
        </div>
      );
  };
  addTeam = async () => {
    var name = document.getElementById("newTeamName").value;
    console.log(name);
    if (name.trim() === "") return;
    await this.props.stitch.client
      .callFunction("CreateNewTeam", [
        { name: name, userName: this.state.user.name },
      ])
      .then((result) => {
        console.log("succesful");
        console.log(result);
      });
  };
  Teams = () => {
    return (
      <div className="col-12 row">
        <div className="col-12 btn-group mb-3">
          <input
            id="newTeamName"
            className="form-control col-md-8 col-7"
            placeholder="Team Name"
            type="text"
          ></input>
          <button
            className="btn btn-dark col-md-4 col-5"
            onClick={() => this.addTeam()}
          >
            Add Team
          </button>
        </div>
        <div className="col-3 font-weight-bold pr-2">Teams:</div>
        <div className="col-9">
          <div className="col-12">{this.showTeams()}</div>
        </div>
      </div>
    );
  };
  Settings = () => {
    return <div>Settings</div>;
  };
  panelSwitcher = () => {
    if (this.state.selectedTab == "Overview") return this.Overview();
    if (this.state.selectedTab == "Teams") return this.Teams();
    if (this.state.selectedTab == "Settings") return this.Settings();
    if (this.state.selectedTab == "Employees") return this.Employees();
  };
  mainPanel = () => {
    return (
      <div className="row pt-1 pb-5">
        <div className="col-12 h3 font-weight-light">
          {this.state.selectedTab}
        </div>
        {this.panelSwitcher()}
      </div>
    );
  };
  render() {
    if (this.state.user)
      return (
        <main className="d-flex mt-md-5 justify-content-center">
          <div className="row col-sm-12 col-md-10 col-lg-8 justify-content-center bg-light shadow px-0">
            <div className="col-12 text-center border-bottom display-4 py-5">
              {this.state.user.name}
            </div>
            <div className="col-4 border-right pb-5">
              <button
                className={
                  this.state.selectedTab == "Overview"
                    ? "col-12 btn btn btn-light text-primary"
                    : "col-12 btn btn-light text-secondary"
                }
                onClick={() => this.setState({ selectedTab: "Overview" })}
              >
                Overview
              </button>
              <button
                className={
                  this.state.selectedTab == "Teams"
                    ? "col-12 btn btn btn-light text-primary"
                    : "col-12 btn btn-light text-secondary"
                }
                onClick={() => this.setState({ selectedTab: "Teams" })}
              >
                Teams
              </button>
              <button
                className={
                  this.state.selectedTab == "Employees"
                    ? "col-12 btn btn btn-light text-primary"
                    : "col-12 btn btn-light text-secondary"
                }
                onClick={() => this.setState({ selectedTab: "Employees" })}
              >
                Employees
              </button>
              <button
                className={
                  this.state.selectedTab == "Settings"
                    ? "col-12 btn btn btn-light text-primary"
                    : "col-12 btn btn-light text-secondary"
                }
                onClick={() => this.setState({ selectedTab: "Settings" })}
              >
                Settings
              </button>
            </div>
            <div className="col-8">{this.mainPanel()}</div>
          </div>
        </main>
      );
    else return <div>loading</div>;
  }
}

export default withStitch(CompanyProfile);
