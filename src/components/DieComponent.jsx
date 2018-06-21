import React from "react";
import "./DieComponent.css";

export default class DieComponent extends React.Component {
  toggleHold() {
    this.setState({ die: this.props.die.toggleHold() });
  }

  render() {
    const die = this.props.die;
    const classes = `Die held__${die.held}`;

    return (
      <div className={classes} onClick={this.toggleHold.bind(this)}>
        <label className={`color__${die.current_face}`}>{die.getFancyFace()}</label>
      </div>
    );
  }
}
