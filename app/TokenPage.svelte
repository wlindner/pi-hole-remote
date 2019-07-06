<script>
  import * as appSettings from "tns-core-modules/application-settings";
  import { token } from "./Store.js";

  let text = $token;

  const saveToken = () => {
    $token = text;
    appSettings.setString("token", $token);
  };
</script>

<page>
  <textField
    hint="Enter token"
    bind:text
    returnKeyType="done"
    on:returnPress={saveToken}
    autocorrect="false"
    class="input input-border" />
</page>
