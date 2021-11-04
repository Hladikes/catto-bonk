import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { Events } from '../shared/index.js'
import { createBonk, createPlayer, randomId } from './util.js'

// Express & WebSockets configuration
const PORT = 8080
const app = express()
app.use(express.static('dist'))
const server = http.createServer(app)
const io = new Server(server)

const ROOM = 'room'
const players = new Map()

let lastBonkOrientation = false
let lastBonk = null
let bonked = false

io.on('connection', socket => {

  const playerLeave = () => {
    const player = players.get(socket)
    if (!player) return

    io.to(ROOM).emit(Events.PLAYER_LEAVE, player.id)
    socket.leave(ROOM)
    players.delete(socket)
    
    if (players.size === 0) bonked = false
  }

  socket.on(Events.PLAYER_JOIN, username => {
    username = username.substr(0, 9)
    const newPlayer = createPlayer(username)
    players.set(socket, newPlayer)
    socket.join(ROOM)    
    socket.emit(Events.INIT, {
      players: Array.from(players.values()),
      lastBonk
    })
    socket.emit(Events.JOIN_OK)
    io.to(ROOM).emit(Events.PLAYER_JOINED, newPlayer)
  })

  socket.on(Events.BONK, newBonkOrientation => {
    const player = players.get(socket)
    if (!player) return

    const isBonkFatal = bonked && (lastBonkOrientation === newBonkOrientation)
    
    if (!bonked) bonked = true

    player.score += isBonkFatal ? -3 : 1

    io.to(ROOM).emit(Events.SCORE_UPDATE, {
      playerId: player.id,
      score: player.score
    })

    const bonk = createBonk(player.username, newBonkOrientation, isBonkFatal)

    lastBonk = bonk
    lastBonkOrientation = newBonkOrientation
    
    io.to(ROOM).emit(Events.BONK, bonk)
  })

  socket.on(Events.PLAYER_LEAVE, () => {
    playerLeave()
    socket.emit(Events.LEAVE_OK)
  })

  socket.once('disconnect', () => {
    playerLeave()
  })
})


server.listen(PORT, () => console.log(`[i] Running at port :${PORT}`))