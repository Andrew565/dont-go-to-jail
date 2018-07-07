import React from "react";

const TurnEndModal = props => (
  <article className={`TurnEndModal ${props.showTurnEndModal}`}>
    <h1>Good Round!</h1>
    <p>You earned {props.pointsEarnedThisRound} points this round!</p>
    <button onClick={props.startNextRound}>Move on to Player {props.nextPlayer || 1}</button>
  </article>
);

export default TurnEndModal;
