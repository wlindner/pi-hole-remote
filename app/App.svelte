<script>
  import * as appSettings from "tns-core-modules/application-settings";

  const token = appSettings.getString("token");
</script>

<page>
  <actionBar title="Pi-Hole Remote" />
  <stackLayout class="p-20">
    {#if !token}
      <label text="Token Not Found" class="h1 text-center" />
    {:else}
      <label text="Token Found" class="h1 text-center" />
    {/if}
  </stackLayout>
</page>
