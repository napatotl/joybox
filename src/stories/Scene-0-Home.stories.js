import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import Home from '../scene/Home'

export default {
  title: '[Scene] Home',
  component: Home
}

export const Guest = () => {
  const [playerName, setPlayerName] = useState('')
  return (
    <Home
      loggedIn={false}
      setPlayerName={setPlayerName}
      playerName={playerName}
      login={action('login')}
    />
  )
}

export const LoggedIn = () => (
  <Home
    loggedIn
    playerName="bookn"
    setPlayerName={action('type')}
  />
)
