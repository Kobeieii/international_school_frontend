<template>
  <AgGridVue
    :theme="theme"
    :row-data="titles"
    :column-defs="colDefs"
    :default-col-def="{
      flex: 1,
      minWidth: 150,
      resizable: true,
      sortable: true,
      unSortIcon: true,
    }"
    :pagination="true"
    :loading="isLoading.titles"
    style="height: 480px"
  />
</template>

<script setup lang="ts">
import type { DataSubjectTypesData, DepartmentData } from '@/models/dataMapping'
import { AgGridVue } from 'ag-grid-vue3'
import { useDataMappingStore } from '@/stores/dataMapping'
import { useAgridTheme } from '@/utils/aggrid'
import DataMappingTableEditButton from './DataMappingTableEditButton.vue'

const emit = defineEmits(['action'])

const dataMappingStore = useDataMappingStore()
const { titles, isLoading } = storeToRefs(dataMappingStore)
const theme = useAgridTheme()

const colDefs = ref([
  { field: 'name', headerName: 'Title' },
  { field: 'description', headerName: 'Description' },
  {
    field: 'department',
    headerName: 'Department',
    valueFormatter: (params: { value: DepartmentData }) => params.value.name,
  },
  {
    field: 'data_subject_types',
    headerName: 'Data Subject Types',
    valueFormatter: (params: { value: DataSubjectTypesData[] }) => params.value.map(item => item.name).join(', '),
  },
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
