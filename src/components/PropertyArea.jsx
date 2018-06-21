import React from 'react'
import Die from './DieComponent'
import { POINT_VALUES } from '../models/Constants'
import DiceStore from '../models/DiceStore'
import './PropertyArea.css'

class PropertyArea extends React.Component {
  constructor(props) {
    super(props)

    const dice = DiceStore.propertyAreaDice(props.propertyType)
    this.state = { dice }

    this.updateDice = this.updateDice.bind(this)
  }

  componentDidMount() {
    document.addEventListener('diceUpdated', this.updateDice)
  }

  updateDice() {
    const dice = DiceStore.propertyAreaDice(this.props.propertyType)
    this.setState({ dice })
  }

  renderProperty(i) {
    const die = this.state.dice[i] || null
    const dieComp = (die) ? <Die die={die} /> : null

    return (
      <div key={i} className={`propertyArea-prop color__${this.props.propertyType}`}>
        {dieComp}
      </div>
    )
  }

  renderPropertyTypeLabel() {
    return (
      <span>{POINT_VALUES[this.props.propertyType]}</span>
    )
  }

  render() {
    // setup the appropriate number of spaces for dice to exist on
    let properties = Array.apply(null, Array(this.props.quantity))

    return (
      <div className="propertyArea">
        {properties.map((prop, i) => {
          return this.renderProperty(i)
        })}
        <div className={`propertyArea-prop propertyArea-prop__label`}>
          {this.renderPropertyTypeLabel()}
        </div>
      </div>
    )
  }
}

export default PropertyArea