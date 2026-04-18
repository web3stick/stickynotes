import { mount } from "svelte";
import App from "./App.svelte";
import "./css/index.css";
import "./ts/hello";
import "@sleet-css/sticky-css/main.css";
// ============================================
function start() {
  const target = document.getElementById("root");
  if (!target) {
    console.error("Mount target #root not found");
    return;
  }
  mount(App, { target });
}
// ============================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
// ============================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Service Worker registered:", reg.scope);

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          console.log("New Service Worker version found");

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("New version available, activating...");
              newWorker.postMessage({ type: "SKIP_WAITING" });
              window.location.reload();
            }
          });
        });
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  });
}
// ============================================
