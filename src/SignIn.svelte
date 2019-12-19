<script>
  import ResetPassword from './ResetPassword.svelte';
  import * as api from './api.js';

  export let title;

  let email;
  let password;
  let form;

  // 'SIGN_IN' | 'SIGN_UP' | 'RESET_PASSWORD'
  let mode = 'SIGN_IN';

  function submit() {
    if (!form.checkValidity()) {
      return;
    }

    if (isSignIn(mode)) {
      api.signIn(email, password);
    } else {
      api.signUp(email, password);
    }
  }

  function resetPassword(event) {
      console.log('RESET_PASSWORD', event);
  }

  function isSignIn(mode) {
    return mode === 'SIGN_IN';
  }

  function showSignIn() {
    mode = 'SIGN_IN';
  }
  function showSignUp() {
    mode = 'SIGN_UP';
  }
  function showResetPassword() {
    mode = 'RESET_PASSWORD';
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

  .links {
    margin: 0;
    padding: 0;
  }

  .links > li {
    margin-bottom: 4px;
  }

  .link {
    margin-top: 10px;
  }

  .link > p {
    margin: 0;
  }
</style>

<div class='container'>
  {#if mode === 'SIGN_UP'}
    <h1>{title} : アカウント作成</h1>
    <form class='container' bind:this={form} on:submit|preventDefault={submit}>
      <div class='input-fields'>
        <label>Email</label><input type='email' bind:value={email} autocomplete='email' required />
        <label>Password</label><input type='password' bind:value={password} autocomplete='new-password' required />
      </div>

      <button>Sign Up</button>
    </form>

    <div class='link'>
      <p>すでにアカウントをお持ちですか？</p>
      <a href='signIn' on:click|preventDefault={showSignIn}>サインイン</a>
    </div>
  {:else if mode === 'SIGN_IN'}
    <h1>{title} : サインイン</h1>
    <form class='container' bind:this={form} on:submit|preventDefault={submit}>
      <div class='input-fields'>
        <label>Email</label><input type='email' bind:value={email} autocomplete='email' required />
        <label>Password</label><input type='password' bind:value={password} autocomplete='current-password' required />
      </div>

      <button>Sign In</button>
    </form>

    <div class='link'>
      <ul class='links'>
        <li><a href='signUp' on:click|preventDefault={showSignUp}>アカウントを新規作成する</a></li>
        <li><a href='resetPassword' on:click|preventDefault={showResetPassword}>パスワードを忘れたら</a></li>
      </ul>
    </div>
  {:else if mode === 'RESET_PASSWORD'}
    <ResetPassword {title} {email} on:reset-password={resetPassword} on:show-sign-in={showSignIn} />
  {/if}
</div>
