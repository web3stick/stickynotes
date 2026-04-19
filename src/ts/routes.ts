import { createRouter } from "sv-router";
// ============================================
// PAGES
import HOME_PAGE from "../svelte/page_home.svelte";
import APP_PAGE from "../svelte/page_app.svelte";
// ============================================
// ROUTES
export const ROUTES = {
  home: "/",
  all: "*",
  app: "/app",
};
// ============================================
// createRouter
export const { p, navigate, isActive, route } = createRouter({
  [ROUTES.home]: HOME_PAGE,
  [ROUTES.all]: HOME_PAGE,
  [ROUTES.app]: APP_PAGE,
});
// ============================================
