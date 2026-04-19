<script lang="ts">
  function handle_drag_start(event: DragEvent) {
    const target = event.target as HTMLElement;
    event.dataTransfer?.setData("text/plain", target.className);
  }

  function handle_touch_start(event: TouchEvent) {
    (event.target as HTMLElement).dataset.touching = "true";
  }
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- div_note_options -->
<!-- DIV_NOTE_OPTIONS -->
<div class="note_options">
  <div
    draggable="true"
    class="note_copy"
    title="Copy note content to clipboard"
    on:dragstart={handle_drag_start}
    on:touchstart={handle_touch_start}
  >
    📋
  </div>
  <div
    draggable="true"
    class="note_color"
    title="Change note color"
    on:dragstart={handle_drag_start}
    on:touchstart={handle_touch_start}
  >
    🎨
  </div>
  <div
    draggable="true"
    class="note_delete"
    title="Delete note"
    on:dragstart={handle_drag_start}
    on:touchstart={handle_touch_start}
  >
    🗑️
  </div>
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
  .note_options div:hover {
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
    .note_options div {
      font-size: 40px;
    }
  }
</style>
