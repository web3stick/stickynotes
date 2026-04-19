<script lang="ts">
  import { sticky_dexie_db } from "../../ts/dexie/new";
  import { liveQuery } from "dexie";

  function generate_id(): string {
    return crypto.randomUUID();
  }

  async function create_note() {
    await sticky_dexie_db.stickynotes.add({
      id: generate_id(),
      color: "yellow",
      note: "start typing here...",
    });
  }
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- button_create -->
<!-- BUTTON_CREATE -->
<div
  id="BUTTON_CREATE"
  on:click={create_note}
  on:keydown={(e) => e.key === "Enter" && create_note()}
  tabindex="0"
  role="button"
>
  +
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
  #BUTTON_CREATE {
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    background-color: var(--color-green);
    color: #ffffff;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: crosshair;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    z-index: 5;
  }

  #BUTTON_CREATE:hover {
    background-color: var(--color-blue);
  }
</style>
