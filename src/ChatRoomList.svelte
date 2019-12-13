<script>
  import { createEventDispatcher } from 'svelte';
  import { rooms } from './api.js';

  const dispatch = createEventDispatcher();

  let roomName;
  let roomNameInput;
  let isShowRoomForm = false;

  function showRoomForm() {
    isShowRoomForm = true;
  }
  function hideRoomForm() {
    isShowRoomForm = false;
  }

  function onCreateRoom() {
    if (roomNameInput.validationMessage) {
      return;
    }

    dispatch('add-room', {
      name: roomName,
    });

    roomName = null;
    hideRoomForm();
  }

  function onSelectRoom(roomId) {
    dispatch('select-room', {
      id: roomId,
    });
  }
</script>

<style>
  .room-list-header {
    display: flex;
    color: white;
    align-items: center;
    margin-left: 10px;
  }

  .add-room-button {
    width: 24px;
    height: 24px;
    padding: 0;
    margin: 0 10px 0 auto;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: white;
  }
  .add-room-button:hover {
    background: #63a4ff;
  }

  .room-form {
    padding: 0 10px;
  }
  .room-form > input {
    width: 100%;
  }

  ol {
    padding: 0;
  }

  .room-list-item:hover {
    background: #63a4ff;
  }
  .room-list-item > a {
    display: inline-block;
    color: white;
    width: 100%;
    padding: 4px 10px 4px 20px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<svelte:window on:click={hideRoomForm}/>

<div class='room-list-header'>
  <p>room</p>
  <button class='add-room-button' on:click|stopPropagation={showRoomForm}>
    <i class='material-icons'>add</i>
  </button>
</div>
<ol>
  {#each $rooms as room (room.id)}
    <li class='room-list-item'><a href='/rooms/{room.id}' on:click|preventDefault={() => onSelectRoom(room.id)}>{room.name}</a></li>
  {/each}
  {#if isShowRoomForm}
    <li>
      <form class='room-form' on:submit|preventDefault={onCreateRoom}>
        <input on:click|stopPropagation type='text' bind:this={roomNameInput} bind:value={roomName} required>
      </form>
    </li>
  {/if}
</ol>
