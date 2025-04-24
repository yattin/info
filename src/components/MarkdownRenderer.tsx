import React, { memo, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { trackRenderTime } from '@/utils/performance'

interface MarkdownRendererProps {
  content: string
  className?: string
  lazyLoad?: boolean
}

// Enhanced markdown renderer with performance optimizations
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
  lazyLoad = true
}) => {
  const [isReady, setIsReady] = useState(!lazyLoad)
  const endTracking = trackRenderTime('MarkdownRenderer')
  
  // For large documents, we can delay the render until after the main thread is idle
  useEffect(() => {
    if (lazyLoad && content.length > 10000) {
      const id = window.requestIdleCallback ? 
        window.requestIdleCallback(() => setIsReady(true)) : 
        setTimeout(() => setIsReady(true), 100)
      
      return () => {
        if (window.cancelIdleCallback) {
          window.cancelIdleCallback(id as number)
        } else {
          clearTimeout(id)
        }
      }
    } else {
      setIsReady(true)
    }
  }, [content, lazyLoad])

  useEffect(() => {
    return () => {
      endTracking()
    }
  }, [content])

  if (!isReady) {
    return (
      <div className={`markdown-content ${className} animate-pulse`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      </div>
    )
  }

  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4 mt-8 pb-2 border-b" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-3 mt-6 pb-1 border-b" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-3 mt-5" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-lg font-bold mb-2 mt-4" {...props} />,
          h5: ({ node, ...props }) => <h5 className="text-base font-bold mb-2 mt-4" {...props} />,
          h6: ({ node, ...props }) => <h6 className="text-base font-medium mb-2 mt-4" {...props} />,
          
          // Block elements
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="pl-4 italic border-l-4 border-gray-300 my-4 text-gray-700" {...props} />
          ),
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          
          // Table
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-300 border" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-200" {...props} />,
          tr: ({ node, ...props }) => <tr className="hover:bg-gray-50" {...props} />,
          th: ({ node, ...props }) => (
            <th
              className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r last:border-r-0"
              {...props}
            />
          ),
          td: ({ node, ...props }) => <td className="px-3 py-2 border-r last:border-r-0" {...props} />,
          
          // Inline elements
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:text-blue-800 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(.+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={vs}
                PreTag="div"
                className="rounded-md my-4"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className={`${inline ? 'bg-gray-100 px-1 py-0.5 rounded text-sm font-mono' : ''}`}
                {...props}
              >
                {children}
              </code>
            )
          },
          img: ({ node, ...props }) => (
            <img 
              loading="lazy" 
              className="max-w-full h-auto my-4 rounded" 
              {...props} 
              alt={props.alt || ''} 
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ),
          hr: ({ node, ...props }) => <hr className="my-8 border-t border-gray-300" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// Memoize the component to prevent unnecessary re-renders when content doesn't change
export default memo(MarkdownRenderer, (prevProps, nextProps) => {
  return prevProps.content === nextProps.content && prevProps.className === nextProps.className
})