import { QUESTIONS } from '../config'
import { shuffle } from './helper'

export const getVotedBy = (players, answer, currentMatch) => {
  const votedBy = []
  for (const key of Object.keys(players)) {
    const player = players[key]
    const isAnswerer = player.answererMatchIndexes.includes(currentMatch)
    if (!isAnswerer && player.voteTo === answer.answeredBy) {
      votedBy.push(key)
    }
  }
  return votedBy
}

export const getAnswersFromPlayers = (players, currentMatch) => {
  const answers = []
  for (const key of Object.keys(players)) {
    const player = players[key]
    const isAnswerer = player.answererMatchIndexes.includes(currentMatch)
    if (isAnswerer) {
      answers.push({
        text: player.answer || '',
        answeredBy: key
      })
    }
  }
  return answers
}

export const getPlayersWithAnswererMatchIndexes = (players, matches) => {
  const playersWithAnswererMatchIndexes = {}
  for (const key of Object.keys(players)) {
    const player = players[key]
    const answererMatchIndexes = matches
      .map((match, index) => ({
        ...match,
        index
      }))
      .filter(match => match.players.includes(key))
      .map(match => match.index)
    playersWithAnswererMatchIndexes[key] = {
      ...player,
      answererMatchIndexes
    }
  }
  return playersWithAnswererMatchIndexes
}

export const matchingPlayers = (players) => {
  // TODO: fix this logic if MAX_PER_MATCH != 2
  const questions = [...QUESTIONS]
  const matches = []
  const playerKeys = Object.keys(players)
  for (let x = 0; x < playerKeys.length; x += 1) {
    const xKey = playerKeys[x]
    for (let y = x + 1; y < playerKeys.length; y += 1) {
      const yKey = playerKeys[y]
      const matchPlayers = [xKey, yKey].sort()
      const questionIndex = Math.floor(Math.random() * questions.length)
      const [question] = questions.splice(questionIndex, 1)
      matches.push({
        question,
        players: matchPlayers
      })
    }
  }
  return shuffle(matches)
}
