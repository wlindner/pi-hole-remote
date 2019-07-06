import * as appSettings from "tns-core-modules/application-settings";
import { writable } from "svelte/store";

export const token = writable(appSettings.getString("token") || "");
