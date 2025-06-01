export interface Pagination<T> {
  page_size: number
  next: string | null
  previous: string | null
  total_objects: number
  total_pages: number
  current_page: number
  results: T[]
}
