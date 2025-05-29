<template>
  <div class="py-2">
    <div class="flex gap-3">
      <Button v-for="btn in button" :key="btn.value" v-bind="btn" @click="handleClickBtn(btn.value)" />
    </div>
    <div class="my-5">
      <DataMappingTable v-if="selectedBtn === 'edit'" @action="(params) => emit('action', params)" />
      <Test v-else-if="selectedBtn === 'visualize'" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['action'])
const selectedBtn = ref('edit')
const button = ref([{
  icon: 'pi pi-pencil',
  label: 'Edit',
  value: 'edit',
  class: 'bg-white dark:bg-transparent',
  severity: 'success',
  variant: 'outlined',
  size: 'small',
}, {
  icon: 'pi pi-eye',
  label: 'Visualize',
  class: 'bg-white dark:bg-transparent',
  severity: 'secondary',
  variant: 'outlined',
  size: 'small',
  value: 'visualize',
}])

function handleClickBtn(value: string) {
  selectedBtn.value = value
  button.value.forEach((btn) => {
    if (btn.value === value) {
      btn.severity = 'success'
    }
    else {
      btn.severity = 'secondary'
    }
  })
}
</script>
