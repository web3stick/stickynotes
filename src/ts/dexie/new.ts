import { Dexie, type EntityTable } from "dexie";
import type { STICKYNOTE_INTERFACE } from "../type_stickynote";
// ============================================
// new
export const sticky_dexie_db = new Dexie("STICKYNOTES_DATABASE") as Dexie & {
  stickynotes: EntityTable<STICKYNOTE_INTERFACE, "id">;
};
// ============================================
// Schema declaration:
sticky_dexie_db.version(1).stores({
  stickynotes: "++id, color, note",
});
// ============================================
