<script lang="ts">
  import { onMount } from "svelte";
  import { loadSettings, saveSettings } from "../../ts/settings";
  import { settingsVisible, showAlert } from "../../ts/stores";

  let bypassIndex = $state(false);

  onMount(() => {
    const settings = loadSettings();
    bypassIndex = settings.bypassIndex;
  });

  function handleSave(e: Event) {
    e.preventDefault();
    saveSettings({ bypassIndex });
    settingsVisible.set(false);
    showAlert("Settings saved!");
  }
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- DIV_SETTINGS -->
<!-- Fixed center -->
<div id="SETTINGS" style:display={$settingsVisible ? "block" : "none"}>
  <h2>SETTINGS</h2>
  <form onsubmit={handleSave}>
    <div>
      <input
        type="checkbox"
        id="bypass_index"
        name="bypass_index"
        bind:checked={bypassIndex}
      />
      <label for="bypass_index">BYPASS INDEX PAGE</label>
    </div>
    <button type="button" id="export_notes"> EXPORT NOTES AS JSON </button>
    <button type="submit">save settings</button>
  </form>
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>
