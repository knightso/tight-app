<script>
  import ChatRoom from './ChatRoom.svelte';
  import ChatRoomForm from './ChatRoomForm.svelte';
  import Dialog from './Dialog.svelte';
  import Sidebar from './Sidebar.svelte';
  import SignIn from './SignIn.svelte';
  import * as api from './api.js';
  import { currentUser } from './api.js';

  const title = 'Tight';

  let isShowRoomForm = false;
  let selectedRoom;

  function onSignOut() {
    api.signOut();
  }

  function showRoomForm() {
    isShowRoomForm = true;
  }

  function hideRoomForm() {
    isShowRoomForm = false;
  }

  function createRoom(event) {
    const {name, members} = event.detail;
    const roomId = api.addRoom(name, members);
    hideRoomForm();

    selectedRoom = api.getRoom(roomId);
  }

  function onSelectRoom(event) {
    selectedRoom = api.getRoom(event.detail.id);
  }
</script>

<style>
  :global(body) {
    display: flex;
    margin: 0;
    padding: 0;
    height: auto;
    width: auto;
  }

  :global(input, textarea) {
    padding: 10px;
    border-radius: 4px;
  }

  :global(button) {
    cursor: pointer;
  }

  :global(ol, ul) {
    list-style: none;
    overflow: scroll;
  }

  .add-room {
    display: flex;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .add-room > button {
    margin: auto;
    padding: 20px 40px;
    font-size: 1.2em;
    background: #1976d2;
    border: solid 1px #004ba0;
    border-radius: 4px;
    color: white;
  }
  .add-room > button:hover {
    background: #004ba0;
  }

  .sidebar-container {
    width: max-content;
  }
  main {
    flex: auto;
  }
</style>

<svelte:head>
  <title>{title}</title>
  <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
</svelte:head>

{#if $currentUser}
  <aside class='sidebar-container'>
    <Sidebar
      {title}
      roomId={selectedRoom ? selectedRoom.id : null}
      userName={$currentUser.name}
      on:add-room={showRoomForm}
      on:select-room={onSelectRoom}
      on:signOut={onSignOut}
    />
  </aside>
{/if}

<main>
  {#if $currentUser && selectedRoom}
    <ChatRoom user={$currentUser} room={selectedRoom} />
  {:else if $currentUser && !selectedRoom}
    <div class='add-room'>
      <button class='add-room-button' on:click={showRoomForm} >room を作成する</button>
    </div>
  {:else}
    <SignIn {title} />
  {/if}

  {#if isShowRoomForm}
    <Dialog on:close={hideRoomForm}>
      <ChatRoomForm user={$currentUser} on:create-room={createRoom} />
    </Dialog>
  {/if}
</main>
