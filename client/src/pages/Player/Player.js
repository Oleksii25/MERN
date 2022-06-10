import React, { useState } from 'react'
import './Player.css';

const Player = () => {
  const [played, setPlayed] = useState(false);

  return (
    <div className="player">
      <div className='player_buttons'>
        <button className='backward'>
        </button>
        {!played ? <button className='play'>
        </button> :
          <button className='pause'>
          </button>}
        <button className='forward'>
        </button>
      </div>
    </div>
  )
}

export default Player;