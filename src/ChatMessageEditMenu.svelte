<script>
  import { createEventDispatcher } from 'svelte';

  export let owner;

  const dispatch = createEventDispatcher();

  function onEditButton() {
    dispatch('edit');
  }

  function onDeleteButton() {
    dispatch('delete');
  }

  function onShowHistoryButton() {
    dispatch('history');
  }
</script>

<style>
  ol {
    display: flex;
  }
  button {
    height: 28px;
    padding: 0 10px;
    margin: 0;
  }
  button:hover {
    background: #ccc;
  }
  li > button {
    border-radius: 0 0 0 0;
  }
  li:first-child > button {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  li:last-child > button {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style>

<ol>
  {#if owner}
    <li>
      <button on:click={onEditButton}>
        <i class='material-icons'>edit</i>
      </button>
    </li>
    <li>
      <button on:click={onDeleteButton}>
        <i class='material-icons'>delete</i>
      </button>
    </li>
  {/if}
  <li>
    <button on:click={onShowHistoryButton}>
      <i class='material-icons'>history</i>
    </button>
  </li>
</ol>
