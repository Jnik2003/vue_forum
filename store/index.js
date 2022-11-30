import { createStore } from 'vuex'
import auth from './auth.js'
import themes from '@/store/themes.js'
import posts from '@/store/posts.js'

export default createStore({
  
  modules: {
    auth,
    themes,
    posts,
  },
})

