<script lang="ts">  
  import { getCattoImage } from '../util/catto'

  const cattos = new Array(4).fill('').map((_, idx) => {
    return getCattoImage(idx, true)
  })
</script>

<main>
  <h4>Choose your bonker</h4>
  <br>
  <section>
    {#each cattos as src}
      <button>
        <img {src} width="100%" alt="Catto">
        <img class="shadow" {src} width="100%" alt="Catto">
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

  button {
    background-color: transparent;
    position: relative;
  }

  img:not(.shadow) {
    z-index: 999;
    position: relative;
  }

  img.shadow {
    position: absolute;
    left: 8px;
    top: 8px;
    filter: brightness(0%);
    opacity: 0.5;
  }
</style>