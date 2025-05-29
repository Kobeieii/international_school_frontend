<template>
  <div class="flex align-center mt-1">
    <Button icon="pi pi-pencil" severity="contrast" variant="text" size="small" rounded @click="params.onEdit()" />
    <Button icon="pi pi-trash" severity="danger" variant="text" size="small" rounded @click="params.onDelete()" />
  </div>
</template>

<script setup lang="ts">
defineProps(['params'])
</script>
