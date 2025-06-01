import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/Layout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            title: 'InterSchool - Home',
            requiredPermission: 'view_data_mapping',
          },
        },
        {
          path: 'test/:tab(\\w+)/',
          name: 'test',
          component: () => import('@/components/Test.vue'),
          meta: {
            title: 'InterSchool - Test',
            requiredPermission: 'view_governance_document',
          },
        },
        {
          path: 'unauthorized',
          name: 'unauthorized',
          component: () => import('@/views/UnauthorizedView.vue'),
          meta: {
            title: 'InterSchool - Unauthorized',
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        title: 'InterSchool - Login',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: 'InterSchool - Page Not Found',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const required = to.meta.requiredPermission as string | undefined
  if (!authStore.isHasToken() && to.path !== '/login') {
    next({ name: 'login' })
    return
  }
  if (required && !authStore.hasPermission(required)) {
    next({ name: 'unauthorized' })
    return
  }

  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
  next()
})

export default router
