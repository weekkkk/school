import { createApp } from 'vue'
import App from './app.vue'
import RegisterComponents from "./plugins/register-components"
import StyleVars from "./styles/StyleVars"

import "./assets/fonts/monsterrat/style.css"

StyleVars.setVars(new StyleVars());
const app = createApp(App)
app.use(RegisterComponents);
app.mount('#app');