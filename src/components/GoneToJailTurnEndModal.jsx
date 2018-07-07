import React from "react";

const GoneToJailTurnEndModal = props => (
  <article className={`TurnEndModal ${props.showGoneToJailModal}`}>
    <h1>Oh No!</h1>
    <p>
      You rolled <strong>Go to Jail</strong>!
    </p>
    <button onClick={props.startNextRound}>Move on to Player {props.nextPlayer || 1}</button>
  </article>
);

export default GoneToJailTurnEndModal;
