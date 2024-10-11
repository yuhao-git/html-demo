// import type { App } from "vue";
import app from "@/modules/app"
import { createPinia } from "pinia";

const store = createPinia();

// app.use(store);

// export function setupStore(app: App<Element>) {
//   app.use(store);
// }

export { store };
