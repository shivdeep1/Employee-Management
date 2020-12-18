import React, { Component } from "react";
import CompanyProfile from "./CompanyProfile";
import { withStitch } from "../Stitch";
import UserProfile from "./UserProfile";
class Profile extends Component {
  state = { user: null, updateId: 1 };
  randomId = () => {
    return Math.floor(Math.random() * 10000);
  };
  watcher = async () => {
    // Create a change stream that watches the collection
    // for when any document's 'status' field is changed
    // to the string 'blocked'.

    const MessagesCollection = this.props.stitch.mongodb
      .db("Users")
      .collection("Users");
    const stream = await MessagesCollection.watch({
      $or: [
        {
          "fullDocument.userId": this.props.stitch.client.auth.currentUser.id,
        },
      ],
    });
    // Set up a change event handler function for the stream
    stream.onNext((event) => {
      console.log(event.fullDocument);
      this.props.stitch.client.auth.refreshCustomData();
      this.setState({ updateId: this.randomId, user: event.fullDocument });
    });
    // Insert a document with status set to 'blocked'
    // to trigger the stream onNext handler
    /*await MessagesCollection.insertOne({
      name: "test",
      status: "blocked",
    });*/
  };
  componentDidUpdate() {
    console.log(this.state);
    if (
      !this.state.user.userId &&
      this.state.user != this.props.stitch.client.auth.currentUser.customData
    ) {
      this.setState({
        updateId: this.randomId(),
        user: this.props.stitch.client.auth.currentUser.customData,
      });
    }
  }
  componentDidMount() {
    this.watcher();
    this.setState({
      updateId: this.randomId(),
      user: this.props.stitch.client.auth.currentUser.customData,
    });
  }
  render() {
    if (this.state.user != null && this.state.user != {}) {
      //console.log(this.props.user);
      if (this.state.user.accountType == "User")
        return (
          <UserProfile user={this.state.user} updateId={this.state.updateId} />
        );
      else if (this.state.user.accountType == "Organisation") {
        return (
          <CompanyProfile
            user={this.state.user}
            updateId={this.state.updateId}
          />
        );
      } else
        return (
          <main className="d-flex m-5 justify-content-center">
            <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
              <div className="col-12 text-center display-4">Loading</div>
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
export default withStitch(Profile);
