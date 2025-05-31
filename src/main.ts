import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { setupAxios } from '@/utils/axiosPlugin'
import App from './App.vue'
import router from './router'
import '@/assets/styles.css'

ModuleRegistry.registerModules([AllCommunityModule])
const PrimeVueCustomPreset = definePreset(Aura, {})
const app = createApp(App)

async function initialPrep() {
  const authStore = useAuthStore()

  if (authStore.isHasToken()) {
    try {
      await authStore.me()
    }
    catch (e) {
      console.error(e)
    }
  }
}

async function initializeApp() {
  app.use(PrimeVue, {
    theme: {
      preset: PrimeVueCustomPreset,
      options: {
        cssLayer: {
          name: 'primevue',
          order: 'theme, base, primevue',
        },
      },
    },
  })
  app.use(ToastService)
  app.use(createPinia())
  app.use(router)

  setupAxios()
  await initialPrep()

  app.mount('#app')
}

initializeApp().catch(err => console.error('App initialization failed:', err))
