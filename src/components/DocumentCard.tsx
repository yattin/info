import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Document } from '@/store/slices/documentsSlice'
import Card from './common/Card'
import { formatDate, getMarkdownExcerpt } from '@/utils/helpers'

interface DocumentCardProps {
  document: Document
  className?: string
  showFullContent?: boolean
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  className = '',
  showFullContent = false,
}) => {
  const formattedDate = formatDate(document.updatedAt)

  return (
    <Card className={`${className} h-full flex flex-col`}>
      <div className="flex-1">
        <Link to={`/document/${document.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {document.title}
          </h3>
        </Link>
        <div className="mt-2 text-sm text-gray-500">
          <span>更新于 {formattedDate}</span>
        </div>
        <div className="mt-3 text-gray-700">
          {showFullContent ? (
            <p>{document.content}</p>
          ) : (
            <p>{getMarkdownExcerpt(document.content)}</p>
          )}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
        {document.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {tag}
          </span>
        ))}
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {document.category}
        </span>
      </div>
    </Card>
  )
}

// Memoize the component to prevent unnecessary re-renders
export default memo(DocumentCard)