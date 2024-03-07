import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginView.vue'
import RegistroUsuarioView from '@/views/RegistroUsuarioView.vue'
import MuroView from '../views/MuroView.vue'
import PublicarExperienciaView from '@/views/PublicarExperienciaView.vue'
import DetallesView from '@/views/DetallesView.vue'
import ConfirmacionReservaView from '@/views/ConfirmacionReservaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView,
      props : true
    },
    {
      path: '/registro-usuario',
      name: 'registro-usuario',
      component: RegistroUsuarioView,
      props : true
    },
    {
      path: '/muro',
      name: 'muro',
      component: MuroView,
      props : true
    },
    {
      path: '/publicar-experiencia',
      name: 'publicar-experiencia',
      component: PublicarExperienciaView,
      props : true
    },
    {
      path: '/detalles',
      name: 'detalles',
      component: DetallesView,
      props : true
    },
    {
      path: '/confirmacion-reserva',
      name: 'confirmacion-reserva',
      component: ConfirmacionReservaView,
      props : true
    },
  ]
})

export default router
