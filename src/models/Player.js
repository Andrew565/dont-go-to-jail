export default class Player {
  constructor(id) {
    this.id = id
    this.score = 0
    this.roll = 0
  }

  incrementScore(points) {
    this.score += points
  }

  incrementRoll() {
    this.roll += 1
  }

  resetRoll() {
    this.roll = 0
  }
}