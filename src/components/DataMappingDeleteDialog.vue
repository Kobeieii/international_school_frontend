<template>
  <Dialog v-model:visible="visible" modal :closable="false" :style="{ width: '25rem' }" pt:header:class="p-0">
    <template #header>
      <div class="flex justify-end w-full p-0">
        <Button icon="pi pi-times" severity="contrast" variant="text" size="small" class="mt-2 mr-2" rounded @click="visible = false" />
      </div>
    </template>
    <div class="flex flex-col justify-center items-center gap-6 mb-4">
      <div class="bg-red-50 p-4 rounded-3xl text-center">
        <i class="pi pi-trash text-4xl text-red-600" />
      </div>
      <div class="flex flex-col items-center">
        <p class="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Delete
        </p>
        <p class="text-gray-500 dark:text-gray-400">
          Are you sure you want to delete?
        </p>
      </div>
      <div class="flex gap-4">
        <Button label="Cancel" severity="secondary" variant="outlined" size="small" class="w-24" @click="visible = false" />
        <Button label="Delete" severity="danger" variant="filled" size="small" class="w-24" :loading="isLoading.deleteTitle" @click="handleConfirm" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useDataMappingStore } from '@/stores/dataMapping'

const props = defineProps<{
  id: number | null
}>()
const visible = defineModel<boolean>('visible', { default: false })
const dataMappingStore = useDataMappingStore()
const { isLoading } = storeToRefs(dataMappingStore)

async function handleConfirm() {
  if (props.id) {
    await dataMappingStore.deleteTitle(props.id)
    await dataMappingStore.getTitles()
    visible.value = false
  }
}
</script>
