<script>
  import { createEventDispatcher } from 'svelte';
  import ChatRoomList from './ChatRoomList.svelte';

  export let title;
  export let userName;

  const dispatch = createEventDispatcher();

  function onSignOut() {
    dispatch('signOut');
  }
</script>

<style>
  .sidebar {
    width: 20vw;
    height: 100vh;
    max-width: 200px;
    background: #1976d2;
    border-right: solid 1px #ccc;
    overflow: scroll;
  }
  .sidebar > h1 {
    color: white;
    font-weight: normal;
    font-family: 'serif';
    margin: 10px 0 0 0;
    padding-left: 10px;
  }
  .sidebar-contents {
    padding: 0;
    overflow-x: hidden;
  }
  .sidebar-item:hover {
    background: #63a4ff;
  }
  .sidebar-item > a {
    display: inline-block;
    color: white;
    width: 100%;
    padding: 4px 10px;
  }

  .user-name {
    margin: 4px 0 0 0;
    padding-left: 10px;
    font-size: 14px;
    color: white;
  }
  .user-name::after {
    content: '▼';
    color: white;
    margin-left: 4px;
    font-size: 12px;
  }
</style>

<div class='sidebar'>
  <h1>{title}</h1>
  <p class='user-name'>{userName}</p>

  <ul class='sidebar-contents'>
    <li class='sidebar-item'>
      <a href='signOut' on:click|preventDefault={onSignOut}>Sign Out</a>
    </li>
    <li><ChatRoomList on:add-room /></li>
  </ul>
</div>

