import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import router from './router'
import { createPinia } from './stores'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router)
app.use(pinia)
app.mount('#app')
