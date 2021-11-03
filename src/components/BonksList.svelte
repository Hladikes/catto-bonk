<script lang="ts">
  import BonkItem from './BonkItem.svelte'

  import type { Bonk } from 'src/types'

  export let bonks: Bonk[] = []
</script>

<section>
  {#each bonks as bonk (bonk.id)}
    <BonkItem {bonk} />
  {/each}
</section>

<style>
  section {
    display: flex; 
    flex-direction: column-reverse;
    background-image: url(../assets/court.jpg);
    background-size: 100% 100%;
    overflow-y: hidden;
    flex: 1;
  }
</style>