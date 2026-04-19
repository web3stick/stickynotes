<script lang="ts">
  import { sticky_dexie_db } from "../../ts/dexie/new";
  import { liveQuery } from "dexie";
  import { onDestroy } from "svelte";
  import { copyNote, changeNoteColor, deleteNote } from "../../ts/note_options";

  let notes: any[] = [];

  const subscription = liveQuery(() =>
    sticky_dexie_db.stickynotes.toArray(),
  ).subscribe({
    next: (value) => {
      notes = value;
    },
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
    observer.observe(node, {
      characterData: true,
      childList: true,
      subtree: true,
    });
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  async function handleDrop(
    event: DragEvent,
    noteId: string,
    noteColor: string,
  ) {
    event.preventDefault();
    event.stopPropagation();
    const className = event.dataTransfer?.getData("text/plain") || "";
    await handleAction(className, noteId, noteColor);
  }

  async function handleAction(
    className: string,
    noteId: string,
    noteColor: string,
  ) {
    const noteEl = document.querySelector(
      `[data-id="${noteId}"]`,
    ) as HTMLElement;

    if (className.includes("note_copy")) {
      await copyNote(noteId);
    } else if (className.includes("note_color")) {
      const newColor = await changeNoteColor(noteId, noteColor);
      if (noteEl) {
        noteEl.dataset.color = newColor;
        noteEl.classList.remove(noteColor);
        noteEl.classList.add(newColor);
      }
    } else if (className.includes("note_delete")) {
      await deleteNote(noteId);
    }
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
      data-id={note.id}
      data-color={note.color}
      use:setupObserver={note.id}
      on:dragover={handleDragOver}
      on:drop={(e) => handleDrop(e, note.id, note.color)}
    >
      {note.note}
    </div>
  {/each}
</div>

<svelte:window on:dragover={(e) => e.preventDefault()} />

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>
