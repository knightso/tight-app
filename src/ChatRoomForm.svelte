<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let user;

  const dispatch = createEventDispatcher();

  let roomName;
  let members = user.name + ',';
  let roomNameInput;

  onMount(() => roomNameInput.focus());

  function submit() {
    dispatch('create-room', {
      name: roomName,
      members: members.split(',')
    });
  }
</script>

<style>
  .container {
    padding: 10px;
  }

  h1 {
    margin: 0;
  }

  #members {
    width: 100%;
  }

  small {
    margin-left: 10px;
  }
  small::before {
    content: '※'
  }

  button {
    padding: 10px;
    color: white;
    border-radius: 4px;
    background: #1976d2;
    border: solid 1px #004ba0;
  }
  button:hover {
    background: #004ba0;
  }
</style>

<div class='container'>
  <h1>room 作成</h1>
  <form on:submit|preventDefault={submit}>
    <p>
      <label for='room-name'>room 名</label>
      <input bind:this={roomNameInput} bind:value={roomName} id='room-name' type='text' required />
    </p>
    <p>
      <label for='members'>メンバー <small>メールアドレスをカンマ区切りで入力</small></label>
      <input bind:value={members} id='members' type='email' multiple required />
    </p>
    <button>room を作成</button>
  </form>
</div>
