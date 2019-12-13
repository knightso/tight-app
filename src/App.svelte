<script>
  import ChatRoom from './ChatRoom.svelte';
  import Sidebar from './Sidebar.svelte';
  import SignIn from './SignIn.svelte';
  import * as api from './api.js';
  import { currentUser } from './api.js';

  const title = 'Tight';

  function onSignOut() {
    api.signOut();
  }

  function onCreateRoom(event) {
    api.addRoom(event.detail.name);
  }
</script>

<style>
  :global(body) {
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

  .sidebar-container {
    float: left;
  }
</style>

<svelte:head>
  <title>{title}</title>
  <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
</svelte:head>

{#if $currentUser}
  <aside class='sidebar-container'>
    <Sidebar {title} userName={$currentUser.name} on:add-room={onCreateRoom} on:signOut={onSignOut} />
  </aside>
{/if}

<main>
  {#if $currentUser}
    <ChatRoom user={$currentUser} />
  {:else}
    <SignIn {title} />
  {/if}
</main>
