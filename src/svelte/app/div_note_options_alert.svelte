<script lang="ts">
  import { alert_message } from "../../ts/stores";
</script>

<!-- ============================================ -->
<!-- ============================================ -->

<!-- div_note_options_alert -->
<!-- DIV_NOTE_OPTIONS_ALERT -->
<div
  class="note_options_alert"
  style:display={$alert_message ? "block" : "none"}
>
  {$alert_message}
</div>

<!-- ============================================ -->
<!-- ============================================ -->

<style>
  .note_options_alert {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 10;
    display: none;
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  /* Add to your existing mobile media query */
  @media screen and (max-width: 768px) {
    .note_options_alert {
      bottom: 80px;
      top: auto;
      font-size: 16px;
      padding: 12px 24px;
    }
  }
</style>
