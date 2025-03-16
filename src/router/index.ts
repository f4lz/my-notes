import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotesView from '@/views/NotesView.vue'

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  {
    path: '/notes',
    component: NotesView,
    beforeEnter: () => {
      if (!localStorage.getItem('accessToken')) return { path: '/' }
      return true
    },
  },
]

export const router = createRouter({
  history: createWebHistory('/my-notes'),
  routes,
})
