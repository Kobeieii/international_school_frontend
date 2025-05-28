<template>
  <Drawer v-model:visible="visible">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
  </Drawer>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>('visible', {
  default: false,
  type: Boolean,
})
</script>
