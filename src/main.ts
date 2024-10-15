import './assets/main.css'

import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$commonUIPProps = ref({ showMiniDrawer: 0, fullName : 'Forename Surname'});

app.use(createPinia())
app.use(router)

app.mount('#app')
