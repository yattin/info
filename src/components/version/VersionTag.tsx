import React from 'react'

interface VersionTagProps {
  version: string | number
  isLatest?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const VersionTag: React.FC<VersionTagProps> = ({
  version,
  isLatest = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-2.5 py-1.5',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${isLatest ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} ${sizeClasses[size]} ${className}`}
    >
      v{version}
      {isLatest && (
        <svg className="ml-1 h-1.5 w-1.5 fill-current" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
      )}
    </span>
  )
}

export default VersionTag