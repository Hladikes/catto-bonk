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
      </button>
    {/each}
  </section>
</main>

<style lang="scss">
  h4 {
    text-align: center;
    text-shadow: 2px 2px white;
  }

  section {
    & {
      display: grid;
      grid-template-columns: auto auto auto auto;
      gap: 20px;
    }

    button {
      & {
        border-radius: 0;
        background-color: transparent;
        position: relative;
        cursor: pointer;
      }

      img {
        & {
          --shadow-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          filter: drop-shadow(4px 4px var(--shadow-color));
        }
      }

      &:hover {
        img {
          --shadow-color: yellow;
        }
      }

      &.selected {
        img {
          --shadow-color: cyan;
        }
      }
    }
  }
</style>