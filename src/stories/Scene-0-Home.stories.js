import React from 'react'
import { action } from '@storybook/addon-actions'
import Home from '../scene/Home'

export default {
  title: '[Scene] Home',
  component: Home,
}

export const Guest = () => (
  <Home
    loggedIn={false}
    setPlayerName={action('type')}
    login={action('login')}
  />
)

export const LoggedIn = () => (
  <Home
    playerName='bookn'
    loggedIn={true}
    setPlayerName={action('type')}
  />
)