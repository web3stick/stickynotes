<script lang="ts">
  import BUTTON_CREATE from "./app/button_create.svelte";
  import BUTTON_OPEN_SETTINGS from "./app/button_open_settings.svelte";
  import DIV_SETTINGS from "./app/div_settings.svelte";
  import DIV_NOTE_OPTIONS from "./app/div_note_options.svelte";
  import DIV_FIRST_TIME from "./app/div_first_time.svelte";
  import DIV_NOTE_OPTIONS_ALERT from "./app/div_note_options_alert.svelte";
  import DIV_STICKYNOTES_CONTAINER from "./app/div_stickynotes_container.svelte";
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<article>
  <!-- <section>
    <h1>app</h1>
  </section> -->
  <!-- buttons -->
  <BUTTON_CREATE />
  <BUTTON_OPEN_SETTINGS />
  <!-- div -->
  <DIV_SETTINGS />
  <DIV_NOTE_OPTIONS />
  <DIV_FIRST_TIME />
  <DIV_NOTE_OPTIONS_ALERT />
  <!-- DIV_STICKYNOTES_CONTAINER -->
  <DIV_STICKYNOTES_CONTAINER />
</article>

<!-- ============================================ -->
<!-- ============================================ -->
