<script>
  import { createEventDispatcher } from 'svelte';
  import { rooms } from './api.js';

  export let userName;
  export let roomId;

  const dispatch = createEventDispatcher();

  function filterRoomsForUser(allRooms) {
    return allRooms.filter(room => room.members.includes(userName));
  }

  function onAddRoom() {
    dispatch('add-room');
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

  ol {
    padding: 0;
    margin-top: 0;
  }

  .room-list-item:hover {
    background: #63a4ff;
  }
  .room-list-item.selected {
    background: #004ba0;
    border-top: solid 1px #53a4ff;
    border-bottom: solid 1px #53a4ff;
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

<div class='room-list-header'>
  <p>room</p>
  <button class='add-room-button' on:click={onAddRoom}>
    <i class='material-icons'>add</i>
  </button>
</div>
<ol>
  {#each filterRoomsForUser($rooms) as room (room.id)}
    <li class='room-list-item' class:selected={roomId === room.id}>
      <a href='/rooms/{room.id}' on:click|preventDefault={() => onSelectRoom(room.id)}>{room.name}</a>
    </li>
  {/each}
</ol>
