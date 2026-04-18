const SETTINGS_KEY = "stickynotes_settings";

export interface Settings {
  bypassIndex: boolean;
}

export function loadSettings(): Settings {
  const saved = localStorage.getItem(SETTINGS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return { bypassIndex: false };
}

export function saveSettings(settings: Settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
