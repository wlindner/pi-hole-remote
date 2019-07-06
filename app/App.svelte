<script>
  import TokenPage from "./TokenPage";
  import MainPage from "./MainPage";
  import { token } from "./Store.js";
</script>

<page>
  <actionBar title="Pi-Hole Remote" />
  <stackLayout>
    {#if $token}
      <MainPage />
    {:else}
      <TokenPage />
    {/if}
  </stackLayout>
</page>
