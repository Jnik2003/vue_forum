import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import components from '@/components'



const app = createApp(App)

// зададим url для fetch 
// для разработки
// app.config.globalProperties.$url_rec_theme_serve = 'http://api/forum/'
//для продакшен
// app.config.globalProperties.$url_rec_theme_prod = 'http://test4.jnik.s53.hhos.ru/php/'
// console.log(process.env.VUE_APP_SECRET)
components.forEach(item => {
    app.component(item.name, item)
})

app.use(store).use(router).mount('#app')
