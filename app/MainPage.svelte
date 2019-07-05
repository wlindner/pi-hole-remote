<script>
  import { onMount } from "svelte";

  export let token;

  let status = "Unknown";
  let checked = false;
  let initializing = true;

  onMount(async function() {
    try {
      await checkStatus();
    } catch (e) {
      // checked will stay false
      initializing = false;
    }
  });

  async function checkStatus() {
    const response = await fetch("http://pi.hole/admin/api.php");
    const data = await response.json();

    if (data.status === "disabled") {
      checked = false;
      status = "Disabled";
    } else if (data.status === "enabled") {
      checked = true;
      status = "Enabled";
    }
    initializing = false;
  }

  const toggleSwitch = async event => {
    if (initializing) {
      initializing = false;
      return;
    }

    if (event.oldValue) {
      // disable adblocking
      try {
        const response = await fetch(
          `http://pi.hole/admin/api.php?disable=0&auth=${token}`
        );
        if (response.ok) {
          status = "Disabled";
        } else {
          status = "Unknown";
          await checkStatus();
        }
      } catch (e) {
        status = "Enabled";
      }
    } else {
      // enable adblocking
      try {
        const response = await fetch(
          `http://pi.hole/admin/api.php?enable&auth=${token}`
        );
        if (response.ok) {
          status = "Enabled";
        } else {
          status = "Unknown";
          await checkStatus();
        }
      } catch (e) {
        status = "Disabled";
      }
    }
  };
</script>

<stackLayout>
  <label text="Status: {status}" class="h1 text-center" />
  {#if status !== 'Unknown'}
    <switch {checked} on:checkedChange={toggleSwitch} />
  {/if}
</stackLayout>
