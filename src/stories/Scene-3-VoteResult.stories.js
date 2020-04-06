import React from 'react'
import VoteResult from '../scene/VoteResult'

export default {
  title: '[Scene] VoteResult',
  component: VoteResult
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

export const Normal = () => (
  <VoteResult
    question="1 + 1 = ?"
    answers={answers}
    players={players}
  />
)
