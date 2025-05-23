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

registerPlugins(app);
app.use(pinia);
app.use(router);
app.mount("#app");
