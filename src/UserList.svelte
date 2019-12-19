<script>
  import { MD5 } from './api.js'

  export let emails;
</script>

<style>
  ul {
    padding: 0;
    margin-left: 20px;
  }

  .container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .user-icon {
    width: 20px;
    height: 20px;
  }

  .user-name {
    margin-left: 4px;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<ul>
  {#each emails as email (email)}
    <li>
      <div class='container'>
        <span class='user-icon'>
          <img src={`https://www.gravatar.com/avatar/${MD5(email)}?default=retro`} width='20px' height='20px' alt='user icon' />
        </span>
        <span class='user-name'>{email}</span>
      </div>
    </li>
  {/each}
</ul>
