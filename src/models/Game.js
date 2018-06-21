import Player from './Player';

export default class Game {
  constructor({ totalScore, maxTurns, numberOfPlayers }) {
    this.totalScore = totalScore
    this.maxTurns = maxTurns
    this.turn = 1

    // Initialize players
    this.numberOfPlayers = numberOfPlayers
    this.players = []

    for (var i = 1, len = numberOfPlayers; i <= len; i++) {
      let player = new Player(i)
      this.players.push(player)
    }

    this.currentPlayer = 0
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayer]
  }

  getNextPlayerNumber() {
    // check if more than one player playing the game
    if (this.players.length > 1) {
      // more than one, so check if the current player is the last player
      if (this.currentPlayer === this.numberOfPlayers - 1) {
        // return that the next player is the first (index 0)
        return 0
      } else {
        // return the next number
        return this.currentPlayer + 1
      }
    } else {
      return 0
    }
  }

  getNextPlayerId() {
    return "#" + (this.getNextPlayerNumber() + 1)
  }

  saveScore(score) {
    this.getCurrentPlayer().incrementScore(score);
  }

  moveOnToNextPlayer() {
    if (this.numberOfPlayers > 1) {
      // Get the next player's index number
      this.currentPlayer = this.getNextPlayerNumber()
      
      // If currentPlayer has been reset to 0, then increment the turn counter one
      if (this.currentPlayer === 0) {
        this.turn++
      }
    } else {
      // Playing a solitaire game, so just have to increment turn
      this.turn++
    }

    const currentPlayer = this.getCurrentPlayer()
    currentPlayer.resetRoll()
  }
}