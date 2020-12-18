/*import React, { Component } from "react";
import { withUserContext, UserContext } from "./UserContext";
import { withStitch } from "./Stitch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStitch } from "../Stitch";
class UserProfile extends Component {
  state = {
    user: null,
    selectedTab: "Overview",
    editDescription: false,
    searchUser: "",
    searchEmployer: "",
    otherUsers: null,
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
  checkForSearch = (a, b) => {
    a = a.toLowerCase();
    console.log(a);
    b = b.toLowerCase();
    console.log(b);
    if (b.includes(a)) return true;
    else return false;
  };
  Description = () => {
    if (this.state.user.Description) {
      return <div className="col-12">{this.state.user.Description}</div>;
    } else if (this.state.editDescription) {
      return (
        <div>
          <textarea className="col-12 form-control"></textarea>
          <button
            className="btn btn-dark py-0"
            style={{ height: "24px", fontSize: "10px" }}
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
  };
  showSearchedEmployees = () => {
    if (this.state.searchEmployer != "" && this.state.Organisations == null) {
      this.fetchUsers();
    }
    if (this.state.Organisations && this.state.searchEmployer != "") {
      return (
        <div className="col-12 ml-0 p-0">
          {Object.keys(this.state.Organisations).map((orgKey) => {
            if (
              this.checkForSearch(
                this.state.searchEmployer,
                this.state.Organisations[orgKey].name
              )
            )
              return (
                <Link className="col-12 ml-0 btn btn-light border" key={orgKey}>
                  {this.state.Organisations[orgKey].name}
                </Link>
              );
          })}
        </div>
      );
    } else return <div></div>;
  };
  Employer = () => {
    if (this.state.user.Employer && this.state.user.Employer != "") {
      return <div className="col-12">{this.state.user.Employer}</div>;
    } else {
      return (
        <div className="col-12 p-0">
          <input
            className="col-12 form-control shadow"
            label="Employer"
            config={{ type: "Employer" }}
            placeholder="Search your Employer"
            style={{ height: "24px" }}
            onChange={(event) =>
              this.setState({ searchEmployer: event.target.value })
            }
          />
          {this.showSearchedEmployees()}
        </div>
      );
    }
  };
  Overview = () => {
    return (
      <div className="col-12 row overflow-auto">
        <div className="col-3 font-weight-bold pr-2">Employer:</div>
        <div className="col-9">{this.Employer()}</div>
        <div className="col-3 font-weight-bold pr-2">About:</div>
        <div className="col-9">{this.Description()}</div>
        <div className="col-3 font-weight-bold pr-2">Email:</div>
        <div className="col-9">
          <a href={this.state.user.email} className="col-12 pl-0">
            {this.state.user.email}
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
  showFriends = () => {
    if (this.state.user.friends)
      return (
        <div className="col-12">
          {this.state.user.friends.map((friend, id) => (
            <div className="d-flex border-bottom">
              <div className="flex-shrink-1">{friend.name}</div>
              <div className="flex-grow-1"></div>
              <Link
                to={"/messages/" + friend.uid}
                className="btn btn-dark mr-1"
              >
                Message
              </Link>
              <Link
                to={"/remoteProfile/" + friend.uid}
                className="btn btn-dark d-inline-flex mr-1"
              >
                Go To Profile
              </Link>
            </div>
          ))}
        </div>
      );
  };
  fetchUsers = () => {
    if (this.state.Users == null)
      this.props.stitch.client
        .callFunction("fetchUsersforSearch", [])
        .then((response) => {
          console.log(response);
          this.setState({
            Users: response.Users,
            Organisations: response.Organisations,
          });
        });
  };
  addFriend = (id, name) => {
    this.props.stitch.client.callFunction("addFriend", [
      { id: id, name: name },
    ]);
  };
  SearchedFriends = () => {
    if (this.state.otherUsers == null) {
      this.fetchUsers();
    }
    if (this.state.searchUser != "" && this.state.Users != null)
      return (
        <div className="col-12">
          {Object.keys(this.state.Users).map((userId) => {
            if (
              this.checkForSearch(
                this.state.searchUser,
                this.state.Users[userId].name
              )
            )
              return (
                <div className="col-12 px-0 btn-group">
                  <Link
                    to="/Profile/h"
                    className="col-8 px-0 shadow btn btn-light"
                  >
                    {this.state.Users[userId].name}
                  </Link>
                  {this.state.user.friends[this.state.Users[userId].userId] ? (
                    <>
                      {this.state.user.friends[this.state.Users[userId].userId]
                        .confirmed ? (
                        <Link
                          className="col-4 flex-shrink-1 btn btn-dark"
                          to={"message/" + this.state.userId}
                        >
                          Message
                        </Link>
                      ) : (
                        <button className="col-4 flex-shrink-1 btn btn-dark disabled">
                          Requested
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        to={"/remoteProfile/" + this.state.Users[userId].userId}
                      >
                        Show Profile
                      </Link>
                      <button
                        className="col-4 flex-shrink-1 btn btn-dark"
                        onClick={() => {
                          this.addFriend(
                            this.state.Users[userId].userId,
                            this.state.Users[userId].name
                          );
                        }}
                      >
                        Add Friend
                      </button>
                    </>
                  )}
                </div>
              );
          })}
        </div>
      );
    else
      return <div className="col-12 text-muted">Search to find more users</div>;
  };
  SearchFriendsBar = () => {
    return (
      <div>
        <input
          className="col-12 form-control shadow"
          label="Friends"
          config={{ type: "Friends" }}
          placeholder="Search a Friend"
          onChange={(event) =>
            this.setState({ searchUser: event.target.value })
          }
        />
        {this.SearchedFriends()}
        <div className="col-12"></div>
        {this.showFriends()}
      </div>
    );
  };
  Friends = () => {
    return <div className="col-12">{this.SearchFriendsBar()}</div>;
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
              to="/scrum/"
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
    return (
      <div className="col-12 row">
        <div className="col-12 row mb-3">
          <div className="col-3 font-weight-bold">Change Password</div>
          <div className="col-9">
            <input
              className="form-control"
              type="text"
              placeholder="Current Password"
            ></input>
            <input
              className="form-control"
              type="text"
              placeholder="New Password"
            ></input>
            <input
              className="form-control"
              type="text"
              placeholder="New Password"
            ></input>
            <button className="btn btn-dark">save</button>
          </div>
        </div>
        <div className="col-12 row mb-3">
          <div className="col-3 font-weight-bold">Delete Account</div>
          <div className="col-9">
            <input
              className="form-control text-danger"
              type="text"
              placeholder="Type you email here"
            ></input>
            I understand i will not be able to recover this account once this
            action completes
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  };
  panelSwitcher = () => {
    if (this.state.selectedTab == "Overview") return this.Overview();
    if (this.state.selectedTab == "Friends") return this.Friends();
    if (this.state.selectedTab == "Teams") return this.Teams();
    if (this.state.selectedTab == "Settings") return this.Settings();
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
        <div className="overflow-auto flex-grow-1">
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
                    this.state.selectedTab == "Friends"
                      ? "col-12 btn btn btn-light text-primary"
                      : "col-12 btn btn-light text-secondary"
                  }
                  onClick={() => this.setState({ selectedTab: "Friends" })}
                >
                  Friends
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
        </div>
      );
    else return <div></div>;
  }
}

export default withStitch(UserProfile);
