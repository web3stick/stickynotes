<script lang="ts">
  import { onMount } from "svelte";
  import { load_settings, save_settings } from "../../ts/settings";
  import { settings_visible, show_alert } from "../../ts/stores";
  import { sticky_dexie_db } from "../../ts/dexie/new";
  import type { STICKYNOTE_INTERFACE } from "../../ts/type_stickynote";
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
    show_alert("SETTINGS SAVED!");
  }
  // ============================================
  async function handle_export_notes() {
    const notes: STICKYNOTE_INTERFACE[] = await sticky_dexie_db.stickynotes.toArray();
    const json = JSON.stringify(notes, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stickynotes_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    show_alert("NOTES EXPORTED!");
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
    <button type="button" id="export_notes" onclick={handle_export_notes}> EXPORT NOTES AS JSON </button>
    <button type="submit">save settings</button>
  </form>
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>
