<script lang="ts">
  import { scale } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import CattoPicker from './CattoPicker.svelte'

  const dispatch = createEventDispatcher()

  export let error: string = 'Default error message'

  let username: string = ''
  let catto: number = 0
  $: isUsernameValid = (username.replace(/ /g, '').length >= 3)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return
    if (!isUsernameValid) return

    submit()
  }

  const submit = () => dispatch('submit', {
    username,
    catto
  })
</script>

<div transition:scale={{ duration: 300 }}>
  {#if error}
    <h1>ERROR</h1>
    <h3>{error}</h3>
  {/if}

  <CattoPicker bind:catto />

  <input 
    on:keydown={ onKeyDown }
    maxlength="9"
    placeholder="Username"
    type="text" 
    bind:value={ username }>
  
  {#if isUsernameValid}
    <button 
      transition:scale={{ duration: 100 }}
      on:click={ submit }>Join</button>
  {/if}
</div>

<style lang="scss">
  * {
    font-size: 1.5rem;
  }
  
  div {
    width: 600px;
    padding: 30px;
    background-color: darkorange;
    box-shadow: 10px 10px 0 black;
    display: flex;
    flex-direction: column;
    position: absolute;
    gap: 20px;
  }

  h1, h3 {
    color: red;
    text-shadow: 4px 4px black;
  }

  h3 {
    font-size: 0.9rem;
    text-shadow: 3px 3px black;
  }

  input {
    & {
      background-color: white;
      padding: 20px;
      box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.5);
    }

    &:focus {
      background-color: yellow;
    }
  }

  button {
    & {
      --distance: 7px;
      align-self: center;
      background-color: white;
      box-shadow: var(--distance) var(--distance) 0 rgba(0, 0, 0, 0.5);
      padding: 10px;
    }

    &:hover {
      background-color: yellow;
      cursor: pointer;
    }

    &:active {
      --distance: 3px;
      transform: translate(3px, 3px);
    }
  }
</style>