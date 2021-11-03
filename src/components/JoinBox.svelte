<script lang="ts">
  import { scale } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'

  const disptach = createEventDispatcher()

  let username: string = ''
  $: isUsernameValid = (username.replace(/ /g, '').length >= 3)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return
    if (!isUsernameValid) return

    submitUsername()
  }

  const submitUsername = () => disptach('submitUsername', username)
</script>

<div class="join-container">
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
  .join-container {
    padding: 30px;
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
    padding: 20px;
    box-shadow: 10px 10px 0 black;
  }

  .join-container > input:focus {
    background-color: yellow;
  }

  .join-container > button {
    margin-top: 20px;
    background-color: white;
    box-shadow: 10px 10px 0 black;
    padding: 10px;
  }

  .join-container > button:hover {
    background-color: yellow;
    cursor: pointer;
  }

  .join-container > button:active {
    transform: translate(5px, 5px);
    box-shadow: 5px 5px 0 black;
  }
</style>