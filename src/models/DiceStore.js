import { POINT_VALUES, PROPERTY_TYPES_IN_VALUE_ORDER } from './Constants'
import { propDice, wordDice } from './Die'

class DiceStore {
  constructor() {
    this.propDice = propDice
    this.wordDice = wordDice
  }

  allDice() {
    // returns a flattened array composed of both wordDice and propDice
    return [].concat.apply([], [this.wordDice, this.propDice])
  }

  rollDice() {
    // get all of the dice and roll them
    this.propDice = this.propDice.map(die => die.rollDie())
    this.wordDice = this.wordDice.map(die => die.rollDie())

    // trigger that the dice have been updated
    this.triggerUpdate()

    // return an object with each of the propDice and wordDice
    return { propDice: this.propDice, wordDice: this.wordDice }
  }

  triggerUpdate() {
    // trigger the 'diceUpdated' event so that die components will refresh
    const rollEvent = new Event('diceUpdated')
    document.dispatchEvent(rollEvent)
  }

  hasGoToJail() {
    // First, iterate over the wordDice and add 1 for every non-null current_face
    const numberOfWords = this.wordDice.reduce((matches, die) => { return matches + (die.current_face !== null) }, 0)

    // if three matches were found, then player has "go to jail"
    return numberOfWords === 3
  }

  propertyAreaDice(propertyType) {
    // determine which held dice, if any, should be added to this area
    const padRet = this.propDice.filter(die => {
      return this.dieBelongsToPropType(die, propertyType) && die.held
    })

    return padRet
  }

  // Determines if the passed-in die belongs to the passed-in propertyType (coerces Utils)
  dieBelongsToPropType(die, propertyType) {
    const dieFace = die.getCurrentFace()

    return (dieFace === propertyType
      || (propertyType === 'Utils'
        && (dieFace === 'Lightbulb'
          || dieFace === 'Water')
      ))
  }

  getScore() {
    // Helper to sift out which property types only need two dice to be a complete set
    const needTwo = ['50', 'Utils', '500']

    // Counter for how many points were won this round
    let totalScore = 0

    // Helper for if a complete set was found
    let hasACompleteSet = false

    // Counter for how many wilds are available for completing sets
    let availableWilds = 0

    // Iterate through the dice and count up how many of each kind there are (this is a poor man's histogram, btw)
    const quantities = this.propDice.reduce(function (obj, die) {
      // getCurrentFace() returns a string version of the face, which we then coerce into 'Utils' if needed
      let face = die.getCurrentFace()
      if (face === 'Lightbulb' || face === 'Water') face = 'Utils'

      // If this die's face is showing 'Wild', add one to the counter of availableWilds
      if (face === 'Wild') availableWilds++

      // If the obj object already has at least one matching die for this face, add 1 to the count
      if (obj[face]) {
        obj[face] += 1
      } else {
        // Otherwise, start off the counter for this face
        obj[face] = 1
      }

      // Because we're doing this in a reduce function, need to return the obj object for the next round
      return obj
    }, {})

    // Now that we know how many of each kind of die there are, check if we have enough to make any complete sets
    PROPERTY_TYPES_IN_VALUE_ORDER.forEach(type => {
      if (hasACompleteSetOf(type)) {
        // Mark that a complete set was found so we skip the step that comes after this one
        hasACompleteSet = true

        // Add the point values for a complete set to the totalScore for this round (can have more than one complete set)
        totalScore += POINT_VALUES[type]
      }
    })

    // If no complete sets, add point value of most valuable property with dice on it
    if (!hasACompleteSet) {
      totalScore += PROPERTY_TYPES_IN_VALUE_ORDER.reduce((points, type) => {
        // Try to coerce the type into a number, because RR's, Utils, and Wilds don't count here
        const typeNum = parseInt(type, 10)

        // Check if typeNum is a number greater than 0 (NaN > 0 == false),
        // then check if we have more than 0 die of this type
        if (typeNum > 0 && quantities[type] > 0) {
          // Take the typeNum (face value) and multiply it by the quantity we have of this type
          const thesePoints = quantities[type] * typeNum

          // Check and see if we'd get more points from this type than any previous combination
          if (thesePoints > points) {
            points = thesePoints
          }
        }

        // Again, reduce function, so return the points counter for the next iteration
        return points
      }, 0)
    }

    return totalScore;

    // This function checks if there are enough 'natural' dice or enough dice + wilds to make a complete set
    function hasACompleteSetOf(type) {
      // Determine first how many are needed for this property type (default is 3)
      const needed = (type === 'RR') ? 4 : (needTwo.includes(type)) ? 2 : 3

      // Get a reference to how many 'natural' dice of this type we have
      let has = quantities[type]

      // If the number we 'has' is more than or equal to the number we need (should never be more than), then return true
      if (has >= needed) {
        return true
      } else if (availableWilds > 0 && (needed - availableWilds <= has)) {
        // We have enough wilds to compose a complete set, so subtract the needed wilds from the number available
        availableWilds -= (needed - has)
        return true
      } else {
        // Not enough naturals or wilds to complete the set for this property type, return false
        return false
      }
    }
  }

  resetDice() {
    // Reset the hold on each die
    this.propDice.forEach(die => die.resetHold())
    this.wordDice.forEach(die => die.resetHold())

    // Roll all of the dice
    this.rollDice()
  }
}

// Create a new instance of the DiceStore and export it for use elsewhere
const diceStore = new DiceStore()
export default diceStore