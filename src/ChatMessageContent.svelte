<script>
  import ChatMessageEditMenu from './ChatMessageEditMenu.svelte';
  import { MD5 } from './api.js';

  export let message;
  export let showMenu;
  export let childMessage;
  export let userId;

  let isActive = false;

  function setActive() {
    isActive = true;
  }

  function clearActive() {
    isActive = false;
  }

  function formattedTimestamp(date) {
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);

    return `${hours}:${minutes}`;
  }
</script>

<style>
  .isActive > .chat-message {
    background: #f0f0f0;
  }
  .container {
    position: relative;
  }

  .chat-message {
    display: grid;
    grid-template-columns: max-content auto;
    grid-row-gap: 2px;
    grid-column-gap: 8px;

    padding: 10px 20px 0 20px;
  }
  .chat-message.childMessage {
    padding: 0 20px 0 20px;
  }

  .user-icon {
    grid-row-start: 1;
    grid-row-end: 3;
    width: 36px;
  }

  .user-name {
    font-weight: bold;
  }

  .timestamp {
    font-size: 0.75rem;
    color: #777;
  }
  .timestamp.child-message {
    grid-row-start: 1;
    grid-row-end: 3;
    width: 36px;
    line-height: calc(1rem * 1.5);
    padding: 0;
    margin: 0;
  }

  .message {
    line-height: 1.5;
    white-space: pre-wrap;
    padding: 0;
    margin: 0;
  }

  .edit-menu {
    position: absolute;
    top: 0;
    right: 20px;
  }
  .edit-menu.childMessage {
    top: -14px;
  }

  .deleted {
    text-decoration: line-through;
  }
</style>

<div class='container' class:isActive on:mouseover={setActive} on:mouseleave={clearActive}>
  <div class='chat-message' class:childMessage>
    {#if childMessage}
      <span class='timestamp child-message'>{isActive ? formattedTimestamp(message.timestamp) : ''}</span>
    {:else}
      <span class='user-icon'>
        <img src={`https://www.gravatar.com/avatar/${MD5(message.userName)}?default=retro`} width='36px' height='36px' alt='user icon' />
      </span>
      <div class='message-header'>
        <span class='user-name'>{message.userName}</span>
        <span class='timestamp'>{formattedTimestamp(message.timestamp)}</span>
      </div>
    {/if}

    <p class='message' class:deleted={message.deleted}>{message.text}</p>
  </div>

  {#if isActive && showMenu}
    <span class='edit-menu' class:childMessage>
      <ChatMessageEditMenu owner={message.userId === userId} on:edit on:delete on:history />
    </span>
  {/if}
</div>

