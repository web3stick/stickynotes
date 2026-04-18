<script lang="ts">
  import { settingsVisible } from "../../ts/stores";

  function toggleSettings() {
    settingsVisible.update((v) => !v);
  }
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- button_open_settings -->
<!-- BUTTON_OPEN_SETTINGS -->
<div
  id="BUTTON_OPEN_SETTINGS"
  onclick={toggleSettings}
  role="button"
  tabindex="0"
  onkeydown={(e) => e.key === "Enter" && toggleSettings()}
>
  ⚙️
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>
