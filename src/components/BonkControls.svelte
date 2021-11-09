<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'

  const disptach = createEventDispatcher()
  const emitBonk = (left: boolean) => disptach('bonkClick', left)

  let isLeftPressed: boolean = false
  let isRightPressed: boolean = false

  const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase()

    if (key === 'a' && !isLeftPressed) {
      isLeftPressed = true
      emitBonk(true)
      return
    }

    if (key === 'd' && !isRightPressed) {
      isRightPressed = true
      emitBonk(false)
      return
    }
  }

  const onKeyUp = () => {
    isRightPressed = false
    isLeftPressed = false
  }

  onMount(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
  })

  onDestroy(() => {
    document.removeEventListener('keydown', onKeyDown)
    document.removeEventListener('keyup', onKeyUp)
  })
</script>

<div>
  <p class:active={ isLeftPressed }>[A]</p>
  <p class:active={ isRightPressed }>[D]</p>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }

  p {
    & {
      text-shadow: 2px 2px white;
      font-size: 1.25rem;
      line-height: 1.5rem;
    }

    &.active {
      background-color: yellow;
      text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
    }
  }
</style>