import React from 'react'
import { action } from '@storybook/addon-actions'
import Vote from '../scene/Vote'

export default {
  title: '[Scene] Vote',
  component: Vote,
}

const player = {
  name: 'bookn',
  voteTo: '',
  answer: ''
}
const answers = [
  { answeredBy: '-M3qkcLoYB1qwyQ7EOWy', text: '1' },
  { answeredBy: '-M3qkcZ8Y4Lq51AZTfLr', text: '2' }
]
const players = {
  '-M3qkcLoYB1qwyQ7EOWy': {
    answer: 'กุเอง',
    answererMatchIndexes: [0, 2],
    name: 'bookn',
    score: 0,
    voteTo: '-M3qkcZ8Y4Lq51AZTfLr'
  },
  '-M3qkcZ8Y4Lq51AZTfLr': {
    answer: 'หนูเอง',
    answererMatchIndexes: [0, 1],
    name: 'eiei',
    score: 300,
    voteTo: '-M3qkcqRFiTFlrPliv8R'
  },
  '-M3qkcqRFiTFlrPliv8R': {
    answer: 'อิอิ',
    answererMatchIndexes: [1, 2],
    name: 'huhu',
    score: 150,
    voteTo: '-M3qkcZ8Y4Lq51AZTfLr'
  }
}

export const Answerer = () => (
  <Vote
      timer={30}
      isAnswerer={true}
      question={'1 + 1 = ?'}
      player={player}
      players={players}
      vote={action('vote')}
      answers={answers}
    />
)

export const NotAnswerer = () => (
  <Vote
      timer={30}
      isAnswerer={false}
      question={'1 + 1 = ?'}
      player={player}
      players={players}
      vote={action('vote')}
      answers={answers}
    />
)
