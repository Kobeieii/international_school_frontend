import type { DataSubjectTypesData, DepartmentData, TitleData } from '@/models/dataMapping'
import { defineStore } from 'pinia'
import { DataSubjectTypes, Departments, Titles } from '@/models/dataMapping'

export const useDataMappingStore = defineStore('dataMapping', () => {
  const dataSubjectTypes = ref<DataSubjectTypesData[]>([])
  const departments = ref<DepartmentData[]>([])
  const titles = ref<TitleData[]>([])
  const totalTitles = ref(0)
  const isLoading = reactive({
    titles: false,
  })
  const pagination = reactive({
    first: 1,
    rows: 20,
  })
  const pagePagination = computed(() => Math.floor(pagination.first / pagination.rows) + 1)
  const filterData = reactive<{
    search: string
    departments: DepartmentData[]
    dataSubjectTypes: DataSubjectTypesData[]
  }>({
    search: '',
    departments: [],
    dataSubjectTypes: [],
  })

  async function getDataSubjectTypes() {
    const result = await DataSubjectTypes.getList()
    if (result) {
      dataSubjectTypes.value = result.results
    }
  }

  async function getDepartments() {
    const result = await Departments.getList()
    if (result) {
      departments.value = result.results
    }
  }

  async function getTitles(
    data: {
      page?: number
      pageSize?: number
      search?: string
      departments?: string
      dataSubjectTypes?: string
    } = {},
  ) {
    isLoading.titles = true
    const filter = {
      page: data.page || pagePagination.value,
      page_size: data.pageSize || pagination.rows,
      search: data.search || filterData.search || '',
      department__name__in: data.departments || filterData.departments.map(d => d.name).join(','),
      data_subject_types__name__in: data.dataSubjectTypes || filterData.dataSubjectTypes.map(s => s.name).join(','),
    }
    const result = await Titles.getList(filter)
    if (result) {
      totalTitles.value = result.total_objects
      titles.value = result.results
    }
    isLoading.titles = false
  }

  return {
    dataSubjectTypes,
    departments,
    titles,
    totalTitles,
    isLoading,
    pagination,
    pagePagination,
    filterData,
    getDataSubjectTypes,
    getDepartments,
    getTitles,
  }
})
