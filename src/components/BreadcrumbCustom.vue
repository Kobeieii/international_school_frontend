<template>
  <div
    style="--p-breadcrumb-background: theme('colors.gray.100')"
    dark:style="--p-breadcrumb-background: theme('colors.zinc.800')"
  >
    <Breadcrumb :home="home" :model="items" class="p-0">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span class="text-color" :class="[item.icon]" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
        </a>
      </template>
      <template #separator>
        /
      </template>
    </Breadcrumb>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  home: BreadcrumbItem
  items: BreadcrumbItem[]
}>()

interface BreadcrumbItem {
  label?: string
  route?: string
  icon?: string
}
</script>
