import type { DataSubjectTypesData, DepartmentData, TitleData } from '@/models/dataMapping'
import { defineStore } from 'pinia'
import { DataSubjectTypes, Departments, Titles } from '@/models/dataMapping'

export const useDataMappingStore = defineStore('dataMapping', () => {
  const dataSubjectTypes = ref<DataSubjectTypesData[]>([])
  const departments = ref<DepartmentData[]>([])
  const titles = ref<TitleData[]>([])
  const paginationData = reactive<{
    page_size: number
    next: string | null
    previous: string | null
    total_objects: number
    total_pages: number
    current_page: number
  }>({
    page_size: 100,
    next: null,
    previous: null,
    total_objects: 0,
    total_pages: 0,
    current_page: 1,
  })
  const isLoading = reactive({
    dataSubjectTypes: false,
    departments: false,
    titles: false,
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

  async function getTitles() {
    isLoading.titles = true
    const result = await Titles.getList()
    if (result) {
      paginationData.page_size = result.page_size
      paginationData.next = result.next
      paginationData.previous = result.previous
      paginationData.total_objects = result.total_objects
      paginationData.total_pages = result.total_pages
      paginationData.current_page = result.current_page
      titles.value = result.results
    }
    isLoading.titles = false
  }

  return { dataSubjectTypes, departments, titles, isLoading, getDataSubjectTypes, getDepartments, getTitles }
})
