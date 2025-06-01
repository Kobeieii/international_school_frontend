<template>
  <DrawerHeader>
    <div class="flex items-center gap-2">
      <i class="pi pi-filter text-lg" />
      <p class="text-lg font-semibold">
        Filter
      </p>
    </div>
    <div class="flex gap-3 ml-auto">
      <Button label="Reset" variant="text" severity="secondary" size="small" @click="resetFilter" />
      <Button label="Apply Filter" severity="primary" size="small" @click="applyFilter" />
    </div>
  </DrawerHeader>
  <DrawerBody>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-search" />
      </InputGroupAddon>
      <FloatLabel>
        <InputText id="search" v-model="filterData.search" />
        <label for="search">Search</label>
      </FloatLabel>
    </InputGroup>

    <div class="flex flex-col gap-8 my-6">
      <div class="flex flex-col gap-3">
        <p class="mb-2">
          Department
        </p>
        <div v-for="department in departments" :key="department.id" class="flex items-center gap-3">
          <Checkbox v-model="filterData.departments" :input-id="`d-${department.id.toString()}`" :value="department" />
          <label :for="`d-${department.id.toString()}`">{{ department.name }}</label>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <p class="mb-2">
          Data Subject Types
        </p>
        <div v-for="subject in dataSubjectTypes" :key="subject.id" class="flex items-center gap-3">
          <Checkbox v-model="filterData.dataSubjectTypes" :input-id="`s-${subject.id.toString()}`" :value="subject" />
          <label :for="`s-${subject.id.toString()}`">{{ subject.name }}</label>
        </div>
      </div>
    </div>
  </DrawerBody>
</template>

<script setup lang="ts">
import { useDataMappingStore } from '@/stores/dataMapping'

const dataMappingStore = useDataMappingStore()
const { departments, dataSubjectTypes, filterData } = storeToRefs(dataMappingStore)

function resetFilter() {
  filterData.value.search = ''
  filterData.value.departments = []
  filterData.value.dataSubjectTypes = []
  dataMappingStore.getTitles({
    page: 1,
  })
}

function applyFilter() {
  dataMappingStore.getTitles({
    page: 1,
  })
}
</script>
