<script>
  import { onMount } from 'svelte';
  import Dialog from './Dialog.svelte';
  import ChatMessageList from './ChatMessageList.svelte';
  import MessageInput from './MessageInput.svelte';
  import MessageSearch from './MessageSearch.svelte';
  import * as api from './api.js';
  import { messages } from './api.js';

  export let user;

  let name = 'general';
  let messageInput;
  let isShowSearch = false;
  let isShowHistory = false;
  let messageHistories = [];
  let messageList;

  onMount(() => messageInput.focus());

  function onKeydown() {
    messageInput.focus();
  }

  function addMessage(event) {
    api.addMessage(user, event.detail.text);
  }

  function onSelectSearchMessage(event) {
    messageList.scrollToMessage(event.detail.messageId);
    onHideSearch();
  }

  function onEdit(event) {
    const {messageId, text} = event.detail;
    api.editMessage(user, messageId, text);
  }

  function onDelete(event) {
    const message = event.detail.message;
    if (confirmDelete(message)) {
      api.deleteMessage(message.id);
    }
  }

  function onShowHistory(event) {
    messageHistories = api.getMessageHistories(event.detail.messageId);
    isShowHistory = true;
  }

  function onHideHistory() {
    messageHistories  = [];
    isShowHistory = false;
    messageInput.focus();
  }

  function onShowSearch() {
    isShowSearch = true;
  }

  function onHideSearch() {
    isShowSearch = false;
    messageInput.focus();
  }

  function confirmDelete(message) {
    return window.confirm(`${message.text} を削除しますか？`);
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .room-header {
    display: flex;
    padding: 10px 20px 0 20px;
  }

  .room-name {
    align-self: center;
    font-weight: bold;
    margin: 0;
  }

  #search-box {
    margin-left: auto;
    margin-bottom: 0;
    cursor: pointer;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    flex: auto;
    overflow: scroll;
  }

  .content {
    display: flex;
    flex: auto;
    flex-direction: column;
  }

  .message-input {
    margin: 0 10px 20px 10px;
  }
</style>


<div class='container' tabindex=0 on:keydown={onKeydown}>
  <header class='room-header'>
    <p class='room-name'>{name}</p>
    <input id='search-box' type='text' placeholder='Search' on:click={onShowSearch} />
  </header>

  <div class='content-container'>
    <div class='content'>
      <ChatMessageList bind:this={messageList} userId={user.id} messages={$messages} showMenu={true} on:edit={onEdit} on:delete={onDelete} on:history={onShowHistory} />
      <div class='message-input'><MessageInput bind:this={messageInput} value='' on:message={addMessage} /></div>
    </div>
  </div>
</div>

{#if isShowHistory}
  <Dialog on:close={onHideHistory}>
    <ChatMessageList userId={user.id} useCompact={false} messages={messageHistories} showMenu={false} />
  </Dialog>
{/if}

{#if isShowSearch}
  <Dialog on:close={onHideSearch}>
    <MessageSearch on:select={onSelectSearchMessage} />
  </Dialog>
{/if}
