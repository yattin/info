import { Document } from '@/store/slices/documentsSlice'

// Common API response interfaces
export interface ApiResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    total: number
    currentPage: number
    totalPages: number
    perPage: number
  }
}

// Search related types
export interface SearchParams {
  query: string
  filters?: {
    category?: string
    tags?: string[]
    dateFrom?: string
    dateTo?: string
  }
  sort?: {
    field: 'title' | 'updatedAt' | 'createdAt'
    direction: 'asc' | 'desc'
  }
  page?: number
  perPage?: number
}

export interface SearchResult {
  documents: Document[]
  total: number
  query: string
}

// User preferences
export interface UserPreferences {
  darkMode: boolean
  sidebarExpanded: boolean
  fontSize: 'small' | 'medium' | 'large'
  lastVisitedDocuments: string[] // IDs of recently viewed documents
}

// Error types
export interface ApiError {
  code: string
  message: string
  details?: unknown
}

// Events
export type DocumentViewEvent = {
  type: 'document_view'
  documentId: string
  timestamp: number
}

export type SearchEvent = {
  type: 'search'
  query: string
  resultsCount: number
  timestamp: number
}

export type UserEvent = DocumentViewEvent | SearchEvent