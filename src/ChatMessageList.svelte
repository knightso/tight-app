<script>
  import { beforeUpdate, afterUpdate, createEventDispatcher, onMount } from 'svelte';
  import ChatMessage from './ChatMessage.svelte';

  export let userId = null;
  export let messages;
  export let showMenu;
  export let selectable = false;
  export let useCompact = true;

  export function scrollToMessage(messageId) {
    document.getElementById(messageId).scrollIntoView(false);
  }

  const dispatch = createEventDispatcher();

  let groupedMessage = [];
  let dates = [];
  $: {
    groupedMessage = (messages || []).reduce((acc, message) => {
      const date = messageDate(message);
      const messages = acc[date] || [];
      acc[date] = messages.concat(message);
      return acc;
    }, {});
    dates = Object.keys(groupedMessage).map(key => +key).sort();
  }

  function messageDate(message) {
    const year = message.timestamp.getFullYear();
    const month = message.timestamp.getMonth();
    const day = message.timestamp.getDate();

    return new Date(year, month, day).getTime();
  }

  function formatDate(d) {
    return new Date(d).toDateString();
  }

  let messageList;
  let autoscroll;

  onMount(() => messageList.scrollTo(0, messageList.scrollHeight));

  beforeUpdate(() => {
    autoscroll = messageList && (messageList.offsetHeight + messageList.scrollTop) > (messageList.scrollHeight - 40);
  });

  afterUpdate(() => {
    if (autoscroll) {
      messageList.scrollTo(0, messageList.scrollHeight);
    }
  });

  function onSelect(messageId) {
    dispatch('select', {
      messageId: messageId
    });
  }

  function onEdit(messageId, event) {
    dispatch('edit', {
      messageId: messageId,
      text: event.detail.text,
    });
  }

  function onDelete(message) {
    dispatch('delete', {
      message: message,
    });
  }

  function onShowHistory(messageId) {
    dispatch('history', {
      messageId: messageId,
    });
  }
</script>

<style>
  .date-indicator-container {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }
  .date-indicator {
    width: max-content;
    margin: auto;
    padding: 0 20px;
    background: white;
  }
  .date-indicator:before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 50%;
    height: 1px;
    left: 0;
    margin-top: 0.5em;
    z-index: -1;
    background: #ccc;
  }
  .date-indicator:after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 50%;
    height: 1px;
    right: 0;
    margin-top: 0.5em;
    z-index: -1;
    background: #ccc;
  }

  .grouped-message-list {
    flex: auto;
    padding: 0 0 20px 0;
    margin: 0;
  }

  .message-list {
    padding: 0;
    margin: 0;
  }
  .selectable {
    cursor: pointer;
  }
</style>

{#if dates.length === 0}
  <div class='date-indicator-container'>
    <p class='date-indicator'></p>
  </div>
{/if}

<ol bind:this={messageList} class='grouped-message-list'>
  {#each dates as date}
    <li>
      <div>
        <div class='date-indicator-container'>
          <p class='date-indicator'>{formatDate(date)}</p>
        </div>
        <ol class='message-list'>
          {#each groupedMessage[date] as message, i (message.id)}
            <li class:selectable id={message.id} on:click={e => onSelect(message.id)}>
              <ChatMessage
                {userId}
                {message}
                {showMenu}
                childMessage={useCompact && i > 0 && groupedMessage[date][i-1].userId === message.userId}
                on:message={e => onEdit(message.id, e)}
                on:delete={() => onDelete(message)}
                on:history={() => onShowHistory(message.id)}
              />
            </li>
          {/each}
        </ol>
      </div>
    </li>
  {/each}
</ol>
