<template>
  <AgGridVue
    :theme="theme"
    :row-data="rowData"
    :column-defs="colDefs"
    :default-col-def="{
      flex: 1,
      minWidth: 150,
      resizable: true,
      sortable: true,
    }"
    :pagination="true"
    style="height: 480px"
  />
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { useAgridTheme } from '@/utils/aggrid'

const theme = useAgridTheme()
const rowData = ref([
  { title: 'Tesla', description: 'Model Y', departments: 64950, dataSubjectTypes: true },
  { title: 'Ford', description: 'F-Series', departments: 33850, dataSubjectTypes: false },
  { title: 'Toyota', description: 'Corolla', departments: 29600, dataSubjectTypeselectric: false },
])

const colDefs = ref([
  { field: 'title', headerName: 'Title' },
  { field: 'description', headerName: 'Description' },
  { field: 'departments', headerName: 'Departments' },
  { field: 'dataSubjectTypes', headerName: 'Data Subject Types' },
])
</script>
