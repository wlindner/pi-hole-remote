<script>
  import * as appSettings from "tns-core-modules/application-settings";
  import { token } from "./Store.js";

  let text = $token;

  const saveToken = () => {
    if (text.length == 64) {
      $token = text;
      appSettings.setString("token", $token);
    }
  };
</script>

<style>
  stackLayout {
    margin: 20px;
  }

  label {
    font-size: 20px;
    font-weight: bold;
    color: #2847d2;
  }

  textView {
    height: 200px;
    font-size: 18;
    color: #2847d2;
  }

  button.save {
    background-color: black;
    height: 88px;
  }
</style>

<stackLayout>
  <label text="Token" />
  <textView hint="Enter token" bind:text maxLength="64" autocorrect="false" />
  <button class="save" text="Save" on:tap={saveToken} />
</stackLayout>
