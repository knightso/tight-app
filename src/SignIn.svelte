<script>
  import * as api from './api.js';

  export let title;

  let email;
  let password;
  let form;

  let isSignIn = true;

  function submit() {
    if (!form.checkValidity()) {
      return;
    }

    if (isSignIn) {
      api.signIn(email, password);
    } else {
      api.signUp(email, password);
    }
  }

  function toggleScreen() {
    isSignIn = !isSignIn;
  }
</script>

<style>
  .container {
    max-width: 400px;
    margin: auto;
  }

  .input-fields {
    margin-bottom: 20px;
  }

  input, button {
    width: 100%;
  }

  button {
    background: #09af00;
    padding: 10px;
    border-radius: 4px;
    color: white;
  }
  button:hover {
    background: #008b00;
  }

  label {
    line-height: 1.5;
  }
  label::after, input::after {
    content: '\A';
    white-space: pre;
  }
  .link {
    margin-top: 10px;
  }
  .link > p {
    margin: 0;
  }
</style>

<div class='container'>
  <h1>{title} : {isSignIn ? 'サインイン' : 'アカウント作成'}</h1>
  <form class='container' bind:this={form} on:submit|preventDefault={submit}>
    <div class='input-fields'>
      <label>Email</label><input type='email' bind:value={email} autocomplete='email' required />
      <label>Password</label><input type='password' bind:value={password} autocomplete={isSignIn ? 'current-password' : 'new-password'} required />
    </div>

    <button>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
  </form>

  <div class='link'>
    {#if isSignIn}
      <a href='singUp' on:click|preventDefault={toggleScreen}>アカウントを新規作成する</a>
    {:else}
      <p>すでにアカウントをお持ちですか？</p>
      <a href='signIn' on:click|preventDefault={toggleScreen}>サインイン</a>
    {/if}
  </div>
</div>
