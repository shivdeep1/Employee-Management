import React, { Component } from "react";
import { withStitch } from "./Stitch";

class ConfirmEmail extends Component {
  state = { confirmed: false };
  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const token = queryParams.get("token");
    const tokenId = queryParams.get("tokenId");
    console.log(this.props);
    this.props.stitch.confirmMail(token, tokenId).then((result) => {
      console.log(result);
      this.setState({ confirmed: result });
    });
  }
  render() {
    if (this.state.confirmed) {
      return (
        <main className="d-flex m-5 justify-content-center">
          <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
            <div className="col-12 text-center display-4">
              Thank You For Confirming Your Email
            </div>
          </div>
        </main>
      );
    } else {
      return (
        <main className="d-flex m-5 justify-content-center">
          <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
            <div className="col-12 text-center display-4">confirming ...</div>
          </div>
        </main>
      );
    }
  }
}

export default withStitch(ConfirmEmail);
