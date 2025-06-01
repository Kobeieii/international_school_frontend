import type { DataSubjectTypesData, DepartmentData, TitleData, TitleExcelData } from '@/models/dataMapping'
import { defineStore } from 'pinia'
import * as XLSX from 'xlsx'
import { DataSubjectTypes, Departments, Titles } from '@/models/dataMapping'

export const useDataMappingStore = defineStore('dataMapping', () => {
  const dataSubjectTypes = ref<DataSubjectTypesData[]>([])
  const departments = ref<DepartmentData[]>([])
  const titles = ref<TitleData[]>([])
  const totalTitles = ref(0)
  const isLoading = reactive({
    titles: false,
    saveForm: false,
    deleteTitle: false,
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
  const formData = reactive<FormData>({
    id: null,
    title: '',
    description: '',
    department: null,
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

  async function saveFormData(formData: FormData) {
    isLoading.saveForm = true
    const payload = {
      name: formData.title,
      description: formData.description,
      department_id: formData.department ? formData.department.id : null,
      data_subject_types_ids: formData.dataSubjectTypes.map(type => type.id),
    }
    const data = formData.id ? await Titles.update(formData.id, payload) : await Titles.create(payload)
    resetFormData()
    isLoading.saveForm = false
    return data
  }

  async function deleteTitle(id: number) {
    isLoading.deleteTitle = true
    const data = await Titles.delete(id)
    isLoading.deleteTitle = false
    return data
  }

  function resetFormData() {
    formData.id = null
    formData.title = ''
    formData.description = ''
    formData.department = null
    formData.dataSubjectTypes = []
  }

  async function exportExcel(params: any) {
    return await Titles.exportExcel(params)
  }

  async function importExcel(file: File) {
    const arrayBuffer = await readFileAsArrayBuffer(file)

    const data = new Uint8Array(arrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json: TitleExcelData[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' })
    const success = await Titles.importExcel(json)
    return success
  }

  function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = reject

      reader.readAsArrayBuffer(file)
    })
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
    formData,
    getDataSubjectTypes,
    getDepartments,
    getTitles,
    saveFormData,
    resetFormData,
    deleteTitle,
    exportExcel,
    importExcel,
  }
})

interface FormData {
  id: number | null
  title: string
  description: string
  department: DepartmentData | null
  dataSubjectTypes: DataSubjectTypesData[]
}
