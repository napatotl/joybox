import React from 'react'
import firebase from 'firebase'
import { useObject } from 'react-firebase-hooks/database'

import { wait } from '../lib/helper'
import { getVotedBy, getAnswersFromPlayers, getPlayersWithAnswererMatchIndexes, matchingPlayers } from '../lib/gameHelper'
import { MINIMUM_PLAYER, ANSWER_TIMER, VOTE_TIMER, VOTE_RESULT_TIMER } from '../config'

const rootRef = firebase.database().ref()
const gameRef = firebase.database().ref('game')
const playersRef = firebase.database().ref('players')
const matchesRef = firebase.database().ref('matches')

const Scene = {
  toAnswer: async (match) => {
    const players = (await playersRef.once('value')).val()
    const newPlayers = {}
    for (const key of Object.keys(players)) {
      const player = players[key]
      newPlayers[key] = {
        ...player,
        voteTo: '',
        answer: ''
      }
    }
    playersRef.set(newPlayers)
    return gameRef.transaction(game => ({
      ...game,
      currentScene: 'ANSWER',
      currentMatch: game.currentMatch + 1,
      timer: ANSWER_TIMER,
      answers: [],
      question: match.question,
      loading: false
    }))
  },
  toVote: async (currentMatch) => {
    const players = (await playersRef.once('value')).val()
    const answers = getAnswersFromPlayers(players, currentMatch)

    gameRef.update({
      currentScene: 'VOTE',
      timer: VOTE_TIMER,
      answers
    })
  },
  toVoteResult: async (currentMatch) => {
    const players = (await playersRef.once('value')).val()
    const answers = getAnswersFromPlayers(players, currentMatch)
    const answersWithVote = answers
      .map(answer => ({
        ...answer,
        votedBy: getVotedBy(players, answer, currentMatch)
      }))

    // TODO: fix calcucate score logic if MAX_PER_MATCH != 2
    const answer0 = answersWithVote[0]
    const answer1 = answersWithVote[1]
    if (answer0.votedBy.length > answer1.votedBy.length) {
      answer0.isWonTheMatch = true
    } else if (answer1.votedBy.length > answer0.votedBy.length) {
      answer1.isWonTheMatch = true
    }

    if (answer0.votedBy.length > 0) {
      const baseScore = answer0.isWonTheMatch ? 100 : 0
      playersRef.child(answer0.answeredBy).update({
        score: players[answer0.answeredBy].score + baseScore + (answer0.votedBy.length * 50)
      })
    }
    if (answer1.votedBy.length > 0) {
      const baseScore = answer1.isWonTheMatch ? 100 : 0
      playersRef.child(answer1.answeredBy).update({
        score: players[answer1.answeredBy].score + baseScore + (answer1.votedBy.length * 50)
      })
    }
    gameRef.update({
      answers: answersWithVote
    })
    matchesRef.child(currentMatch).update({
      answers: answersWithVote
    })
    gameRef.update({
      currentScene: 'VOTE_RESULT',
      timer: VOTE_RESULT_TIMER
    })
  },
  toEnd: async () => (
    gameRef.update({
      currentScene: 'END',
      currentMatch: 0,
      question: '',
      answers: []
    })
  )
}

const countdown = () => (
  new Promise((resolve) => {
    const countdownInterval = setInterval(() => {
      gameRef.transaction((game) => {
        const newTimer = game.timer - 1
        if (newTimer < 0) {
          clearInterval(countdownInterval)
          return resolve()
        }
        return {
          ...game,
          timer: game.timer - 1
        }
      })
    }, 1000)
  })
)

const restart = () => (
  rootRef.set({
    game: {
      loading: false,
      answers: [],
      currentMatch: -1,
      currentScene: 'HOME',
      question: '',
      timer: 0
    },
    players: {},
    matches: []
  })
)

const start = async () => {
  const players = (await playersRef.once('value')).val() || {}
  if (Object.keys(players).length < MINIMUM_PLAYER) {
    return window.alert(`at least ${MINIMUM_PLAYER} players required.`)
  }

  await gameRef.update({
    loading: true
  })

  const matches = matchingPlayers(players)
  await matchesRef.update(matches)

  const playersWithAnswererMatchIndexes = getPlayersWithAnswererMatchIndexes(players, matches)
  await playersRef.update(playersWithAnswererMatchIndexes)

  // wait for players to re-fetch players and game
  await wait(1)

  for (let i = 0; i < matches.length; i += 1) {
    const match = matches[i]
    await Scene.toAnswer(match)
    await countdown()

    await Scene.toVote(i)
    await countdown()

    await Scene.toVoteResult(i)
    await countdown()
  }
  return null
  // Scene.toEnd()
}

const Director = () => {
  const [gameObj] = useObject(firebase.database().ref('game'))
  const [playersObj] = useObject(firebase.database().ref('players'))

  if (!playersObj || !gameObj) {
    return <div>Loading</div>
  }

  const {
    loading,
    currentMatch,
    currentScene,
    timer,
    question
    // answers
  } = gameObj.val()

  // TODO: show answers and players
  return (
    <div>
      <div>Current Scene: {currentScene}</div>
      {
        currentScene !== 'HOME' &&
        (
          <div>
            <div>Current Match: {currentMatch}</div>
            <div>Timer: {timer}</div>
            <div>Question: {question}</div>
          </div>
        )
      }
      <div>Loading: {loading.toString()}</div>
      <input type="button" value="Start" onClick={() => start()} disabled={currentScene !== 'HOME'} />
      <input type="button" value="Restart" onClick={() => restart()} />
    </div>
  )
}

export default Director
