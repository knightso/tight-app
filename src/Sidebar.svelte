<script>
  import { createEventDispatcher } from 'svelte';
  import ChatRoomList from './ChatRoomList.svelte';

  export let title;
  export let userName;
  export let roomId = null;

  let isShowUserDetail;

  const dispatch = createEventDispatcher();

  function onSignOut() {
    dispatch('sign-out');
  }

  function toggleUserDetail() {
    isShowUserDetail = !isShowUserDetail;
  }
  function hideUserDetail() {
    isShowUserDetail = false;
  }
</script>

<style>
  .sidebar {
    width: 100%;
    height: 100%;
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

  .user-container {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    float: left;
    margin: 4px 0 0 0;
    padding-left: 10px;
    font-size: 0.9rem;
    color: white;
  }

  .detail-button {
    height: 1em;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    color: white;
  }

  .detail-button > i {
    height: 100%;
  }

  .user-detail {
    background: #000a;
    padding: 5px;
    margin: 0 10px;
    border-radius: 2px;
  }

  .sign-out {
    display: inline-block;
    width: 100%;
    color: white;
    font-size: 0.9rem;
  }
</style>

<svelte:window on:click={hideUserDetail}/>

<div class='sidebar'>
  <h1>{title}</h1>
  <div class='user-container'>
    <div>
      <p class='user-name'>{userName}</p>
      <button class='detail-button' on:click|stopPropagation={toggleUserDetail}>
        <i class='material-icons'>arrow_drop_down</i>
      </button>
    </div>

    {#if isShowUserDetail}
      <div class='user-detail'>
        <a class='sign-out' href='signOut' on:click|preventDefault={onSignOut}>Sign Out</a>
      </div>
    {/if}
  </div>

  <ChatRoomList {roomId} {userName} on:add-room on:select-room />
</div>

