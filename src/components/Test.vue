<template>
  test {{ id || route.params.tab }}
</template>

<script setup lang="ts">
defineProps<{
  id?: string
}>()
const route = useRoute()
</script>
