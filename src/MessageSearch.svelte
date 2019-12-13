<script>
  import { onMount } from 'svelte';
  import ChatMessageList from './ChatMessageList.svelte';
  import * as api from './api.js';

  let searchInput;
  let searchText;
  let messages = [];
  let notFound;

  onMount(() => {
    searchInput.focus();
  });

  function onSearch() {
    if (searchInput.validationMessage) {
      return;
    }

    notFound = false;
    messages = api.searchMessages(searchText);
    notFound = messages.length === 0;
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .search-text {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: solid 1px #ccc;
    border-radius: 0;
  }

  .message-list {
    overflow: scroll;
  }
</style>

<div class='container'>
  <form on:submit|preventDefault={onSearch}>
    <input class='search-text' type='text' placeholder='Search' bind:this={searchInput} bind:value={searchText} required />
  </form>

  {#if messages.length > 0}
    <p>検索結果 {messages.length}件

    <div class='message-list'><ChatMessageList {messages} useCompact={false} showMenu={false} selectable={true} on:select /></div>
  {/if}

  {#if notFound}
    <p>検索結果 0件</p>
  {/if}
</div>
