import React from 'react'
import './CurrentPlayerStats.css'

export default function CurrentPlayerStats({ turn, player }) {
  if (!player || !turn) return null

  return (
    <header className="PlayerStats">
      <div className="PlayerStats-playerInfo">
        <img src="http://via.placeholder.com/75x75/dddddd/525252?text=Avatar" alt="" />
        <h1>Player #{player.id}</h1>
      </div>
      <h3>Turn: {turn}</h3>
      <h3>Current Score: {player.score}</h3>
    </header>
  )
}