import Player from "./Player";

export default class Game {
  constructor({ totalScore, maxTurns, numberOfPlayers }) {
    this.totalScore = totalScore; // Keeps track of the target score in order to win
    this.maxTurns = maxTurns; // In case a shorter or longer game is desired, players can (eventually) opt to play by number of turns rather than score
    this.turn = 1; // Initializes the game at "turn 1"
    this.lastTurn = false; // Tracks if someone has achieved the winning conditions and so the round needs to finish

    // Initialize players
    this.numberOfPlayers = numberOfPlayers; // Tracks how many players are in the game
    this.players = []; // Holds a collection of the game's players

    // Programmatically creates a player, up to the number in the game, and adds them to the players collection
    for (var i = 1, len = numberOfPlayers; i <= len; i++) {
      let player = new Player(i);
      this.players.push(player);
    }

    // Initially, the currentPlayer is the first one
    this.currentPlayer = 0;

    // Initially, there are no winners yet
    this.winners = null;
  }

  checkForWinner(score) {
    if (!this.lastTurn) {
      this.lastTurn = score >= this.totalScore;
    }
  }

  declareWinners() {
    // Get the list of winners
    this.winners = this.players
      .filter(player => player.score >= this.totalScore)
      .sort((a, b) => (a.score > b.score ? -1 : 1));

    // If at least one winner, declare it!
    if (this.winners.length > 0) {
      // trigger the 'diceUpdated' event so that die components will refresh
      const wonEvent = new Event("winnersDeclared");
      document.dispatchEvent(wonEvent);
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }

  getNextPlayerId() {
    return "#" + (this.getNextPlayerNumber() + 1);
  }

  getNextPlayerNumber() {
    // check if more than one player playing the game
    if (this.players.length > 1) {
      // more than one, so check if the current player is the last player
      if (this.currentPlayer === this.numberOfPlayers - 1) {
        // return that the next player is the first (index 0)
        return 0;
      } else {
        // return the next number
        return this.currentPlayer + 1;
      }
    } else {
      return 0;
    }
  }

  moveOnToNextPlayer() {
    if (this.numberOfPlayers > 1) {
      // Get the next player's index number
      this.currentPlayer = this.getNextPlayerNumber();

      // If currentPlayer has been reset to 0...
      if (this.currentPlayer === 0) {
        // check if this was the lastTurn; if so, declare winners, else increment the turn counter by one
        this.lastTurn ? this.declareWinners() : this.turn++;
      }
    } else {
      // Playing a solitaire game, so just have to increment turn or declare player has won
      this.lastTurn ? this.declareWinners() : this.turn++;
    }

    this.getCurrentPlayer().resetRoll();
  }

  saveScore(score) {
    let currentScore = this.getCurrentPlayer().incrementScore(score);
    return this.checkForWinner(currentScore);
  }
}
