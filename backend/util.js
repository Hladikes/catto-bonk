export const randomId = () => Math.random().toString(36).substr(2)

export const createPlayer = (username) => ({
  username,
  loses: 0,
  id: randomId()
})