<script>
  import { onMount } from "svelte";

  let status = "Unknown";

  onMount(async function() {
    const response = await fetch("http://pi.hole/admin/api.php");
    const data = await response.json();

    if (data.status === "disabled") {
      status = "Disabled";
    } else if (data.status === "enabled") {
      status = "Connected";
    }
  });
</script>

<label text="Status: {status}" class="h1 text-center" />
