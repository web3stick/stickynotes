import { writable } from "svelte/store";

export const settingsVisible = writable(false);
export const alertMessage = writable("");

export function showAlert(message: string, duration = 2000) {
  alertMessage.set(message);
  setTimeout(() => alertMessage.set(""), duration);
}
