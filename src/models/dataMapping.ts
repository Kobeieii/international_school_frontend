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
      page_size: filter.page_size || 100,  
    }
      const response = await axios.get(`${baseURL}/titles/`, { params })
      return response.data
    }
    catch (error) {
      console.error('Failed to fetch titles:', error)
      return null
    }
  }

  static async post(data: {
    name: string
    department_id: number
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

    static async put(id: number, data: {
        name?: string
        department_id?: number
        data_subject_types_ids?: number[]
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

    static async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${baseURL}/titles/${id}/`)
        }
        catch (error) {
            console.error('Failed to delete title:', error)
        }
    }
    static async importExcel(data: TitleExcelData[]): Promise<boolean> {
        try {
            await axios.post(`${baseURL}/titles/import/`, data)
            return true
        }
        catch (error) {
            console.error('Failed to import titles from Excel:', error)
            return false
        }
    }
}
