import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: string
  className?: string
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
  footer?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  contentClassName = '',
  headerClassName = '',
  footerClassName = '',
  footer,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className={`px-4 py-3 border-b border-gray-200 bg-gray-50 ${headerClassName}`}>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <div className={`p-4 ${contentClassName}`}>{children}</div>
      {footer && (
        <div className={`px-4 py-3 border-t border-gray-200 bg-gray-50 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  )
}

export default Card