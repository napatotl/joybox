import React from 'react'
import { action } from '@storybook/addon-actions'
import Answer from '../scene/Answer'

export default {
  title: '[Scene] Answer',
  component: Answer
}

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

const player = {
  name: 'bookn',
  voteTo: '',
  answer: ''
}


export const Answerer = () => {
  return (
    <Answer
      timer={30}
      isAnswerer
      question="1 + 1 = ?"
      player={player}
      setAnswerText={action('type')}
      players={players}
    />
  )
}

export const NotAnswerer = () => (
  <Answer
    timer={30}
    isAnswerer={false}
    question="1 + 1 = ?"
    player={player}
    setAnswerText={action('type')}
    players={players}
  />
)
