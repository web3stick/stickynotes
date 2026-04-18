import { writable } from "svelte/store";
// ============================================
export const settings_visible = writable(false);
export const alert_message = writable("");
// ============================================
export function show_alert(message: string, duration = 2000) {
  alert_message.set(message);
  setTimeout(() => alert_message.set(""), duration);
}
// ============================================