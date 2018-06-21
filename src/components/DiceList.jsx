import React from "react";
import Die from "./DieComponent";
import DiceStore from "../models/DiceStore";
import "./DiceList.css";

export default class DiceList extends React.Component {
  componentWillMount() {
    document.addEventListener("diceUpdated", () => {
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <div className="DiceList">
          {DiceStore.wordDice.map((item, index) => {
            return <Die die={item} key={index} />;
          })}
        </div>
        <div className="DiceList">
          {DiceStore.propDice.map((item, index) => {
            return <Die die={item} key={index} />;
          })}
        </div>
      </div>
    );
  }
}
