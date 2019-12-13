<script>
  import { createEventDispatcher, onMount, tick } from 'svelte';

  export let value;

  export function focus() {
    messageInput.focus();
  }

  const dispatch = createEventDispatcher();

  let messageInput;

  onMount(() => updateHeight());

  $: updateHeight(value);

  function updateHeight(_) {
    if (!messageInput) {
      return;
    }

    messageInput.style.height = 'auto';
    messageInput.style.height = messageInput.scrollHeight + 'px';
  }

  function onKeydown(event) {
    const enterKey = 13;
    if (!event.shiftKey && event.which === enterKey) {
      event.preventDefault();
      submit();
      return;
    }
  }

  function submit() {
    if (messageInput.validationMessage) {
      return;
    }

    dispatch('message', {
      text: value
    });

    clear();
  }

  async function clear() {
    value = '';
    await tick();
    updateHeight();
  }
</script>

<style>
  .container {
    display: flex;
  }

  textarea {
    flex: auto;
    margin: auto 10px 0px 0px;
    max-height: 50vh;
    resize: none;
    overflow-y: scroll;
    border: 1px solid #777;
  }
</style>

<form class='container' on:submit|preventDefault={submit}>
  <textarea
    rows=1
    placeholder='Message'
    bind:this={messageInput}
    bind:value={value}
    on:keydown|stopPropagation={onKeydown}
    required
  ></textarea>
</form>
