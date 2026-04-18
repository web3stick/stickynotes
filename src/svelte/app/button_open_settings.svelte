<script lang="ts">
  import { settings_visible } from "../../ts/stores";
// ============================================
  function toggle_settings() {
    settings_visible.update((v) => !v);
  }
// ============================================
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- button_open_settings -->
<!-- BUTTON_OPEN_SETTINGS -->
<div
  id="BUTTON_OPEN_SETTINGS"
  onclick={toggle_settings}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && toggle_settings()}
>
  ⚙️
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>