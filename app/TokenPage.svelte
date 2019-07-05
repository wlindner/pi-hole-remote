<script>
  import * as appSettings from "tns-core-modules/application-settings";

  export let token;

  const saveToken = () => {
    appSettings.setString("token", token);
  };
</script>

<page>
  <textField
    hint="Enter token"
    bind:text={token}
    returnKeyType="done"
    on:returnPress={saveToken}
    autocorrect="false"
    class="input input-border" />
</page>
