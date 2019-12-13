<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function onKeydown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  function onClose() {
    dispatch('close');
  }
</script>

<style>
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000a;
    z-index: 1000;
  }

  .content {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    padding: 24px 10px 10px 10px;
    margin: 0;
    background: white;
    border-radius: 4px;
  }

  .close-button {
    position: absolute;
    top: 10%;
    right: calc(10% - 20px);
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0;
    z-index: 100;
    background: none;
    border: none;
    color: #777;
  }
  .close-button:hover {
    background: #ccc;
  }
</style>

<div class='container' on:click={onClose} on:keydown={onKeydown}>
  <button class='close-button' on:click={onClose}>
    <i class="material-icons">close</i>
  </button>
  <div class='content' on:click={e => e.stopPropagation()}>
    <slot></slot>
  </div>
</div>
