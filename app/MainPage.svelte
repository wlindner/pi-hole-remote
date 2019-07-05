<script>
  import { onMount } from "svelte";
  import {
    resumeEvent,
    on as applicationOn
  } from "tns-core-modules/application";
  const capitalize = (v = "") => v.charAt(0).toUpperCase() + v.slice(1);

  export let token;

  let status;
  let Status;
  $: Status = capitalize(status);
  let checked;
  $: checked = status === "enabled";
  let initializing = true;

  onMount(async function() {
    try {
      await checkStatus();
    } catch (e) {
      initializing = false;
    }
  });

  async function checkStatus() {
    status = "loading";
    try {
      const response = await fetch("http://pi.hole/admin/api.php");
      const data = await response.json();
      status = data.status;
    } catch (e) {
      status = "error";
    }
    initializing = false;
  }

  applicationOn(resumeEvent, async () => {
    await checkStatus();
  });

  const toggleSwitch = async event => {
    if (initializing) {
      initializing = false;
      return;
    }

    try {
      if (event.oldValue) {
        // disable adblocking
        const response = await fetch(
          `http://pi.hole/admin/api.php?disable=0&auth=${token}`
        );
      } else {
        // enable adblocking
        const response = await fetch(
          `http://pi.hole/admin/api.php?enable&auth=${token}`
        );
      }
    } catch (e) {
      await checkStatus();
    }
  };
</script>

<stackLayout>
  {#if status === 'loading'}
    <activityIndicator busy={true} />
  {:else if status === 'error'}
    <label
      text="Cannot connect to Pi-Hole 😖"
      class="h3 text-center"
      style="color: red" />
  {:else}
    <label text="Status: {Status}" class="h1 text-center" />
    <switch {checked} on:checkedChange={toggleSwitch} />
  {/if}
</stackLayout>
