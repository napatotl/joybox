import React from 'react'
import { action } from '@storybook/addon-actions'
import Answer from '../scene/Answer'

export default {
  title: '[Scene] Answer',
  component: Answer,
}

const player = {
  name: 'bookn',
  voteTo: '',
  answer: ''
}


export const Answerer = () => (
  <Answer
      timer={30}
      isAnswerer={true}
      question={'1 + 1 = ?'}
      player={player}
      setAnswerText={action('type')}
      answer={action('answer')}
    />
)

export const NotAnswerer = () => (
  <Answer
      timer={30}
      isAnswerer={false}
      question={'1 + 1 = ?'}
      player={player}
      setAnswerText={action('type')}
      answer={action('answer')}
    />
)
