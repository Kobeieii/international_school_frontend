<template>
  test {{ id }}
</template>
<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>