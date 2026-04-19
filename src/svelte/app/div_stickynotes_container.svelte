<script lang="ts">
  import { sticky_dexie_db } from "../../ts/dexie/new";
  import { liveQuery } from "dexie";
  import { onDestroy } from "svelte";
  import {
    copy_note,
    change_note_color,
    delete_note,
  } from "../../ts/note_options";

  let notes: any[] = [];
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const subscription = liveQuery(() =>
    sticky_dexie_db.stickynotes.toArray(),
  ).subscribe({
    next: (value) => {
      notes = value;
    },
    error: (err) => console.error(err),
  });

  async function update_note(id: string, new_note: string) {
    await sticky_dexie_db.stickynotes.update(id, { note: new_note });
  }

  function setup_observer(node: HTMLElement, id: string) {
    const observer = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const content = node.innerText || "";
        console.log("save:", id.slice(0, 8), "len:", content.length);
        update_note(id, content);
      }, 300);
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

  function handle_drag_over(event: DragEvent) {
    event.preventDefault();
  }

  async function handle_drop(
    event: DragEvent,
    noteId: string,
    noteColor: string,
  ) {
    event.preventDefault();
    event.stopPropagation();
    const className = event.dataTransfer?.getData("text/plain") || "";
    await handle_action(className, noteId, noteColor);
  }

  async function handle_action(
    className: string,
    noteId: string,
    noteColor: string,
  ) {
    const noteEl = document.querySelector(
      `[data-id="${noteId}"]`,
    ) as HTMLElement;

    if (className.includes("note_copy")) {
      await copy_note(noteId);
    } else if (className.includes("note_color")) {
      const newColor = await change_note_color(noteId, noteColor);
      if (noteEl) {
        noteEl.dataset.color = newColor;
        noteEl.classList.remove(noteColor);
        noteEl.classList.add(newColor);
      }
    } else if (className.includes("note_delete")) {
      await delete_note(noteId);
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
      use:setup_observer={note.id}
      on:dragover={handle_drag_over}
      on:drop={(e) => handle_drop(e, note.id, note.color)}
    >
      {note.note}
    </div>
  {/each}
</div>

<svelte:window on:dragover={(e) => e.preventDefault()} />

<!-- ============================================ -->
<!-- ============================================ -->

<style></style>
