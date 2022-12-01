import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AutorizationPage from '@/views/AutorizationPage.vue'
import SingleTheme from '@/components/SingleTheme.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/forum',
    name: 'forum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "forum" */ '../views/ForumView.vue')
  },
  {
    path: '/autorization',
    name: 'autorization',
    component: AutorizationPage
  },
  {
    path: '/forum/:id',
    name: 'theme',
    component: SingleTheme,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
