<script lang="ts">
  import type { Player } from '../types'

  export let players: Map<string, Player> = new Map()

  $: sortedPlayersList = Array.from(players.entries())
    .map(([ id, player ]) => {
      return {
        ...player,
        id
      }
    })
    .sort((p1, p2) => {
      return p1.score > p2.score ? -1 : 1
    })
</script>


<section>
  <h3>Scoreboard</h3>
  <div class="players-list">
    {#each sortedPlayersList as player (player.id)}
      <div>
        <p>{player.username}</p>
        <p>{player.score}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    padding: 15px;
  }

  h3 {
    background-color: orange;
    padding: 10px 0;
    text-align: center;
    color: yellow;
    text-shadow: 3px 3px black;
    box-shadow: 4px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
  }

  h6 {
    text-align: left;
    color: black;
    padding: 0 5px;
    padding-top: 10px;
    border-top: 3px solid rgba(0, 0, 0, 0.5);
  }

  .players-list {
    display: flex;
    flex-direction: column;
  }

  .players-list > div {
    margin: 0 5px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  p {
    color: white;
    text-shadow: 3px 3px black;
  }
</style>