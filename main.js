import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import components from '@/components'

const app = createApp(App)

components.forEach(item => {
    app.component(item.name, item)
})

app.use(store).use(router).mount('#app')
