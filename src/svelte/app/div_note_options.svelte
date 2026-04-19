<script lang="ts">
  function handleDragStart(event: DragEvent) {
    const target = event.target as HTMLElement;
    event.dataTransfer?.setData("text/plain", target.className);
  }

  function handleTouchStart(event: TouchEvent) {
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
    on:dragstart={handleDragStart}
    on:touchstart={handleTouchStart}
  >
    📋
  </div>
  <div
    draggable="true"
    class="note_color"
    title="Change note color"
    on:dragstart={handleDragStart}
    on:touchstart={handleTouchStart}
  >
    🎨
  </div>
  <div
    draggable="true"
    class="note_delete"
    title="Delete note"
    on:dragstart={handleDragStart}
    on:touchstart={handleTouchStart}
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
