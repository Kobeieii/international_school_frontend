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

  async function getTitles(filter: { page: number; page_size: number }) {
    isLoading.titles = true
    const result = await Titles.getList(filter)
    if (result) {
      totalTitles.value = result.total_objects
      titles.value = result.results
    }
    isLoading.titles = false
  }

  return { dataSubjectTypes, departments, titles, totalTitles, isLoading, getDataSubjectTypes, getDepartments, getTitles }
})
