<script lang="ts">
  import { onMount } from "svelte";
  import { load_settings, save_settings } from "../../ts/settings";
  import { settings_visible, show_alert } from "../../ts/stores";
// ============================================
  let bypass_index = $state(false);
// ============================================
  onMount(() => {
    const settings = load_settings();
    bypass_index = settings.bypass_index;
  });
// ============================================
  function handle_save(e: Event) {
    e.preventDefault();
    save_settings({ bypass_index });
    settings_visible.set(false);
    show_alert("Settings saved!");
  }
// ============================================
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- DIV_SETTINGS -->
<!-- Fixed center -->
<div id="SETTINGS" style:display={$settings_visible ? "block" : "none"}>
  <h2>SETTINGS</h2>
  <form onsubmit={handle_save}>
    <div>
      <input
        type="checkbox"
        id="bypass_index"
        name="bypass_index"
        bind:checked={bypass_index}
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