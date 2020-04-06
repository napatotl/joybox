import { matchingPlayers } from './gameHelper'
import { MAX_PER_MATCH, QUESTIONS } from '../config'

const players = {
  foo1: {
    name: 'foo1'
  },
  foo2: {
    name: 'foo2'
  },
  foo3: {
    name: 'foo3'
  },
  foo4: {
    name: 'foo4'
  },
  foo5: {
    name: 'foo5'
  },
  foo6: {
    name: 'foo6'
  }
}
describe('gameHelper', () => {
  describe('matchingPlayers', () => {
    it('should return correctly matches', () => {
      const matches = matchingPlayers(players)

      for (const match of matches) {
        expect(match.players).toBeInstanceOf(Array)
        expect(match.players.length).toEqual(MAX_PER_MATCH)

        expect(typeof match.question).toEqual('string')
        expect(QUESTIONS).toContain(match.question)
      }
    })
    it('should return matches with same amount of questions for each players', () => {
      const matches = matchingPlayers(players)
      const player1MatchCount = matches.filter(match => match.players.includes('foo1')).length

      for (const key of Object.keys(players)) {
        const playerMatchCount = matches.filter(match => match.players.includes(key)).length
        expect(playerMatchCount).toEqual(player1MatchCount)
      }
    })
  })
})
