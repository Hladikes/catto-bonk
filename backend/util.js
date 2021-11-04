export const randomId = () => Math.random().toString(36).substr(2)

export const createPlayer = (username) => ({
  username,
  score: 0,
  id: randomId()
})

export const createBonk = (username, left, fatal) => ({
  bonker: { username },
  left,
  fatal,
  id: randomId()
})