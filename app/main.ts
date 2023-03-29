import { createApp } from 'vue'
import App from './app.vue'
import RegisterComponents from "./register-components"

const app = createApp(App)
app.use(RegisterComponents);
app.mount('#app');