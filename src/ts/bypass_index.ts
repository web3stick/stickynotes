import { STICKYNOTES_INDEX_SETTINGS_KEY } from "./constants";
import { ROUTES } from "./routes";
// ============================================
function should_bypass_index(): boolean {
  const saved = localStorage.getItem(STICKYNOTES_INDEX_SETTINGS_KEY);
  if (saved) {
    const settings = JSON.parse(saved);
    return settings.bypass_index ?? false;
  }
  return false;
}
// ============================================
export function init_bypass_index() {
  if (should_bypass_index()) {
    const path = window.location.pathname;
    if (path === "/" || path === "") {
      window.location.href = ROUTES.app;
    }
  }
}
// ============================================