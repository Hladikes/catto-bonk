export const randomId = () => Math.random().toString(36).substr(2)

export const createPlayer = (username) => ({
  username,
  score: 0,
  id: randomId()
})

export const createBonk = (player, left, fatal) => ({
  bonker: {
    username: player.username,
    id: player.id
  },
  left,
  fatal,
  id: randomId()
})