<script>
  import { onMount } from 'svelte';
  import Dialog from './Dialog.svelte';
  import ChatMessageList from './ChatMessageList.svelte';
  import MessageInput from './MessageInput.svelte';
  import MessageSearch from './MessageSearch.svelte';
  import UserList from './UserList.svelte';
  import * as api from './api.js';

  export let user;
  export let room;

  $: messages = api.getMessages(room.id);

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
    console.log('addMessage', room);
    api.addMessage(room, user, event.detail.text);
  }

  function onSelectSearchMessage(event) {
    messageList.scrollToMessage(event.detail.messageId);
    onHideSearch();
  }

  function onEdit(event) {
    const {messageId, text} = event.detail;
    api.editMessage(room.id, user, messageId, text);
  }

  function onDelete(event) {
    const message = event.detail.message;
    if (confirmDelete(message)) {
      api.deleteMessage(room.id, message.id);
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
    padding-left: 40px;
    background: url(https://fonts.gstatic.com/s/i/materialicons/search/v1/24px.svg) no-repeat scroll 7px 7px;
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

  .sidebar {
    margin-top: 0.5rem;
    border-top: solid 1px #ccc;
    border-left: solid 1px #ccc;
    width: 20vw;
    max-width: 240px;
    background: #fafafa;
    overflow: scroll;
  }
  .sidebar-title {
    margin: 0;
    padding: 10px;
    text-align: center;
    border-bottom: solid 1px #ccc;
    font-size: 1.5rem;
    font-weight: normal;
  }
</style>

<div class='container' tabindex=0 on:keydown={onKeydown}>
  <header class='room-header'>
    <p class='room-name'>{room.name}</p>
    <input id='search-box' type='text' placeholder='Search' on:click={onShowSearch} />
  </header>

  <div class='content-container'>
    <div class='content'>
      <ChatMessageList bind:this={messageList} userId={user.id} messages={$messages} showMenu={true} on:edit={onEdit} on:delete={onDelete} on:history={onShowHistory} />
      <div class='message-input'><MessageInput bind:this={messageInput} value='' on:message={addMessage} /></div>
    </div>

    <div class='sidebar'>
      <h1 class='sidebar-title'>Members</h1>
      <UserList emails={room.members} />
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
    <MessageSearch roomId={room.id} on:select={onSelectSearchMessage} />
  </Dialog>
{/if}
