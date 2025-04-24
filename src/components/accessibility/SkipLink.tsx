import React, { useState } from 'react'

interface SkipLinkProps {
  targetId: string
  text?: string
}

/**
 * Skip to content link for keyboard users - hidden until focused
 */
const SkipLink: React.FC<SkipLinkProps> = ({
  targetId,
  text = '跳过导航到内容',
}) => {
  const [focused, setFocused] = useState(false)

  const handleFocus = () => setFocused(true)
  const handleBlur = () => setFocused(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.tabIndex = -1
      target.focus()
      setTimeout(() => {
        target.removeAttribute('tabindex')
      }, 1000)
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`
        fixed top-0 left-0 z-50 p-3 bg-blue-600 text-white font-medium
        transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white
        ${focused ? 'transform-none' : '-translate-y-full'}
      `}
    >
      {text}
    </a>
  )
}

export default SkipLink