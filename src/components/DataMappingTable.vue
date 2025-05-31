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
    :loading="isLoading.titles"
    style="height: 480px"
  />
  <Paginator
    v-model:first="first"
    :rows="rows"
    :total-records="totalTitles" 
    :rows-per-page-options="[20, 50, 100]"
    @page="onPageChange"
    :pt:root:class="'bg-transparent'"
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
const { titles, isLoading, totalTitles } = storeToRefs(dataMappingStore)
const theme = useAgridTheme()

const first = ref(0)
const rows = ref(20)
const page = computed(() => Math.floor(first.value / rows.value) + 1)
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

function onPageChange(event: { first: number, rows: number }) {
  first.value = event.first
  rows.value = event.rows
  dataMappingStore.getTitles({
    page: page.value,
    page_size: rows.value,
  })
}

onMounted(() => {
  dataMappingStore.getTitles({
    page: page.value,
    page_size: rows.value,
  })
})
</script>
