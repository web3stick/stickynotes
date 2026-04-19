<script lang="ts">
  import { sticky_dexie_db } from "../../ts/dexie/new";
  import { liveQuery } from "dexie";
  import { onDestroy } from "svelte";

  let notes: any[] = [];

  const subscription = liveQuery(() => sticky_dexie_db.stickynotes.toArray()).subscribe({
    next: (value) => { notes = value; },
    error: (err) => console.error(err),
  });

  async function updateNote(id: string, newNote: string) {
    await sticky_dexie_db.stickynotes.update(id, { note: newNote });
  }

  function setupObserver(node: HTMLElement, id: string) {
    const observer = new MutationObserver(() => {
      const content = node.textContent || "";
      updateNote(id, content);
    });
    observer.observe(node, { characterData: true, childList: true, subtree: true });
    return {
      destroy() {
        observer.disconnect();
      }
    };
  }

  onDestroy(() => {
    subscription.unsubscribe();
  });
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- DIV_STICKYNOTES_CONTAINER -->
<div id="div_stickynotes_container">
  {#each notes as note (note.id)}
    <div
      contenteditable="true"
      class="div_stickynote_note {note.color}"
      use:setupObserver={note.id}
    >{note.note}</div>
  {/each}
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>
