import React, { Component } from "react";

class Button extends Component {
  render() {
    let styleButton = {};
    if (this.props.theme == "light") {
      styleButton = {
        background: "linear-gradient(315deg, #ffffff, #999999)",
        boxShadow: "-5px -5px 10px #666666",
      };
    } else {
      styleButton = {
        background: "linear-gradient(315deg, #484848, #1f1f1f)",
        boxShadow: "-5px -5px 10px #0e0e0e, 5px 5px 10px #363636;",
      };
    }
    styleButton["boxShadow"] = "-5px -5px 10px #0e0e0e, 5px 5px 10px #363636";
    styleButton["borderRadius"] = "5px";
    styleButton["border"] = "none";
    return (
      <button
        onClick={() => {
          this.props.onClick();
        }}
        style={styleButton}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
