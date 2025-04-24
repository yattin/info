import axios from 'axios'
import { DocumentVersion } from '@/components/version/VersionHistoryList'
import { mockVersions } from './mockVersionData'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// If we're in development mode and there's no API_BASE_URL, use mock data
const isUseMock = import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL

export const versionApi = {
  getDocumentVersions: async (documentId: string): Promise<DocumentVersion[]> => {
    if (isUseMock) {
      // Simulate network delay
      return new Promise((resolve) => {
        setTimeout(() => {
          const versions = mockVersions.filter(version => version.documentId === documentId)
          resolve(versions)
        }, 500)
      })
    }
    const response = await axiosInstance.get(`/documents/${documentId}/versions`)
    return response.data
  },

  getDocumentVersion: async (documentId: string, versionId: string): Promise<DocumentVersion> => {
    if (isUseMock) {
      // Simulate network delay
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const version = mockVersions.find(
            v => v.documentId === documentId && v.id === versionId
          )
          if (version) {
            resolve(version)
          } else {
            reject(new Error('Version not found'))
          }
        }, 300)
      })
    }
    const response = await axiosInstance.get(`/documents/${documentId}/versions/${versionId}`)
    return response.data
  },
}