<script lang="ts">
  import { onMount } from "svelte";
  const FIRST_TIME_KEY = "stickynotes_visited";
  let visible = $state(false);
  // ============================================
  onMount(() => {
    visible = !localStorage.getItem(FIRST_TIME_KEY);
  });

  function markAsVisited() {
    localStorage.setItem(FIRST_TIME_KEY, "true");
    visible = false;
  }
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- div_first_time -->
<!-- DIV_FIRST_TIME -->
<!-- first time and how to use -->
<!-- Fixed ceneter -->
<div id="FIRST_TIME" style:display={visible ? "block" : "none"}>
  <h2>Welcome to STICKYNOTES! 📝</h2>
  <div class="guide-section">
    <h3>Creating Notes</h3>
    <p>
      Click the "+" button in the bottom-right corner to create a new note. Type
      your content directly into the note.
    </p>
  </div>

  <div class="guide-section">
    <h3>Note Options</h3>
    <p>You have three options for managing your notes:</p>
    <ul>
      <li>📋 Copy - Copies note content to clipboard</li>
      <li>🎨 Color - Changes note color</li>
      <li>🗑️ Delete - Removes the note</li>
    </ul>
  </div>

  <div class="guide-section">
    <h3>Using Options</h3>
    <p>
      <strong>On Desktop:</strong> Drag and drop any option onto a note to use it.
    </p>
    <p>
      <strong>On Mobile:</strong> Tap an option first, then tap the note you want
      to apply it to.
    </p>
  </div>

  <div class="guide-section">
    <h3>Saving & Backup</h3>
    <p>Your notes are automatically saved locally in your browser.</p>
    <p>To backup your notes:</p>
    <ol>
      <li>Click the ⚙️ settings icon</li>
      <li>Use the "EXPORT NOTES AS JSON" button</li>
      <li>Save the file somewhere safe</li>
    </ol>
  </div>

  <button class="got-it-btn" onclick={markAsVisited}>GOT IT!</button>
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>
