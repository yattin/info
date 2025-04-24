import { Document } from '@/store/slices/documentsSlice'

/**
 * Format a date string to a localized date string
 */
export const formatDate = (dateString: string, locale = 'zh-CN'): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    console.error('Invalid date format:', error)
    return dateString
  }
}

/**
 * Extract a plain text excerpt from markdown content
 */
export const getMarkdownExcerpt = (content: string, maxLength = 150): string => {
  // Remove markdown formatting
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headings
    .replace(/\*\*|__|~~|`/g, '') // Remove bold, italic, strikethrough, code
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/g, '$1') // Replace [text](link) with just text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\n\s*\n/g, '\n') // Replace multiple newlines with single newlines
    .trim()

  return plainText.length > maxLength
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

/**
 * Group documents by category
 */
export const groupDocumentsByCategory = (documents: Document[]): Record<string, Document[]> => {
  return documents.reduce<Record<string, Document[]>>(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = []
      }
      acc[doc.category].push(doc)
      return acc
    },
    {}
  )
}

/**
 * Get all unique tags from documents
 */
export const getUniqueTags = (documents: Document[]): string[] => {
  const tagsSet = new Set<string>()
  documents.forEach((doc) => {
    doc.tags.forEach((tag) => tagsSet.add(tag))
  })
  return Array.from(tagsSet)
}

/**
 * Sort documents by date
 */
export const sortDocumentsByDate = (documents: Document[], ascending = false): Document[] => {
  return [...documents].sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime()
    const dateB = new Date(b.updatedAt).getTime()
    return ascending ? dateA - dateB : dateB - dateA
  })
}

/**
 * Debounce function for search input
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), waitFor)
  }
}

/**
 * Save data to localStorage
 */
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * Load data from localStorage
 */
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}