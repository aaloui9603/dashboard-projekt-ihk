import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/notizen', name: 'notizen', component: NotesView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
