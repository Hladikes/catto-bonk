export type Bonk = {
  bonker: {
    username: string,
    id: string,
    catto: number
  },
  left: boolean,
  fatal: boolean,
  id: string
}

export type Player = {
  id: string,
  username: string,
  score: number
}

export type JoinEventData = {
  players: Player[], 
  lastBonk ?: Bonk
}