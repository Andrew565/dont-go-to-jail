import React from "react";

const WinnersModal = props => {
  if (!props.winners) return null;

  return (
    <article className={`TurnEndModal ${props.showWinnersModal}`}>
      <h1>Congratulations!</h1>
      {props.numberOfPlayers > 0 ? (
        <div>
          <h2>Here's who won:</h2>
          {props.winners.map((winner, i) => (
            <p key={i}>
              Player #{winner.id} with a score of {winner.score}
            </p>
          ))}
        </div>
      ) : (
        <div>
          <h2>You Won!</h2>
          <p>Your total score was {props.winners[0].score}</p>
        </div>
      )}
      <button onClick={props.startNewGame}>Start a New Game?</button>
    </article>
  );
};

export default WinnersModal;
