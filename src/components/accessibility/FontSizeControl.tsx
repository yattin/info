import React from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

type FontSize = 'small' | 'medium' | 'large'

interface FontSizeControlProps {
  className?: string
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({ className = '' }) => {
  const [fontSize, setFontSize] = useLocalStorage<FontSize>('fontSize', 'medium')

  // Apply font size class to document
  React.useEffect(() => {
    document.documentElement.classList.remove('text-small', 'text-medium', 'text-large')
    document.documentElement.classList.add(`text-${fontSize}`)
  }, [fontSize])

  const fontSizeLabels = {
    small: '小',
    medium: '中',
    large: '大',
  }

  const handleChange = (newSize: FontSize) => {
    setFontSize(newSize)
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <span className="text-sm text-gray-600 dark:text-gray-300">字体大小:</span>
      <div className="flex border rounded-md overflow-hidden">
        {(['small', 'medium', 'large'] as FontSize[]).map(size => (
          <button
            key={size}
            onClick={() => handleChange(size)}
            className={`px-2 py-1 text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              fontSize === size
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
            aria-label={`设置字体大小为${fontSizeLabels[size]}`}
            aria-pressed={fontSize === size}
          >
            {fontSizeLabels[size]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FontSizeControl