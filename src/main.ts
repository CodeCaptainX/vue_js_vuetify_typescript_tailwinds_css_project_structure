/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";
import { createPinia } from "pinia";
// Composables
import { createApp } from "vue";
const pinia = createPinia();

// Styles
import "./styles/main.css";
import router from "./router";
const app = createApp(App);

//! translate
import en from "./locale/en.json";
import km from "./locale/km.json";
import { createI18n } from "vue-i18n";
const savedLocale = localStorage.getItem("locale") || "km";
const i18n = createI18n({
  messages: {
    en: en,
    km: km,
  },
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
});
app.use(i18n);

registerPlugins(app);
app.use(pinia);
app.use(router);
app.mount("#app");
