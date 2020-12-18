import React, { Component } from "react";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";

class Home extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <div>this is home page </div>
      </div>
    );
  }
}
let HomeWithUser = withUserContext(Home);
export default withStitch(HomeWithUser);
