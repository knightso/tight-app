<script>
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import ChatMessageContent from './ChatMessageContent.svelte';
  import MessageInput from './MessageInput.svelte';

  export let message;
  export let showMenu;
  export let childMessage;
  export let userId;

  const dispatch = createEventDispatcher();

  let messageInput;
  let isEditing = false;

  afterUpdate(() => messageInput && messageInput.focus());

  function onEdit() {
    isEditing = true;
  }

  function cancelEdit() {
    isEditing = false;
  }

  function saveMessage(event) {
    dispatch(event.type, event.detail);
    cancelEdit();
  }
</script>

<style>
  .edit-contaier {
    display: grid;
    grid-template-columns: max-content auto;
    grid-template-rows: auto auto;
    grid-row-gap: 8px;
    grid-column-gap: 8px;

    padding: 20px 20px 0 20px;
  }

  .user-icon {
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .cancel-button {
    border-radius: 4px;
    width: max-content;
  }
</style>

{#if isEditing}
  <div class='edit-contaier'>
    <span class='user-icon'>
      <img src={`https://www.gravatar.com/avatar/${message.from}?default=retro`} width='36px' height='36px' alt='user icon' />
    </span>
    <MessageInput bind:this={messageInput} value={message.text} on:message={saveMessage} />
    <button class='cancel-button' on:click={cancelEdit}>Cancel</button>
  </div>
{:else}
  <ChatMessageContent {message} {showMenu} {userId} {childMessage} on:edit={onEdit} on:delete on:history />
{/if}
