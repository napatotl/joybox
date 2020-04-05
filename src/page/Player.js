import React, { useState, useEffect } from 'react'
import '../App.css'
import { useObject } from 'react-firebase-hooks/database'
import firebase from 'firebase'

import Home from '../scene/Home'
import Answer from '../scene/Answer'
import Vote from '../scene/Vote'
import VoteResult from '../scene/VoteResult'

const playersRef = firebase.database().ref('players')

const login = async (playerName, setPlayerKey) => {
  const player = await playersRef.push({
    name: playerName,
    score: 0
  })
  return setPlayerKey(player.key)
  // TODO: set into context + localStorage or cookie in case player refresh page
}

const answer = (playerKey, answer) => {
  return playersRef.child(playerKey).update({
    answer
  })
}

const vote = (playerKey, answeredBy) => {
  return playersRef.child(playerKey).update({
    voteTo: answeredBy
  })
}

const Player = () => {
  // state for input
  const [playerName, setPlayerName] = useState('')
  const [answerText, setAnswerText] = useState('')

  // state for logged in player
  const [playerKey, setPlayerKey] = useState(-1) // -1 means not login
  const [player, setPlayer] = useState({})

  const [gameObj] = useObject(firebase.database().ref('game'))
  const [playersObj] = useObject(firebase.database().ref('players'))

  useEffect(() => {
    const playerRef = firebase.database().ref(`players/${playerKey}`)
    let playerListener
    if (playerKey !== -1) {
      playerListener = playerRef.on('value', (snapshot) => {
        const player = snapshot.val()
        if (!player) {
          // restart case
          setPlayerKey(-1)
          playerRef.off('value', playerListener)
        } else {
          setPlayer(player)
        }
      })
    }

    return () => {
      if (playerListener) {
        playerRef.off('value', playerListener)
      }
    }
  }, [playerKey])

  if (!playersObj || !gameObj) {
    return <div>INIT APPLICATION . . .</div>
  }

  const {
    loading,
    currentScene,
    currentMatch,
    timer,
    question,
    answers
  } = gameObj.val()
  const players = playersObj.val()

  if (loading) {
    return <div>LOADING . . .</div>
  }

  switch (currentScene) {
    case 'HOME': {
      const loggedIn = playerKey !== -1      
      return (
        <Home
          playerName={playerName}
          loggedIn={loggedIn}
          setPlayerName={setPlayerName}
          login={() => login(playerName, setPlayerKey)}
        />
      )
    }
    case 'ANSWER': {
      const isAnswerer = player.answererMatchIndexes.includes(currentMatch)
      return (
        <Answer
          timer={timer}
          isAnswerer={isAnswerer}
          question={question}
          setAnswerText={setAnswerText}
          player={player}
          answer={() => answer(playerKey, answerText)}
        />
      )
    }
    case 'VOTE': {
      const isAnswerer = player.answererMatchIndexes.includes(currentMatch)
      return (
        <Vote
          timer={timer}
          isAnswerer={isAnswerer}
          answers={answers}
          question={question}
          players={players}
          player={player}
          vote={(answeredBy) => vote(playerKey, answeredBy)}
        />
      )
    }
    case 'VOTE_RESULT': {
      return (
        <VoteResult
          question={question}
          answers={answers}
          players={players}
        />
      )
    }
    case 'END': {
      return <div>END</div>
    }
    default: {
      return <div>LOADING</div>
    }
  }
}

export default Player
