import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import '@/assets/styles.css'

const PrimeVueCustomPreset = definePreset(Aura, {})
const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: PrimeVueCustomPreset,
    options: {
      darkModeSelector: '',
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

app.mount('#app')
