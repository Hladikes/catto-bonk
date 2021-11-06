<script lang="ts">
  import { scale } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import CattoPicker from './CattoPicker.svelte'

  const disptach = createEventDispatcher()

  export let error: string = 'Default error message'

  let username: string = ''
  $: isUsernameValid = (username.replace(/ /g, '').length >= 3)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return
    if (!isUsernameValid) return

    submitUsername()
  }

  const submitUsername = () => disptach('submitUsername', username)
</script>

<div>
  {#if error}
    <h1>ERROR</h1>
    <h3>{error}</h3>
  {/if}

  <CattoPicker />

  <input 
    on:keydown={ onKeyDown }
    maxlength="9"
    placeholder="Username"
    type="text" 
    bind:value={ username }>
  
  {#if isUsernameValid}
    <button 
      transition:scale={{ duration: 100 }}
      on:click={ submitUsername }>Join</button>
  {/if}
</div>

<style>
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
    background-color: white;
    padding: 20px;
    box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.5);
  }

  input:focus {
    background-color: yellow;
  }

  button {
    --distance: 7px;
    align-self: center;
    background-color: white;
    box-shadow: var(--distance) var(--distance) 0 rgba(0, 0, 0, 0.5);
    padding: 10px;
  }

  button:hover {
    background-color: yellow;
    cursor: pointer;
  }

  button:active {
    --distance: 3px;
    transform: translate(3px, 3px);
  }
</style>