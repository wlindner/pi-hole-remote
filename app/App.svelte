<script>
  import * as appSettings from "tns-core-modules/application-settings";

  import TokenPage from "./TokenPage";
  import MainPage from "./MainPage";

  const token = appSettings.getString("token");

  console.log(token);
</script>

<page>
  <actionBar title="Pi-Hole Remote" />
  <stackLayout class="p-20">
    {#if !token}
      <TokenPage {token} />
    {:else}
      <MainPage />
    {/if}
  </stackLayout>
</page>
