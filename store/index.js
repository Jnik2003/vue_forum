import { createStore } from 'vuex'
import auth from './auth.js'
import forum from '@/store/forum.js'

export default createStore({
  
  modules: {
    auth,
    forum,
  },
})

