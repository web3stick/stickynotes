import { sticky_dexie_db } from "./dexie/new";
import { show_alert } from "./stores";

export const COLORS = ["red", "green", "purple", "yellow", "blue", "orange"];

export async function copy_note(noteId: string) {
  const note = await sticky_dexie_db.stickynotes.get(noteId);
  if (note) {
    navigator.clipboard.writeText(note.note);
    show_alert("note content copied to clipboard");
  }
}

export async function change_note_color(noteId: string, currentColor: string) {
  const colorIndex = COLORS.indexOf(currentColor);
  const newColor = COLORS[(colorIndex + 1) % COLORS.length];
  await sticky_dexie_db.stickynotes.update(noteId, { color: newColor });
  show_alert("note color changed");
  return newColor;
}

export async function delete_note(noteId: string) {
  await sticky_dexie_db.stickynotes.delete(noteId);
  show_alert("note deleted");
}
