<script lang="ts">
  import { selected_action } from "../../ts/stores";

  function select_action(action: "copy" | "color" | "delete") {
    selected_action.set(action);
  }
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- div_note_options -->
<!-- DIV_NOTE_OPTIONS -->
<div class="note_options">
  <button
    type="button"
    class="note_copy"
    title="Copy note content to clipboard"
    on:click={() => select_action("copy")}
  >
    📋
  </button>
  <button
    type="button"
    class="note_color"
    title="Change note color"
    on:click={() => select_action("color")}
  >
    🎨
  </button>
  <button
    type="button"
    class="note_delete"
    title="Delete note"
    on:click={() => select_action("delete")}
  >
    🗑️
  </button>
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
  .note_options {
    position: fixed;
    top: 10px;
    right: 15px;
    bottom: auto;
    left: auto;
    display: flex;
    gap: 5px;
    cursor: pointer;
    z-index: 5;
  }
  .note_options button:hover {
    opacity: 0.7;
  }

  @media screen and (max-width: 768px) {
    .note_options {
      top: auto;
      bottom: 20px;
      right: auto;
      left: 20px;
      gap: 15px;
    }
    .note_options button {
      font-size: 40px;
    }
  }
</style>