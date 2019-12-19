<script>
  import { createEventDispatcher } from 'svelte';

  export let title;
  export let email;

  const dispatch = createEventDispatcher();

  let isSendMail;
  let form;

  function submit() {
    if (!form.checkValidity()) {
      return;
    }

    dispatch('reset-password', {
      email: email
    });
    isSendMail = true;
  }

  function onShowSignIn() {
    dispatch('show-sign-in');
  }
</script>

<style>
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

  .reset-password-explain {
    margin-bottom: 20px;
  }
  .reset-password-explain > p {
    margin: 0;
  }

  .link {
    margin-top: 10px;
  }
</style>

<h1>{title} : パスワード再設定</h1>

{#if isSendMail}
  <div class='reset-password-explain'>
    <p>入力されたメールアドレスに確認メールを送付しました。</p>
    <p>確認用URLにアクセスして本登録処理を行ってください。</p>
  </div>
{:else}
  <div class='reset-password-explain'>
    <p>パスワードを再設定しますか？</p>
    <hr />
    <p>新規登録時に使用したメールアドレスを入力してください</p>
    <p>パスワードを再設定できるメールが送信されます。</p>
  </div>

  <form class='container' bind:this={form} on:submit|preventDefault={submit}>
    <div class='input-fields'>
      <label>Email</label><input type='email' bind:value={email} autocomplete='email' required />
    </div>

    <button>確認メールを送信</button>
  </form>

  <div class='link'>
    <a href='signIn' on:click|preventDefault={onShowSignIn}>サインイン</a>
  </div>
{/if}
