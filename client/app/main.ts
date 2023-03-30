import { createApp } from 'vue'
import App from './app.vue'
import RegisterComponents from "./plugins/register-components"
import StyleVars from "./styles/StyleVars"

import "./assets/fonts/monsterrat/style.css"
import router from "./router/router"

const app = createApp(App)
StyleVars.setVars(new StyleVars());
app.use(RegisterComponents);
app.use(router);
app.mount('#app');