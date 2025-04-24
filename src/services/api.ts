import axios from 'axios'
import { Document } from '@/store/slices/documentsSlice'
import { mockDocuments } from './mockData'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// If we're in development mode and there's no API_BASE_URL, use mock data
const isUseMock = import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL

export const api = {
  getDocuments: async (): Promise<Document[]> => {
    if (isUseMock) {
      // Simulate network delay
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDocuments), 500)
      })
    }
    const response = await axiosInstance.get('/documents')
    return response.data
  },

  getDocumentById: async (id: string): Promise<Document> => {
    if (isUseMock) {
      // Simulate network delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const document = mockDocuments.find((doc) => doc.id === id)
          if (document) {
            resolve(document)
          } else {
            reject(new Error('Document not found'))
          }
        }, 300)
      })
    }
    const response = await axiosInstance.get(`/documents/${id}`)
    return response.data
  },

  searchDocuments: async (query: string): Promise<Document[]> => {
    if (isUseMock) {
      // Simulate network delay and simple search logic
      return new Promise((resolve) => {
        setTimeout(() => {
          const lowerQuery = query.toLowerCase()
          const results = mockDocuments.filter(
            (doc) =>
              doc.title.toLowerCase().includes(lowerQuery) ||
              doc.content.toLowerCase().includes(lowerQuery)
          )
          resolve(results)
        }, 400)
      })
    }
    const response = await axiosInstance.get('/search', { params: { q: query } })
    return response.data
  },
}

// Helper functions for debugging
export const logAPIRequest = (method: string, url: string, data?: any) => {
  if (import.meta.env.DEV) {
    console.log(`API Request: ${method} ${url}`, data || '')
  }
}

export const logAPIResponse = (response: any) => {
  if (import.meta.env.DEV) {
    console.log('API Response:', response)
  }
}