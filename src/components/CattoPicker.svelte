<script lang="ts">  
  import { getCattoImage } from '../util/catto'

  const cattos = new Array(4).fill('').map((_, idx) => {
    return {
      src: getCattoImage(idx, true),
      idx
    }
  })

  export let catto: number = 0

  const selectCatto = (idx: number) => {
    catto = idx
  }
</script>

<main>
  <h4>Choose your bonker</h4>
  <br>
  <section>
    {#each cattos as { src, idx }}
      <button 
        class:selected={ idx === catto } 
        on:click={ () => selectCatto(idx) }>
        <img {src} alt="Catto">
        <img class="shadow" {src} alt="Catto shadow">
      </button>
    {/each}
  </section>
</main>

<style>
  h4 {
    text-align: center;
    text-shadow: 2px 2px white;
  }

  section {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 20px;
  }

  button.selected {
    transition: transform 0.15s;
    transform: translateY(-10px);
    padding-bottom: 10px;
    box-shadow: 0 5px 0 yellow, 0 10px 0 green;
  }
  button {
    border-radius: 0;
    background-color: transparent;
    position: relative;
    cursor: pointer;
  }

  section:hover > button:not(:hover) > img:not(.shadow) {
    transition: filter 0.15s, opacity 0.15s;
    filter: grayscale(100%);
    opacity: 0.5;
  }

  section:hover > button:not(:hover) > img.shadow {
    opacity: 0;
  }

  img {
    width: 100%;
  }

  img:not(.shadow) {
    z-index: 999;
    position: relative;
  }

  img.shadow {
    position: absolute;
    left: 4px;
    top: 4px;
    filter: brightness(0%);
    opacity: 0.5;
  }
</style>