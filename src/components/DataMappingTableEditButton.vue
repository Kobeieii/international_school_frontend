<template>
  <div class="flex align-center mt-1">
    <Button icon="pi pi-pencil" severity="contrast" variant="text" size="small" rounded @click="params.onEdit()" :disabled="!can('edit_data_mapping')" />
    <Button icon="pi pi-trash" severity="danger" variant="text" size="small" rounded @click="params.onDelete()" :disabled="!can('edit_data_mapping')" />
  </div>
</template>

<script setup lang="ts">
import { usePermission } from '@/composables/usePermission'

defineProps(['params'])
const can = usePermission()
</script>
