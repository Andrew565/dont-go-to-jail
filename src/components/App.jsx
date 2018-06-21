import React, { Component } from "react";
import "./App.css";
import CurrentPlayerStats from "./CurrentPlayerStats";
import DiceList from "./DiceList";
import PropertyArea from "./PropertyArea";
import DiceStore from "../models/DiceStore";
import Game from "../models/Game";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: null,
      maxTurns: null,
      numberOfPlayers: 1,
      totalScore: 15000,
      showGoneToJailModal: "hide",
      showTurnEndModal: "hide"
    };
  }

  componentWillMount() {
    document.addEventListener("diceUpdated", () => {
      this.forceUpdate();
    });
  }

  rollDice = () => {
    const currentPlayer = this.state.game.getCurrentPlayer();
    currentPlayer.incrementRoll();
    DiceStore.rollDice();

    if (DiceStore.hasGoToJail()) {
      this.showGoneToJailModal();
    }
  };

  onStartNewGame = () => {
    const game = new Game(this.state);
    this.setState({ game });
  };

  onPlayersChange = e => {
    this.setState({ numberOfPlayers: parseInt(e.target.value, 10) });
  };

  onTotalScoreChange = e => {
    this.setState({ totalScore: e.target.value });
  };

  startNextRound = () => {
    // Reset modals
    this.setState({
      showGoneToJailModal: "hide",
      showTurnEndModal: "hide"
    });

    if (!DiceStore.hasGoToJail()) {
      const pointsEarnedThisRound = DiceStore.getScore();
      this.state.game.saveScore(pointsEarnedThisRound);
    }

    // Set new current player
    this.state.game.moveOnToNextPlayer();

    // Reset dice
    DiceStore.resetDice();
  };

  showGoneToJailModal = () => {
    this.setState({ showGoneToJailModal: "show" });
  };

  showTurnEndModal = () => {
    const pointsEarnedThisRound = DiceStore.getScore();
    const nextPlayer = this.state.game.getNextPlayerId();
    this.setState({ showTurnEndModal: "show", pointsEarnedThisRound, nextPlayer });
  };

  renderGoneToJailTurnEnd() {
    return (
      <article className={`TurnEndModal ${this.state.showGoneToJailModal}`}>
        <h1>Oh No!</h1>
        <p>
          You rolled <strong>Go to Jail</strong>!
        </p>
        <button onClick={this.startNextRound}>Move on to Player {this.state.nextPlayer || 1}</button>
      </article>
    );
  }

  renderManualTurnEnd() {
    return (
      <article className={`TurnEndModal ${this.state.showTurnEndModal}`}>
        <h1>Good Round!</h1>
        <p>You earned {this.state.pointsEarnedThisRound} points this round!</p>
        <button onClick={this.startNextRound}>Move on to Player {this.state.nextPlayer || 1}</button>
      </article>
    );
  }

  renderModals() {
    return (
      <div>
        {this.renderGoneToJailTurnEnd()}
        {this.renderManualTurnEnd()}
      </div>
    );
  }

  renderPropertyArea(propertyType, quantity = 3) {
    return <PropertyArea propertyType={propertyType} quantity={quantity} />;
  }

  render() {
    const hasGame = this.state.game !== null;
    const showSetup = hasGame ? "hide" : "show";
    const showBoard = hasGame ? "show" : "hide";
    const currentPlayer = hasGame && this.state.game.getCurrentPlayer();
    const showDice = currentPlayer && currentPlayer.roll !== 0 ? "show" : "hide";

    return (
      <div className="App">
        {this.state.game && this.renderModals()}
        <header className={`App-header ${showSetup}`}>
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h2>Don't Go To Jail!</h2>
        </header>
        <div className={`AppIntro ${showSetup}`}>
          <div className="AppIntro-rules">
            <p>Roll the dice, pick some to keep, reroll the rest.</p>
            <p>Roll "Go To Jail" and your turn is up!</p>
          </div>
          <div className="AppIntro-setup">
            <h1>Setup</h1>
            <p>
              <label htmlFor="numberOfPlayers">How many Players?</label>
              <br />
              <input type="number" value={this.state.numberOfPlayers} onChange={this.onPlayersChange} />
            </p>
            <p>
              <label htmlFor="totalScore">What score do you want to play to?</label>
              <br />
              <input type="number" value={this.state.totalScore} onChange={this.onTotalScoreChange} />
            </p>
            <button onClick={this.onStartNewGame}>Start Game</button>
          </div>
        </div>
        <div className={`App-board ${showBoard}`}>
          <main className="App-main">
            <section>
              {this.renderPropertyArea("50", 2)}
              {this.renderPropertyArea("100")}
              {this.renderPropertyArea("200")}
              {this.renderPropertyArea("RR", 4)}
              {this.renderPropertyArea("400")}
            </section>
            <section>
              {this.renderPropertyArea("Utils", 2)}
              {this.renderPropertyArea("150")}
              {this.renderPropertyArea("250")}
              {this.renderPropertyArea("300")}
              {this.renderPropertyArea("500", 2)}
            </section>
          </main>
          <aside>
            <CurrentPlayerStats turn={this.state.game && this.state.game.turn} player={currentPlayer} />
            <div className={`App-diceArea ${showBoard}`}>
              <DiceList className={showDice} />
            </div>
            <div className="App-actions">
              <button onClick={this.rollDice}>Roll Dice</button>
              <button onClick={this.showTurnEndModal}>End Turn</button>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}
