<template>
  <DrawerHeader>
    <div class="flex items-center gap-2">
      <i class="pi pi-filter text-lg" />
      <p class="text-lg font-semibold">
        Filter
      </p>
    </div>
    <div class="flex gap-3 ml-auto">
      <Button label="Reset" variant="text" severity="secondary" size="small" />
      <Button label="Apply Filter" severity="primary" size="small" />
    </div>
  </DrawerHeader>
  <DrawerBody>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-search" />
      </InputGroupAddon>
      <FloatLabel>
        <InputText id="search" />
        <label for="search">Search</label>
      </FloatLabel>
    </InputGroup>

    <div class="flex flex-col gap-8 my-6">
      <div class="flex flex-col gap-3">
        <p class="mb-2">Department</p>
        <div v-for="department in departments" :key="department.id" class="flex items-center gap-3">
          <RadioButton v-model="selectDepartment" :input-id="`d-${department.id.toString()}`" :value="department" />
          <label :for="`d-${department.id.toString()}`">{{ department.name }}</label>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <p class="mb-2">Data Subject Types</p>
        <div v-for="subject in dataSubjectTypes" :key="subject.id" class="flex items-center gap-3">
          <Checkbox v-model="selectDataSubjects" :input-id="`s-${subject.id.toString()}`" :value="subject" />
          <label :for="`s-${subject.id.toString()}`">{{ subject.name }}</label>
        </div>
      </div>
    </div>
  </DrawerBody>
</template>

<script setup lang="ts">
import { useDataMappingStore } from '@/stores/dataMapping'

const dataMappingStore = useDataMappingStore()
const { departments, dataSubjectTypes } = storeToRefs(dataMappingStore)
const selectDepartment = ref('')
const selectDataSubjects = ref([])

</script>
