import type { Pagination } from './restFramework'
import axios from 'axios'

export interface DataSubjectTypesData {
  id: number
  name: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface DepartmentData {
  id: number
  name: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface TitleData {
  id: number
  name: string
  department: DepartmentData
  data_subject_types: DataSubjectTypesData[]
}

export interface TitleExcelData {
  title: string
  description: string
  department: string
  data_subject_types: string
}

const baseURL = '/data-mapping'

export class DataSubjectTypes {
  static async getList(): Promise<Pagination<DataSubjectTypesData> | null> {
    try {
      const response = await axios.get(`${baseURL}/data-subject-types/`)
      return response.data
    }
    catch (error) {
      console.error('Failed to fetch data subject types:', error)
      return null
    }
  }
}

export class Departments {
  static async getList(): Promise<Pagination<DepartmentData> | null> {
    try {
      const response = await axios.get(`${baseURL}/departments/`)
      return response.data
    }
    catch (error) {
      console.error('Failed to fetch departments:', error)
      return null
    }
  }
}

export class Titles {
  static async getList(filter: any): Promise<Pagination<TitleData> | null> {
    try {
      const params: Record<string, any> = {
        page: filter.page || 1,
        page_size: filter.pageSize || 100,
        ...filter,
      }
      const response = await axios.get(`${baseURL}/titles/`, { params })
      return response.data
    }
    catch (error) {
      console.error('Failed to fetch titles:', error)
      return null
    }
  }

  static async create(data: {
    name: string
    description: string
    department_id: number | null
    data_subject_types_ids: number[]
  }): Promise<TitleData | null> {
    try {
      const response = await axios.post(`${baseURL}/titles/`, data)
      return response.data
    }
    catch (error) {
      console.error('Failed to create title:', error)
      return null
    }
  }

  static async update(id: number, data: {
    name: string
    description: string
    department_id: number | null
    data_subject_types_ids: number[]
  }): Promise<TitleData | null> {
    try {
      const response = await axios.patch(`${baseURL}/titles/${id}/`, data)
      return response.data
    }
    catch (error) {
      console.error('Failed to update title:', error)
      return null
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      await axios.delete(`${baseURL}/titles/${id}/`)
      return true
    }
    catch (error) {
      console.error('Failed to delete title:', error)
      return false
    }
  }

  static async importExcel(data: TitleExcelData[]): Promise<boolean> {
    try {
      await axios.post(`${baseURL}/titles/import-excel/`, data)
      return true
    }
    catch (error) {
      console.error('Failed to import titles from Excel:', error)
      return false
    }
  }

  static async exportExcel(filter: any): Promise<TitleExcelData[] | null> {
    try {
      const response = await axios.get(`${baseURL}/titles/export-excel/`, { params: filter })
      return response.data
    }
    catch (error) {
      console.error('Failed to export titles to Excel:', error)
      return null
    }
  }
}
