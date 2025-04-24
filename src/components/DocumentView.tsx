import React from 'react'
import { Document } from '@/store/slices/documentsSlice'
import MarkdownRenderer from './MarkdownRenderer'
import Card from './common/Card'

interface DocumentViewProps {
  document: Document
  className?: string
}

const DocumentView: React.FC<DocumentViewProps> = ({ document, className = '' }) => {
  if (!document) return null

  const formattedDate = new Date(document.updatedAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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

export default DocumentView