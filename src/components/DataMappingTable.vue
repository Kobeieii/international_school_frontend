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
      unSortIcon: true,
    }"
    :pagination="true"
    style="height: 480px"
  />
</template>

<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import { useAgridTheme } from '@/utils/aggrid'
import DataMappingTableEditButton from './DataMappingTableEditButton.vue'

const emit = defineEmits(['action'])
const theme = useAgridTheme()
const rowData = ref([
  { id: 1, title: 'Tesla', description: 'Model Y', department: 'test', dataSubjectTypes: 'test1,test2' },
  { id: 2, title: 'Ford', description: 'F-Series', department: 'test', dataSubjectTypes: 'test1,test2' },
  { id: 3, title: 'Toyota', description: 'Corolla', department: 'test', dataSubjectTypes: 'test1,test2' },
])

const colDefs = ref([
  { field: 'title', headerName: 'Title' },
  { field: 'description', headerName: 'Description' },
  { field: 'department', headerName: 'Department' },
  { field: 'dataSubjectTypes', headerName: 'Data Subject Types' },
  {
    field: 'actions',
    cellRenderer: DataMappingTableEditButton,
    cellRendererParams: (params: any) => ({
      onEdit: () => emit('action', { action: 'edit', data: params.data }),
      onDelete: () => emit('action', { action: 'delete', data: params.data }),
    }),
    maxWidth: 120,
    headerName: '',
    unSortIcon: false,
  },
])
</script>
