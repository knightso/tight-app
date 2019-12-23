<script>
  import { onMount } from 'svelte';
  import ChatMessageList from './ChatMessageList.svelte';
  import * as api from './api.js';

  export let roomId;

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

    api.searchMessages(roomId, searchText).then(function(msgs) {
      messages = msgs;
      console.log(messages);
      notFound = messages.length === 0;
    })
    .catch(function(error) {
        console.log("Error searching messages: ", error);
    });
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
    padding-left: 40px;
    background: url(https://fonts.gstatic.com/s/i/materialicons/search/v1/24px.svg) no-repeat scroll 7px 7px;
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
    <input class='search-text' type='search' placeholder='Search' bind:this={searchInput} bind:value={searchText} required />
  </form>

  {#if messages.length > 0}
    <p>検索結果 {messages.length}件

    <div class='message-list'><ChatMessageList {messages} useCompact={false} showMenu={false} selectable={true} on:select /></div>
  {/if}

  {#if notFound}
    <p>検索結果 0件</p>
  {/if}
</div>
