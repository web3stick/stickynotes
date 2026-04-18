import { STICKYNOTES_INDEX_SETTINGS_KEY } from "./constants";
// ============================================
export interface Settings {
  bypass_index: boolean;
}
// ============================================
export function load_settings(): Settings {
  const saved = localStorage.getItem(STICKYNOTES_INDEX_SETTINGS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return { bypass_index: false };
}
// ============================================
export function save_settings(settings: Settings) {
  localStorage.setItem(
    STICKYNOTES_INDEX_SETTINGS_KEY,
    JSON.stringify(settings),
  );
}
// ============================================