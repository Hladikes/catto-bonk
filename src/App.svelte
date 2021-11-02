<script lang="ts">
  import { io } from 'socket.io-client'
  import { onMount } from 'svelte'
  import { Events } from '../shared'

  import tennisCattoLeftUrl from './assets/tennis-catto-l.png'
  import tennisCattoRightUrl from './assets/tennis-catto-r.png'

  type Bonk = {
    bonker: {
      username: string
    },
    left: boolean,
    fatal: boolean
  }

  type Player = {
    id: string,
    username: string,
    loses: number
  }

  let username = ''
  let joined = false
  let socket = null
  let bonks: Bonk[] = []
  let players: Map<string, Player> = new Map()

  onMount(() => {
    socket = io('http://localhost:8080')
    socket.on('connect', () => {})

    socket.on(Events.BONK, (newBonk: Bonk) => {
      bonks = [ newBonk, ...bonks ]
    })

    socket.on(Events.INIT, (allPlayers: Player[]) => {
      allPlayers.forEach(player => players.set(player.id, player))
      players = players
    })

    socket.on(Events.PLAYER_JOINED, (newPlayer: Player) => {
      players.set(newPlayer.id, newPlayer)
      players = players
    })

    socket.on(Events.PLAYER_LEAVE, (id: string) => {
      players.delete(id)
      players = players
    })

    socket.on(Events.SCORE_UPDATE, ({ playerId, loses }: { playerId: string, loses: number }) => {
      players.get(playerId).loses = loses
      players = players
    })
  })

  const bonk = (left) => {
    socket.emit('bonk', left)
  }

  const join = () => {
    socket.emit(Events.PLAYER_JOIN, username)
    joined = true
  }

</script>

<main>
  {#if !joined}
    <div class="join-container">
      <input 
        maxlength="9"
        placeholder="Username"
        type="text" 
        bind:value={ username }>
      
      {#if username.replace(/ /g, '').length >= 3}
        <button on:click={ join }>Join</button>
      {/if}
    </div>
  {:else}
    <div class="game-container">
      <div class="players-list">
        {#each [...players] as [id, player]}
          <p>{player.username}: {player.loses}</p>
        {/each}
      </div>
      
      <div class="bonks-container">
        <div class="bonks-list">
          {#each bonks as bonk}
            <div 
              class="bonk-item"
              style={ `flex-direction: ${bonk.left ? 'row' : 'row-reverse'}` }>
              <img 
                style={ `opacity: ${bonk.fatal ? '0.5' : '1'}` }
                width="100"
                src={bonk.left ? tennisCattoLeftUrl : tennisCattoRightUrl} 
                title={bonk.bonker.username}
                alt="catto">
            </div>
          {/each}
        </div>
        
        <div class="bonks-controls">
          <button on:click={ () => bonk(true) }>
            <img src={tennisCattoLeftUrl} alt="catto left">
          </button>
          <button on:click={ () => bonk(false) }>
            <img src={tennisCattoRightUrl} alt="catto right">
          </button>
        </div>
      </div>
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

  .join-container {
    padding: 20px;
    background-color: gray;
    box-shadow: 10px 10px 0 black;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .join-container > * {
    font-size: 1.5rem;
  }

  .join-container > input {
    background-color: white;
    padding: 10px;
    box-shadow: 10px 10px 0 black;
  }

  .join-container > input:focus {
    background-color: yellow;
  }

  .join-container > button {
    margin-top: 20px;
    background-color: white;
    box-shadow: 10px 10px 0 black;
    padding: 2px;
  }

  .join-container > button:hover {
    background-color: yellow;
    cursor: pointer;
  }

  .join-container > button:active {
    transform: translate(5px, 5px);
    box-shadow: 5px 5px 0 black;
  }

  .game-container {
    width: 700px;
    height: 500px;
    display: flex;
    flex-direction: row;
    box-shadow: 10px 10px 0 black;
  }

  .players-list {
    width: 200px;
    padding: 10px;
    background-color: #E9671B;
  }

  .bonks-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .bonks-list {
    display: flex; 
    flex-direction: column-reverse;
    background-image: url(./assets/court.jpg);
    background-size: 100% 100%;
    overflow-y: hidden;
    flex: 1;
  }

  .bonk-item {
    display: flex;
  }

  .bonks-controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #E9671B;
    padding: 0 20px;
  }

  .bonks-controls > button {
    background-color: black;
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.4);
    margin: 10px;
    display: flex;
  }

  .bonks-controls > button:hover {
    background-color: yellow;
  }

  .bonks-controls > button:active {
    transform: translate(3px, 3px);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.4);
  }

  .bonks-controls > button > img {
    height: 60px;
    width: 60px;
    padding: 5px
  }
</style>