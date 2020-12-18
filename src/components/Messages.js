import React, { Component } from "react";
import { withStitch } from "./Stitch";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";

class Messages extends Component {
  state = {
    fetched: null,
    messages: null,
    watcherInitialised: null,
    activeUser: null,
    message: "",
    showScrumBoard: false,
  };
  componentDidMount() {
    /*this.props.stitch.client
      .callFunction("getMessages", [
        { uid: this.props.stitch.client.auth.currentUser.id },
      ])
      .then((response) => {
        this.setState({ messages: response.messages });
      });*/

    this.getMessages();
  }
  componentDidUpdate() {
    console.log(this.state);
    if (!this.state.watcherInitialised && this.state.messages != null) {
      this.watcher();
      this.setState({ watcherInitialised: true });
    }
    //this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  getMessages() {
    console.log(this.props.stitch.client.auth.currentUser.id);
    const MessagesCollection = this.props.stitch.mongodb
      .db("Messages")
      .collection("Messages");
    const messages = MessagesCollection.find({
      membersArr: this.props.stitch.client.auth.currentUser.id,
      //uid: this.props.stitch.client.auth.currentUser.id,
      //name: this.props.stitch.client.auth.currentUser.customData.name,
    })
      .toArray()
      .then((response) => {
        console.log(response);
        var messages = {};
        response.map((obj, key) => {
          messages[obj[this.props.stitch.client.auth.currentUser.id].uid] = obj;
        });
        this.setState({ messages: messages, fetched: true });
      });
    //this.watcher();
  }
  sendMessage = async () => {
    const MessagesCollection = this.props.stitch.mongodb
      .db("Messages")
      .collection("Messages");
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    var message = {
      $push: {
        messages: {
          uid: this.props.stitch.client.auth.currentUser.id,
          message: this.state.message,
          time: dateTime,
        },
      },
    };
    let query = {
      _id: this.state.messages[this.state.activeUser.uid]._id,
    };
    //query[this.props.stitch.client.auth.currentUser.id] = {};
    //query[this.props.stitch.client.auth.currentUser.id]["uid"] = this.state.activeUser.uid;
    let doc = MessagesCollection.updateOne(query, message, {
      upsert: false,
    }).then((result) => {
      const { matchedCount, modifiedCount } = result;
      if (matchedCount && modifiedCount) {
        console.log(`Successfully updated the team.`);
      }
      return result;
    });
    this.setState({ message: "" });
  };
  watcher = async () => {
    // Create a change stream that watches the collection
    // for when any document's 'status' field is changed
    // to the string 'blocked'.

    const MessagesCollection = this.props.stitch.mongodb
      .db("Messages")
      .collection("Messages");
    const stream = await MessagesCollection.watch({
      $or: [
        {
          "fullDocument.membersArr": this.props.stitch.client.auth.currentUser
            .id,
        },
      ],
    });
    // Set up a change event handler function for the stream
    stream.onNext((event) => {
      console.log("hello there");
      console.log(event.fullDocument);
      var messages = this.state.messages;
      messages[
        event.fullDocument[this.props.stitch.client.auth.currentUser.id].uid
      ] = event.fullDocument;
      this.setState({ messages: messages });
      this.scrollToBottom();
    });
    console.log("hello");
    // Insert a document with status set to 'blocked'
    // to trigger the stream onNext handler
    /*await MessagesCollection.insertOne({
      name: "test",
      status: "blocked",
    });*/
  };
  render() {
    console.log(this.state);
    return (
      <div
        className="d-flex flex-column text-light vh-100 vw-100"
        style={{ position: "fixed", top: 0, backgroundColor: "rgb(50,50,50)" }}
      >
        <div className="flex-row">
          <Navbar />
        </div>
        <div id="topRow" className="flex-row">
          <div className="row m-0 p-0">
            <div
              className="p-2 border-bottom border-secondary"
              style={{ width: "300px" }}
            >
              <input
                className="form-control bg-dark"
                placeholder="search"
              ></input>
            </div>
            <div
              className="px-2 py-3 overflow-hidden flex-grow-1 border-bottom border-left border-secondary"
              style={{ backgroundColor: "rgb(35,35,35)" }}
            >
              {this.state.activeUser ? this.state.activeUser.name : ""}
            </div>
          </div>
        </div>
        <div id="mainArea" className="flex-row d-flex flex-grow-1">
          <div
            id="mainAreaLeft"
            className="flex-row  m-0 px-2 bg-dark overflow-auto"
            style={{ minWidth: "300px", maxWidth: "300px" }}
          >
            {this.state.messages ? (
              Object.keys(this.state.messages).map((chatId) => (
                <button
                  className="col-12 btn btn-dark"
                  onClick={() => {
                    this.setState({
                      activeUser: this.state.messages[chatId][
                        this.props.stitch.client.auth.currentUser.id
                      ],
                      message: "",
                    });
                  }}
                >
                  {
                    this.state.messages[chatId][
                      this.props.stitch.client.auth.currentUser.id
                    ].name
                  }
                </button>
              ))
            ) : (
              <div className="text-secondary">Loading</div>
            )}
          </div>
          <div
            id="mainAreaRight"
            className="flex-column m-0 px-2 flex-grow-1 overflow-auto border-left border-secondary"
          >
            <div className="flex-row px-1 overflow-auto mb-5">
              {this.state.activeUser ? (
                Object.keys(
                  this.state.messages[this.state.activeUser.uid].messages
                ).map((message) =>
                  this.state.messages[this.state.activeUser.uid].messages[
                    message
                  ].uid == this.props.stitch.client.auth.currentUser.id ? (
                    <div className="d-flex col-12 mt-1 justify-content-end">
                      <div className="d-flex col-9 p-0 justify-content-end">
                        <div className="btn btn-primary disabled">
                          {
                            this.state.messages[this.state.activeUser.uid]
                              .messages[message].message
                          }
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex col-12 mt-1 justify-content-start">
                      <div className="d-flex col-9 p-0 justify-content-start">
                        <div className="btn btn-secondary disabled">
                          {
                            this.state.messages[this.state.activeUser.uid]
                              .messages[message].message
                          }
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div></div>
              )}
              <div
                ref={(el) => {
                  this.messagesEnd = el;
                }}
              >
                {""}
              </div>
            </div>
            <div
              className="d-flex col-6 rounded border border-secondary bg-dark px-1"
              style={{
                position: "absolute",
                bottom: "0",
                right: "10px",
              }}
            >
              <input
                value={this.state.message}
                className="flex-grow-1 text-light form-control rounded-0 border-left-0 border-bottom-0 border-top-0 border-secondary bg-dark"
                onChange={(event) => {
                  this.setState({ message: event.target.value });
                }}
              ></input>
              <button
                className={
                  this.state.activeUser
                    ? "flex-shrink-1 btn rounded-0 btn-dark"
                    : "flex-shrink-1 btn rounded-0 btn-dark disabled"
                }
                onClick={() => {
                  this.sendMessage(this.state.activeUser);
                }}
              >
                send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStitch(Messages);
