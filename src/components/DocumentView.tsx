import React, { memo, useEffect } from 'react'
import { Document } from '@/store/slices/documentsSlice'
import MarkdownRenderer from './MarkdownRenderer'
import Card from './common/Card'
import { formatDate } from '@/utils/helpers'
import { trackRenderTime } from '@/utils/performance'
import createLogger from '@/utils/logger'

interface DocumentViewProps {
  document: Document
  className?: string
}

const logger = createLogger('DocumentView')

const DocumentView: React.FC<DocumentViewProps> = ({ document, className = '' }) => {
  // Track render time for performance monitoring
  const endTracking = trackRenderTime('DocumentView')
  
  useEffect(() => {
    if (document) {
      logger.info(`Rendering document: ${document.id} - ${document.title}`)
    }
    return () => {
      endTracking()
    }
  }, [document])

  if (!document) return null

  const formattedDate = formatDate(document.updatedAt)

  return (
    <Card className={`${className} max-w-4xl mx-auto`}>
      <div className="border-b pb-4 mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <div>
            <span>更新于 {formattedDate}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <MarkdownRenderer content={document.content} />
      </div>
    </Card>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(DocumentView)