export const randomId = () => Math.random().toString(36).substr(2)

export const createPlayer = (username, catto) => ({
  username,
  catto,
  score: 0,
  id: randomId()
})

export const createBonk = (player, left, fatal) => ({
  bonker: {
    username: player.username,
    catto: player.catto,
    id: player.id
  },
  left,
  fatal,
  id: randomId()
})