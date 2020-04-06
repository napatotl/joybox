import { matchingPlayers } from './gameHelper'

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
