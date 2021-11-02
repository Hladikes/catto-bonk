import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { Events } from '../shared/index.js'
import { createPlayer } from './util.js'

const app = express()
app.use(express.static('dist'))

const server = http.createServer(app)
const PORT = 8080
const io = new Server(server)

const ROOM = 'room'
const players = new Map()

let lastBonk = false
let bonked = false

io.on('connection', socket => {
  socket.join(ROOM)

  socket.emit(Events.INIT, Array.from(players.values()))

  socket.on(Events.PLAYER_JOIN, username => {
    username = username.substr(0, 9)
    const newPlayer = createPlayer(username)
    players.set(socket, newPlayer)
    io.to(ROOM).emit(Events.PLAYER_JOINED, newPlayer)
  })

  socket.on(Events.BONK, newBonk => {
    const player = players.get(socket)
    if (!player) return

    const isBonkFatal = bonked && (lastBonk === newBonk)
    
    if (!bonked) bonked = true

    if (isBonkFatal) {
      player.loses++
      
      io.to(ROOM).emit(Events.SCORE_UPDATE, {
        playerId: player.id,
        loses: player.loses
      })
    }

    const bonkObj = {
      bonker: {
        username: player.username
      },
      left: newBonk,
      fatal: isBonkFatal
    }

    lastBonk = newBonk
    
    io.to(ROOM).emit(Events.BONK, bonkObj)
  })

  socket.once('disconnect', () => {
    const player = players.get(socket)
    if (!player) return

    io.to(ROOM).emit(Events.PLAYER_LEAVE, player.id)
    players.delete(socket)
  })
})


server.listen(PORT, () => console.log(`[i] Running at port :${PORT}`))