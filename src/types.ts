export type Bonk = {
  bonker: {
    username: string
  },
  left: boolean,
  fatal: boolean,
  id: string
}

export type Player = {
  id: string,
  username: string,
  loses: number
}