import { STICKYNOTES_INDEX_SETTINGS_KEY } from "./constants";
// ============================================
export interface SETTINGS_INTERFACE {
  bypass_index: boolean;
}
// ============================================
export function load_settings(): SETTINGS_INTERFACE {
  const saved = localStorage.getItem(STICKYNOTES_INDEX_SETTINGS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return { bypass_index: false };
}
// ============================================
export function save_settings(settings: SETTINGS_INTERFACE) {
  localStorage.setItem(
    STICKYNOTES_INDEX_SETTINGS_KEY,
    JSON.stringify(settings),
  );
}
// ============================================