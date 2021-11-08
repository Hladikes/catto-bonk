<script lang="ts">
  import { io, Socket } from 'socket.io-client'
  import { onDestroy, onMount } from 'svelte'
  import { scale } from 'svelte/transition'
  import { Events } from '../shared'
  import { Sound } from './util/sound'
  import BonkControls from './components/BonkControls.svelte'
  import JoinBox from './components/JoinBox.svelte'
  import BonksList from './components/BonksList.svelte'
  import PlayersList from './components/PlayersList.svelte'

  import backgroundMusicSrc from './assets/sounds/slow-beams.mp3'
  import tennisRacketSoundSrc from './assets/sounds/tennis-racket-sound.wav'
  import sadCatMeowSrc from './assets/sounds/sad-cat-meow.wav'

  import type { Bonk, Player, JoinEventData } from './types'

  let joined: boolean = false
  let error: string = ''
  let socket: Socket = null
  let bonks: Bonk[] = []
  let players: Map<string, Player> = new Map()
  let backgroundMusic: Sound = null
  let tennisRacketSound: Sound = null
  let sadCatMeowSound: Sound = null

  onMount(() => {
    backgroundMusic = new Sound(backgroundMusicSrc, 0.05, true)
    tennisRacketSound = new Sound(tennisRacketSoundSrc, 1, false)
    sadCatMeowSound = new Sound(sadCatMeowSrc, 1, false)

    socket = io(import.meta.env.DEV ? 'http://localhost:8080' : '')
    socket.on('connect', () => {})

    socket.on(Events.JOIN_OK, (data: JoinEventData) => {
      const { players: allPlayers, lastBonk } = data
      
      allPlayers.forEach(player => players.set(player.id, player))
      players = players

      if (lastBonk) {
        bonks = [ lastBonk, ...bonks ]
      }

      joined = true
      backgroundMusic.play()
    })

    socket.on(Events.JOIN_FAIL, (msg) => {
      error = msg
      joined = false
    })

    socket.on(Events.LEAVE_OK, () => {
      joined = false
      backgroundMusic.stop()
      players.clear()
      bonks = []
    })

    socket.on(Events.BONK, (newBonk: Bonk) => {
      bonks = [ newBonk, ...bonks ]
      tennisRacketSound.play()

      if (newBonk.fatal) {
        sadCatMeowSound.play()
      }

      if (bonks.length > 10) {
        bonks.pop()
        bonks = bonks
      }
    })

    socket.on(Events.PLAYER_JOINED, (newPlayer: Player) => {
      players.set(newPlayer.id, newPlayer)
      players = players
    })

    socket.on(Events.PLAYER_LEFT, (id: string) => {
      players.delete(id)
      players = players
    })

    socket.on(Events.SCORE_UPDATE, ({ playerId, score }: { playerId: string, score: number }) => {
      players.get(playerId).score = score
      players = players
    })
  })
  
  const bonk = (event) => socket.emit('bonk', event.detail)
  const join = (event) => socket.emit(Events.JOIN, event.detail)
  const disconnect = () => socket.emit(Events.LEAVE)
  
  onDestroy(disconnect)

</script>

<main>
  {#if !joined}
    <JoinBox {error} on:submit={ join } />
  {:else}
    <div transition:scale={{ duration: 300 }} class="game-container">
      <PlayersList {players} />
      
      <div class="bonks-container">
        <BonksList {bonks} />
      </div>
      
      <div class="disconnect-container">
        <button on:click={ disconnect }>Disconnect</button>
      </div>
      
      <BonkControls on:bonkClick={ bonk } />
    </div>
  {/if}
  
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsl(0, 51%, 21%);
  }

  main > * {
    position: absolute;
  }

  .game-container {
    position: absolute;
    width: 800px;
    height: 500px;
    overflow: hidden;
    box-shadow: 10px 10px 0 black;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto min-content;
    background-color: #E9671B;
  }

  .bonks-container {
    overflow: hidden; 
    display: flex; 
    flex-direction: column-reverse;
  }


  .disconnect-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 0;
  }

  .disconnect-container > button {
    --distance: 7px;
    cursor: pointer;
    background-color: black;
    color: white;
    box-shadow: var(--distance) var(--distance) 0 rgba(0, 0, 0, 0.5);
    padding: 15px;
  }

  .disconnect-container > button:hover {
    color: black;
    background-color: yellow;
  }

  .disconnect-container > button:active {
    --distance: 2px;
    transform: translate(5px, 5px);
  }
</style>