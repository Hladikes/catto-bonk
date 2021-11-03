<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import tennisCattoLeftUrl from '../assets/tennis-catto-l.png'
  import tennisCattoRightUrl from '../assets/tennis-catto-r.png'

  const disptach = createEventDispatcher()
  const emitBonk = (left: boolean) => disptach('bonkClick', left)
</script>

<div class="bonks-controls">
  <button on:click={ () => emitBonk(true) }>
    <img src={tennisCattoLeftUrl} alt="catto left">
  </button>
  <button on:click={ () => emitBonk(false) }>
    <img src={tennisCattoRightUrl} alt="catto right">
  </button>
</div>

<style>
  .bonks-controls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #E9671B;
    padding: 0 20px;
  }

  .bonks-controls > button {
    cursor: pointer;
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