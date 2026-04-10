import { mount } from "svelte";
import App from "./App.svelte";
import "./css/index.css";
import "./hello";
import "@sleet-css/sticky-css/main.css";

function start() {
  const target = document.getElementById("root");
  if (!target) {
    console.error("Mount target #root not found");
    return;
  }
  mount(App, { target });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            // New version available
            newWorker.postMessage({ type: "SKIP_WAITING" });
            window.location.reload();
          }
        });
      });
    });
  });
}
