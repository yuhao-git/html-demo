import { createPinia } from "pinia";
import app from "./app"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

export default pinia