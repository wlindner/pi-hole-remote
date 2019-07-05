<script>
  import * as appSettings from "tns-core-modules/application-settings";

  import TokenPage from "./TokenPage";
  import MainPage from "./MainPage";

  const token = appSettings.getString("token");
</script>

<page>
  <actionBar title="Pi-Hole Remote" />
  <stackLayout class="p-20">
    {#if !token}
      <TokenPage {token} />
    {:else}
      <MainPage {token} />
    {/if}
  </stackLayout>
</page>
