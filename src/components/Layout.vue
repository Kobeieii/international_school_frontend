<template>
  <nav class=" bg-white dark:bg-black w-full flex relative justify-between items-center mx-auto px-8 h-16">
    <div>
      <a href="/" class="flex items-center gap-4">
        <div class="">
          <img
            src="@/assets/logo.svg"
            alt="Logo"
            class="h-8 w-auto"
          >
        </div>
        <div>
          <p class="text-xl font-medium text-gray-800 dark:text-gray-200 hidden md:block">
            PDPA / International School
          </p>
        </div>

      </a>
    </div>

    <div class="flex justify-end items-center relative">
      <div class="relative">
        <img
          src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          alt="Profile"
          class="w-10 h-10 rounded-full cursor-pointer"
          @click="toggleMenu"
        >

        <Menu
          ref="menu"
          :model="items"
          :popup="true"
        >
          <template #item="{ item, props }">
            <a v-ripple class="flex items-center" :href="item.to" v-bind="props.action" @click="handleClickMenu(item.to)">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>
    </div>
  </nav>

  <div class="lg:hidden w-full overflow-x-auto shadow p-2">
    <div class="flex space-x-4 min-w-max">
      <ul>
        <li
          v-for="(item, index) in menuSideBar"
          :key="index"
          class="inline-block px-4 py-2 cursor-pointer whitespace-nowrap rounded-lg transition-colors"
        >
          <router-link :to="item.to" class="flex items-center gap-2 transition-colors hover:text-green-600" :class="{ 'text-green-600 font-medium': $route.path === item.to }">
            <i :class="item.icon" />
            <p>{{ item.label }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>

  <div class="grid grid-cols-5 gap-4 h-screen">
    <div class="row-span-3 p-4 ml-4 hidden lg:block">
      <aside>
        <div class="h-full">
          <ul class="space-y-4">
            <li v-for="(item, index) in menuSideBar" :key="index">
              <router-link :to="item.to" class="flex items-center gap-2 transition-colors hover:text-green-600" :class="{ 'text-green-600 font-medium': $route.path === item.to }">
                <i :class="item.icon" />
                <p>{{ item.label }}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
    <div class="row-span-3 col-span-5 lg:col-span-4 p-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Menu from 'primevue/menu'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const menu = ref()
const items = ref([
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    to: '/login',
  },
])
const menuSideBar = [
  {
    label: 'Data Mapping',
    icon: 'pi pi-sitemap',
    to: '/',
  },
  {
    label: 'Governance Document',
    icon: 'pi pi-building-columns',
    to: '/test/governance',
  },
  {
    label: 'Employee Awareness',
    icon: 'pi pi-user',
    to: '/test/employee',
  },
  {
    label: 'Data Processors',
    icon: 'pi pi-database',
    to: '/test/data',
  },
  {
    label: 'Subject Access Request',
    icon: 'pi pi-key',
    to: '/test/access',
  },
  {
    label: 'Data breach register',
    icon: 'pi pi-unlock',
    to: '/test/dataregister',
  },
]

function toggleMenu(event) {
  menu.value.toggle(event)
}
function handleClickMenu(to) {
  const authStore = useAuthStore()
  if (to === '/login') {
    authStore.clearToken()
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
