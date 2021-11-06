<script lang="ts">
  import { scale } from 'svelte/transition'
  import { getCattoImage } from '../util/catto'

  import type { Bonk } from 'src/types'

  export let bonk: Bonk
</script>

<section 
  transition:scale={{ duration: 100 }}
  style={ `flex-direction: ${bonk.left ? 'row' : 'row-reverse'}` }>
  <div>
    <img 
      style={ `opacity: ${bonk.fatal ? '0.5' : '1'}` }
      width="100"
      src={ getCattoImage(0, bonk.left) } 
      alt="catto">

    <p style={ `text-align: ${bonk.left ? 'left' : 'right'}` }>{bonk.bonker.username}</p>
  </div>
</section>

<style>
  section {
    display: flex;
    margin: 0 4px;
  }

  section > div > p {
    font-size: 0.9rem;
    text-shadow: 1px 1px white;
    margin-top: 4px;
  }
</style>