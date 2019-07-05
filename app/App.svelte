<script>
  import * as appSettings from "tns-core-modules/application-settings";

  import TokenPage from "./TokenPage";

  const token = appSettings.getString("token");

  console.log(token);
</script>

<page>
  <actionBar title="Pi-Hole Remote" />
  <stackLayout class="p-20">
    {#if !token}
      <TokenPage {token} />
    {:else}
      <label text="Token Definitely Found" class="h1 text-center" />
    {/if}
  </stackLayout>
</page>
