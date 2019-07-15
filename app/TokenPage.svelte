<script>
  import { BarcodeScanner } from "nativescript-barcodescanner";
  import * as appSettings from "tns-core-modules/application-settings";
  import { token } from "./Store.js";

  let text = $token;
  const barcodescanner = new BarcodeScanner();

  const saveToken = () => {
    if (text.length == 64) {
      $token = text;
      appSettings.setString("token", $token);
    }
  };

  const openBarcodeScanner = () => {
    barcodescanner
      .scan({
        formats: "QR_CODE",
        beepOnScan: false,
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
      })
      .then(
        result => {
          text = result.text;
        },
        errorMessage => {
          console.log("No scan. " + errorMessage);
        }
      );
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

  button {
    background-color: black;
    height: 176px;
    margin-bottom: 10px;
  }
</style>

<stackLayout>
  <label text="Token" />
  <textView hint="Enter token" bind:text maxLength="64" autocorrect="false" />
  <button class="scan" text="QR Scan" on:tap={openBarcodeScanner} />
  <button class="save" text="Save" on:tap={saveToken} />
</stackLayout>
