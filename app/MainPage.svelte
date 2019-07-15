<script>
  import { onMount } from "svelte";
  import {
    resumeEvent,
    on as applicationOn
  } from "tns-core-modules/application";
  import TokenPage from "./TokenPage";
  import { token } from "./Store.js";
  const capitalize = (v = "") => v.charAt(0).toUpperCase() + v.slice(1);

  let status;
  let Status;
  $: Status = capitalize(status);
  let checked;
  let initializing = true;

  onMount(async function() {
    try {
      await checkStatus();
    } catch (e) {
      initializing = false;
    }
  });

  function resetToken() {
    $token = "";
  }

  function isTokenRejected(data) {
    return Array.isArray(data);
  }

  async function checkStatus() {
    status = "loading";
    try {
      const response = await fetch("http://pi.hole/admin/api.php");
      const data = await response.json();
      status = data.status;
      if (status === "enabled") {
        checked = true;
      } else {
        checked = false;
      }
    } catch (error) {
      status = "error";
    }
    initializing = false;
  }

  applicationOn(resumeEvent, async () => {
    await checkStatus();
  });

  const toggleSwitch = async ({ oldValue }) => {
    if (initializing) {
      initializing = false;
      return;
    }

    try {
      if (oldValue) {
        // disable adblocking
        const response = await fetch(
          `http://pi.hole/admin/api.php?disable=0&auth=${$token}`
        );
        const data = await response.json();
        if (isTokenRejected(data)) {
          resetToken();
        } else {
          status = "disabled";
        }
      } else {
        // enable adblocking
        const response = await fetch(
          `http://pi.hole/admin/api.php?enable&auth=${$token}`
        );
        const data = await response.json();
        if (isTokenRejected(data)) {
          resetToken();
        } else {
          status = "enabled";
        }
      }
    } catch (error) {
      await checkStatus();
    }
  };
</script>

<style>
  stackLayout {
    margin: 20px;
  }
</style>

<stackLayout>
  {#if status === 'loading'}
    <activityIndicator busy={true} />
  {:else if !$token}
    <TokenPage />
  {:else if status === 'error'}
    <label
      text="Cannot connect to Pi-Hole 😖"
      class="h2 text-center"
      style="color: red" />
  {:else}
    <label text="Status: {Status}" class="h1 text-center" />
    <switch {checked} on:checkedChange={toggleSwitch} />
  {/if}
</stackLayout>
